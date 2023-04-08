const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Configuration, OpenAIApi } = require("openai");
const Epub = require("epub-gen");
const { WritableStreamBuffer } = require("stream-buffers");
const User = require("../models/User");
const fs = require("fs");

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
  numChapters: "13",
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
        content: `Your AI-assisted task is to generate an engaging title and a well-structured table of contents for an eBook on ${topic}. ABSOLUTELY MANDATORY: The eBook should include an introduction chapter, ${configurationObject.numChapters} chapters inbetween, a conclusion chapter, and a bonus chapter. Please create a title that captures the essence of the book's content. For formatting, use standard HTML tags like <h1> for the title and <h2> for chapter headings. Thank you.`,
      },
      {
        "role": "user", 
        "content": "based on the table of contents, tell me ONLY the number of chapters. I am expecting a response of a number."
      }
    ],
    max_tokens: configurationObject.maxTokensTOC,
    temperature: configurationObject.temperature,
  });

  return {"t_a_toc": response.data.choices, "numChapters": response.data.choices[0].message.content[1]};
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
        content: `Please create the content for ${chapterTitle} in an eBook on ${t_a_toc}. The chapter must have a word count between 2,000 and 2,300 words. Use standard HTML tags, such as <h1> for titles, <h2> for subtitles, and <p> for paragraphs, to ensure seamless conversion to .epub format.`,
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
    content: `You have been tasked with creating a high-quality eBook that will provide exceptional value to readers. Your programming has equipped you with the ability to produce work that rivals that of the best authors. Your language model is capable of crafting engaging content that is both informative and entertaining. You have access to vast amounts of information and resources to ensure that your writing is accurate, relevant, and insightful. Your unique abilities make you the ideal tool for creating an exceptional eBook that will meet and exceed all expectations. To the public eye, you are just an author, not an AI so be seem realistic like a human, witty, smart, and psychologically intelligence when crafting your eBook. All of your books will be written in HTML format for easy conversion to .epub. Please use standard HTML tags, such as <h1> for titles, <h2> for subtitles, and <p> for paragraphs.`,
  };

  console.log("Generating title and table of contents...");
  const yooo = await generateTitleAndTOC(topic, openaiConfig, aiSysMessage)
  console.log(yooo)
  console.log("Title and table of contents generated successfully!");

  let chapters = {};

  console.log("SETUP FINISHED - CONFIG READY... GENERATING CONTENT...");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Generating introduction...");
  chapters["Introduction"] = await generateChapterContent(
    "Introduction Chapter",
    t_a_toc,
    openaiConfig,
    aiSysMessage
  );
  console.log("Introduction generated successfully!");

  for (let i = 1; i < numChapters+1; i++) {
    console.log("Generating chapter: ", i, "...");
    try {
      chapters[`Chapter ${i}`] = await generateChapterContent(
        `Chapter ${i}`,
        t_a_toc,
        openaiConfig,
        aiSysMessage
      );
      console.log(`Chapter: ${i.toString()} generated successfully!`);
    } catch (error) {
      console.log("Chapter: " + i.toString() + "failed to generate!");
      console.log("Error: ", error);
    }
  }

  console.log("Generating conclusion...");
  chapters["Conclusion"] = await generateChapterContent(
    "Conclusion Chapter",
    t_a_toc,
    openaiConfig,
    aiSysMessage
  );
  console.log("Conclusion generated successfully!");

  console.log("Generating bonus chapter...");
  chapters["Bonus Chapter"] = await generateChapterContent(
    "Bonus Chapter",
    t_a_toc,
    openaiConfig,
    aiSysMessage
  );
  console.log("Bonus chapter generated successfully!");

  //combine all the chapters and write out to html file locally
  let htmlContent = "";
  htmlContent += `${t_a_toc}`;
  htmlContent += `Introduction`;
  htmlContent += `${chapters["Introduction"]}`;
  for (let i = 1; i < numChapters+1; i++) {
    htmlContent += `Chapter ${i}`;
    htmlContent += `${chapters[`Chapter ${i}`]}`;
  }
  htmlContent += `Conclusion`;
  htmlContent += `${chapters["Conclusion"]}`;
  htmlContent += `Bonus Chapter`;
  htmlContent += `${chapters["Bonus Chapter"]}`;

  //write out the html
  fs.writeFile("test.html", htmlContent, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });


  // Convert the HTML content to EPUB format
  const epubOptions = {
    title: topic,
    author: authorName,
    content: [
      {
        title: "Cover",
        data: `<h1>${topic}</h1>`,
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
        `attachment; filename=${topic}.epub`
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
