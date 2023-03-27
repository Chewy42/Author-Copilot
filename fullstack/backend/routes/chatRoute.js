const fs = require("fs");
const util = require("util");
const { Configuration, OpenAIApi } = require("openai");

const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG,
});

const openai = new OpenAIApi(configuration);

async function generateEbook(topic) {
  console.log("Generating ebook for topic:", topic);
  // Introduction message
  const introMessage = {
    role: "system",
    content: `Welcome to the Unsupervised Ebook Generator. In just a few minutes, you will have a complete ebook on the topic of "${topic}". Sit back and relax while we generate your book.`,
  };

  // Outro message
  const outroMessage = {
    role: "system",
    content: `Thank you for using the Unsupervised Ebook Generator. We hope you enjoy your new ebook!`,
  };

  // Generate ebook content
  async function generateContent(chapterNumber, chapterTitle) {
    const chatMessages = [
      `Chapter ${chapterNumber}: ${chapterTitle}`,
      `Please write a chapter on "${chapterTitle}". Your chapter should be at least 2500 words and should be engaging and informative. Don't worry about formatting or grammar, we'll take care of that for you.`,
    ];

    const response = await openai.createCompletion({
      engine: "davinci",
      prompt: chatMessages.join("\n"),
      max_tokens: 4096,
      temperature: 0.5,
      n: 1,
      stop: "\n\n",
    });

    const content = response.choices[0].text.trim();

    return content;
  }

  // Generate ebook
  async function generateEbookContent() {
    // Create book draft file
    await writeFile(`${topic}.txt`, "");

    // Generate table of contents
    let tableOfContents = "Table of Contents\n\n";
    for (let i = 1; i <= 10; i++) {
      const chapterTitle = await generateContent(i, `Chapter ${i}`);
      tableOfContents += `Chapter ${i}: ${chapterTitle}\n`;
      await appendFile(`${topic}.txt`, `\n\nChapter ${i}: ${chapterTitle}`);
    }

    // Write table of contents to file
    await writeFile(`${topic}-toc.txt`, tableOfContents);

    // Write outro message to file
    await appendFile(`${topic}.txt`, `\n\n${outroMessage.content}`);

    return { ebook: `${topic}.txt`, toc: `${topic}-toc.txt` };
  }

  // Execute ebook generation
  try {
    await appendFile(`${topic}.txt`, introMessage.content);

    const ebookData = await generateEbookContent();

    return ebookData;
  } catch (err) {
    console.error(err);
    return { error: "Error generating ebook" };
  }
}

module.exports = generateEbook;
