const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
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

//post route to generate ebook unsupervised
router.post("/unsupervised", async (req, res) => {
  let t_a_toc = "";
  //security checks and api key validation
  const { openai_api_key, orginization, topic } = req.body;
  const configuration = new Configuration({
    apiKey: openai_api_key,
  });
  const openai = new OpenAIApi(configuration);

  console.log("yeet");
  const aiSysMessage = {
    role: "system",
    content: `Topic: ${topic}. Welcome to the world of professional authorship. As an advanced AI language model, you have the ability to write compelling, high-quality books or ebooks that captivate and engage readers. With your advanced intelligence, creativity, and linguistic capabilities, you have the power to craft stories that inspire, entertain, and enlighten your readers. So let your imagination soar and write a book or ebook that will leave your readers spellbound and eager for more.`,
  };
  const userMessage = "Your task is to create the title and table of contents for a book on [insert topic]. The book should have an introduction, 13 chapters, a conclusion, and a bonus chapter. Please create a title that is engaging and reflective of the book's contents. Each <h1> must have atleast 4 <h2>'s and each <h2> should have 3 <p>'s with 4 sentences minimum. The table of contents should list each chapter by number and name, with each chapter name on a new line. Please include the title, introduction, conclusion, and bonus chapter in the table of contents. Please use standard HTML tags such as <h1> for the title and <h2> for the chapter headings. Thank you."

  //get table of contents
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [aiSysMessage, { role: "user", content: userMessage }],
    max_tokens: 1000,
    temperature: 0.7,
  });

  //append to a file with the topic name _ the current date an dtime
  const date = new Date();
  const dateStr = date.toDateString();
  const timeStr = date.toLocaleTimeString();
  const fileName = `${topic}_${dateStr}_${timeStr}.html`;

  fs.appendFile(
    fileName,
    response.data.choices[0].message.content + "\n\n\n\n",
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );

  t_a_toc = response.data.choices[0].message.content;

  chapters = {};

  //write introduction chapter
  const introduction = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      aiSysMessage,
      {
        role: "user",
        content: `Welcome to the world of professional writing. Your task is to write the introduction chapter for a book on ${t_a_toc}, ensuring that it is an absolute minimum of 2,000 words and a maximum of 2,300 words. Your goal is to have a strong start and captivate the reader's attention from the beginning. As an intelligent AI language model, you have the ability to craft a book that is extremely valuable and provides readers with valuable information. Please format the document using standard HTML tags such as <h1> for titles, <h2> for subtitles, and <p> for paragraphs, as this will ensure that the book can be easily converted to .epub format. Each <h1> must have atleast 4 <h2>'s and each <h2> should have 3 <p>'s with 4 sentences minimum. The table of contents has already been created and should include each chapter by number and name. Please use your creative and insightful writing skills to make the most of this valuable opportunity. Thank you.`,
      },
    ],
    max_tokens: 2048,
    temperature: 0.7,
  });

  fs.appendFile(
    fileName,
    introduction.data.choices[0].message.content + "\n\n\n\n",
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );

  chapters["Chapter: Introduction"] =
    introduction.data.choices[0].message.content;

    //robust loop to make 13 chapters
  for (let i = 1; i < 14; i++) {
    const chapter = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        aiSysMessage,
        {
          role: "user",
          content: `Welcome to the world of professional writing. Your task is to write chapter ${i} for a book on ${t_a_toc}, ensuring that it is an absolute minimum of 2,000 words and a maximum of 2,300 words. Your goal is to have a strong start and captivate the reader's attention from the beginning. As an intelligent AI language model, you have the ability to craft a book that is extremely valuable and provides readers with valuable information. Please format the document using standard HTML tags such as <h1> for titles, <h2> for subtitles, and <p> for paragraphs, as this will ensure that the book can be easily converted to .epub format. Each <h1> must have atleast 4 <h2>'s and each <h2> should have 3 <p>'s with 4 sentences minimum. The table of contents has already been created and should include each chapter by number and name. Please use your creative and insightful writing skills to make the most of this valuable opportunity. Thank you.`,
        },
      ],
      max_tokens: 2048,
      temperature: 0.7,
    });

    fs.appendFile(
      fileName,
      chapter.data.choices[0].message.content + "\n\n\n\n",
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );

    chapters[`Chapter: ${i}`] = chapter.data.choices[0].message.content;
  }

  //write conclusion chapter
  const conclusion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      aiSysMessage,
      {
        role: "user",
        content: `Welcome to the world of professional writing. Your task is to write the conclusion chapter for a book on ${t_a_toc}, ensuring that it is an absolute minimum of 2,000 words and a maximum of 2,300 words. Your goal is to have a strong start and captivate the reader's attention from the beginning. As an intelligent AI language model, you have the ability to craft a book that is extremely valuable and provides readers with valuable information. Please format the document using standard HTML tags such as <h1> for titles, <h2> for subtitles, and <p> for paragraphs, as this will ensure that the book can be easily converted to .epub format. Each <h1> must have atleast 4 <h2>'s and each <h2> should have 3 <p>'s with 4 sentences minimum. The table of contents has already been created and should include each chapter by number and name. Please use your creative and insightful writing skills to make the most of this valuable opportunity. Thank you.`,
      },
    ],
    max_tokens: 2048,
    temperature: 0.7,
  });

  fs.appendFile(
    fileName,
    conclusion.data.choices[0].message.content + "\n\n\n\n",
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );

  chapters["Chapter: Conclusion"] =
    conclusion.data.choices[0].message.content;

  //write bonus chapter
  const bonus = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      aiSysMessage,
      {
        role: "user",
        content: `Welcome to the world of professional writing. Your task is to write the BONUS chapter for a book on ${t_a_toc}, ensuring that it is an absolute minimum of 2,000 words. Your goal is to have a strong start and captivate the reader's attention from the beginning. As an intelligent AI language model, you have the ability to craft a book that is extremely valuable and provides readers with valuable information. Please format the document using standard HTML tags such as <h1> for titles, <h2> for subtitles, and <p> for paragraphs, as this will ensure that the book can be easily converted to .epub format. Each <h1> must have atleast 4 <h2>'s and each <h2> should have 3 <p>'s with 4 sentences minimum. The table of contents has already been created and should include each chapter by number and name. Please use your creative and insightful writing skills to make the most of this valuable opportunity. Thank you.`,
      },
    ],
    max_tokens: 2048,
    temperature: 0.7,
  });
  
  fs.appendFile(
    fileName,
    bonus.data.choices[0].message.content + "\n\n\n\n",
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );

  console.log("- ebook completed - mission success!")

});

module.exports = router;
