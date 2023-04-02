const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Configuration, OpenAIApi } = require("openai");
const Epub = require("epub-gen");
const { WritableStreamBuffer } = require("stream-buffers");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const configurationObject = {
  numChapters: 13,
  temperature: 0.7,
  maxTokensTOC: 500,
  maxTokensChapter: 2048,
};

async function generateTitleAndTOC(topic, openaiConfig, aiSysMessage) {
  const openai = new OpenAIApi(openaiConfig);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: aiSysMessage.content },
      {
        role: "user",
        content: `Your AI-assisted task is to generate an engaging title and a well-structured table of contents for an eBook on ${topic}. The eBook should include an introduction, ${configurationObject.numChapters} chapters, a conclusion, and a bonus chapter. Please create a title that captures the essence of the book's content. For formatting, use standard HTML tags like <h1> for the title and <h2> for chapter headings. Each <h1> must contain at least 4 <h2>'s, and each <h2> should have 3 <p>'s with a minimum of 4 sentences per paragraph. Thank you.`,
      },
    ],
    max_tokens: configurationObject.maxTokensTOC,
    temperature: configurationObject.temperature,
  });

  return response.data.choices[0].message.content;
}

async function generateChapterContent(
  chapterTitle,
  t_a_toc,
  openaiConfig,
  aiSysMessage
) {
  const openai = new OpenAIApi(openaiConfig);

  const chapterResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: aiSysMessage },
      {
        role: "user",
        content: `Please create the content for ${chapterTitle} in an eBook on ${t_a_toc}. The chapter must have a word count between 2,000 and 2,300 words. Use standard HTML tags, such as <h1> for titles, <h2> for subtitles, and <p> for paragraphs, to ensure seamless conversion to .epub format. Include at least 4 <h2>'s under the main <h1>, and each <h2> should contain 3 <p>'s with a minimum of 4 sentences per paragraph.`,
      },
    ],
    max_tokens: configurationObject.maxTokensChapter,
    temperature: configurationObject.temperature,
  });

  return chapterResponse.data.choices[0].message.content;
}

router.post("/unsupervised", async (req, res) => {
  const { topic, user } = req.body;
  const userFromDB = await User.findById(user.id);
  const authorName = user.name;

  const openaiApiKey = userFromDB.openaiApiKey;
  const openaiOrgId = userFromDB.openaiOrgId;

  if (!openaiApiKey || !openaiOrgId) {
    return res.status(400).json({
      message:
        "You have not provided an API key and organization ID. Please update your settings.",
    });
  }

  const openaiConfig = new Configuration({
    apiKey: userFromDB.openaiApiKey,
    organization: userFromDB.openaiOrgId,
  });

  const aiSysMessage = {
    content: `Your AI-assisted task is to generate an engaging title and a well-structured table of contents for an eBook on ${topic}. The eBook should include an introduction, ${configurationObject.numChapters} chapters, a conclusion, and a bonus chapter. Please create a title that captures the essence of the book's content. For formatting, use standard HTML tags like <h1> for the title and <h2> for chapter headings. Each <h1> must contain at least 4 <h2>'s, and each <h2> should have 3 <p>'s with a minimum of 4 sentences per paragraph. Thank you.`,
  };

  console.log("Generating title and table of contents...");
  const t_a_toc = await generateTitleAndTOC(topic, openaiConfig, aiSysMessage);
  console.log("Title and table of contents generated successfully!");
  const title = t_a_toc.match(/<h1>(.*?)<\/h1>/)[1];
  console.log("Title: ", title);
  const chapterTitles = t_a_toc
    .match(/<h2>(.*?)<\/h2>/g)
    .map((title) => title.replace(/<\/?h2>/g, ""));
  console.log("Chapter titles: ", chapterTitles);
  const introductionTitle = chapterTitles.shift();
  console.log("Introduction title: ", introductionTitle);
  const conclusionTitle = chapterTitles.pop();
  console.log("Conclusion title: ", conclusionTitle);
  const bonusTitle = chapterTitles.pop();
  console.log("Bonus title: ", bonusTitle);

  let chapters = {};

  console.log("SETUP FINISHED - CONFIG READY... GENERATING CONTENT...");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Generating introduction...");
  chapters[introductionTitle] = await generateChapterContent(
    "Introduction Chapter",
    t_a_toc,
    openaiConfig,
    aiSysMessage
  );
  console.log("Introduction generated successfully!");

  for (let i = 0; i < chapterTitles.length; i++) {
    console.log("Generating chapter: ", chapterTitles[i], "...");
    try {
      chapters[chapterTitles[i]] = await generateChapterContent(
        chapterTitles[i],
        t_a_toc,
        openaiConfig,
        aiSysMessage
      );
      console.log("Chapter: ", chapterTitles[i], "generated successfully!");
    } catch (error) {
      console.log("Chapter: ", chapterTitles[i], "failed to generate!");
      console.log("Error: ", error);
    }
  }

  console.log("Generating conclusion...");
  chapters[conclusionTitle] = await generateChapterContent(
    conclusionTitle,
    t_a_toc,
    openaiConfig,
    aiSysMessage
  );
  console.log("Conclusion generated successfully!");

  console.log("Generating bonus chapter...");
  chapters[bonusTitle] = await generateChapterContent(
    bonusTitle,
    t_a_toc,
    openaiConfig,
    aiSysMessage
  );
  console.log("Bonus chapter generated successfully!");

  // Convert the HTML content to EPUB format
  const epubOptions = {
    title: title,
    author: authorName,
    content: [
      {
        title: "Cover",
        data: `<h1>${title}</h1>`,
      },
      {
        title: "Contents",
        data: t_a_toc,
      },
      ...Object.entries(chapters).map(([key, value]) => ({
        title: key,
        data: value,
      })),
    ],
  };

  const epubStream = new WritableStreamBuffer();

  console.log("Generating ebook file...");
  const epub = new Epub(epubOptions, epubStream);

  epub.promise.then(
    () => {
      console.log("ebook has been generated");

      // Send the EPUB file to the frontend
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${title}.epub`
      );
      res.setHeader("Content-Type", "application/epub+zip");
      res.status(200).send(epubStream.getContents());
    },
    (err) => {
      console.error("Failed to generate ebook:", err);
      res.status(500).json({ message: "Failed to generate ebook" });
    }
  );
  console.log("Ebook file generated successfully!");
});

router.get("/my-ebooks", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("ebooks");
    res.status(200).json({ ebooks: user.ebooks });
  } catch (err) {
    console.error("Failed to fetch ebooks:", err);
    res.status(500).json({ message: "Failed to fetch ebooks" });
  }
});

module.exports = router;
