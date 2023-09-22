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

async function generateTitleAndTOC(topic, openaiConfig, aiSysMessage, numChapters) {
  const openai = new OpenAIApi(openaiConfig);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: aiSysMessage.content },
      {
        role: "user",
        content: `Your AI-assisted task is to generate an engaging title and a well-structured table of contents for an eBook on ${topic}. ABSOLUTELY MANDATORY: The eBook should include an introduction chapter, ${5} chapters inbetween, a conclusion chapter, and a bonus chapter. Please create a title that captures the essence of the book's content. For formatting, use standard HTML tags like <h1> for the title and <h2> for chapter headings. Thank you.`,
      },
      {
        "role": "user", 
        "content": "based on the table of contents, tell me ONLY the number of chapters. I am expecting a response of a number."
      }
    ],
    max_tokens: configurationObject.maxTokensTOC,
    temperature: configurationObject.temperature,
  });
  console.log("response.data.choices: ", response.data.choices)
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
      { role: "system", content: aiSysMessage.content },
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

const connections = {};

router.ws('/unsupervised', async (ws, req) => {
  const token = req.query.token;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    connections[user.id] = ws;
  } catch (e) {
    ws.close();
  }

  ws.on('message', async (msg) => {
    const { topic, user, numChapters } = JSON.parse(msg);
    const userFromDB = await User.findById(user.id);
    if (!userFromDB.openaiApiKey || !userFromDB.openaiOrgId) {
      ws.send(JSON.stringify({ error: "You have not provided an API key and organization ID. Please update your settings." }));
      return;
    }

    const openaiConfig = new Configuration({
      apiKey: userFromDB.openaiApiKey,
      organization: userFromDB.openaiOrgId,
    });

    const aiSysMessage = {
      content: 'Your role is to create a high-quality eBook in HTML format...',
    };

    const t_a_toc = await generateTitleAndTOC(topic, openaiConfig, aiSysMessage, numChapters);

    let chapters = {};
    chapters["Introduction"] = await generateChapterContent("Introduction Chapter", t_a_toc, openaiConfig, aiSysMessage);

    for (let i = 1; i < numChapters + 1; i++) {
      chapters[`Chapter ${i}`] = await generateChapterContent(`Chapter ${i}`, t_a_toc, openaiConfig, aiSysMessage);
    }

    chapters["Conclusion"] = await generateChapterContent("Conclusion Chapter", t_a_toc, openaiConfig, aiSysMessage);
    chapters["Bonus Chapter"] = await generateChapterContent("Bonus Chapter", t_a_toc, openaiConfig, aiSysMessage);

    let htmlContent = "";
    htmlContent += `${t_a_toc}`;
    Object.entries(chapters).forEach(([key, value]) => {
      htmlContent += key;
      htmlContent += `${value}`;
    });

    fs.writeFileSync("test.html", htmlContent);

    const epubOptions = {
      title: topic,
      author: user.name,
      content: [{ title: "Cover", data: `<h1>${topic}</h1>` }, { title: "Contents", data: t_a_toc }, ...Object.entries(chapters).map(([key, value]) => ({ title: key, data: value }))],
    };

    const epubStream = new WritableStreamBuffer();
    const epub = new Epub(epubOptions, epubStream);

    await epub.promise;

    ws.send(JSON.stringify({ data: epubStream.getContents().toString('base64') }));
  });
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
