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
  const aiSysMessage = {
    role: "system",
    content: `Topic: ${topic}. You have been given a unique opportunity to create a compelling ebook that will captivate readers with your creative, witty, and passionate writing style. Your task is to bring to life the ideas and insights provided to you and provide valuable information that genuinely helps readers.
    To create the best possible product, the ebook will be approximately 75 pages long, providing ample space for you to explore topics in depth and provide a range of insights and perspectives. To make the ebook as engaging and actionable as possible, it's important to include relevant call-to-action sections and create valuable takeaways for the reader.
    Each chapter must be at least 2,500 words, ensuring that there is enough substance to each topic. Additionally, the final ebook must be formatted effectively for digital publishing, allowing readers to easily access and enjoy the content.
    Above all, keep in mind that your writing must inspire and motivate readers to take action and achieve their goals. Your goal is to create a piece of writing that will not only entertain, but also educate and empower readers to make meaningful changes in their lives.`,
  };

  async function generateChapter(chapterNumber, tableOfContents) {
    const prompt = `You are a skilled writer tasked with writing a chapter for an ebook.
Write a chapter for an ebook based on the following information with a minimum of 2500 words and an absolute minimum of 5 sentences per paragraph. Be insightful, intelligent but talk in simple terms, and professional like you know what you're talking about and keep the reader interested and captivated to read more. Table of contents: ${tableOfContents}. Chapter to write: ${chapterNumber}`;

    const response = await openai.createCompletion({
      engine: "gpt-3.5-turbo",
      prompt,
      maxTokens: 4096,
      temperature: 0.7,
      n: 1,
      stop: "\n\n",
    });

    console.log(response);

    const content = response.choices[0].text.trim();
    await appendFile(
      "book_draft.txt",
      `\n\nChapter ${chapterNumber}: ${content}`
    );
    await appendFile(
      "log.txt",
      `\n\n\n\n\n\n\n-----------------------------------\n${content}\n-----------------------------------`
    );

    return content;
  }

  try {
    // Create book draft file
    await writeFile("book_draft.txt", "");

    // Introduction message
    await appendFile("book_draft.txt", aiSysMessage.content);

    // Generate table of contents
    let tableOfContents = "";
    for (let i = 1; i <= 10; i++) {
      const chapterTitle = await generateChapter(i, tableOfContents);
      tableOfContents += `Chapter ${i}: ${chapterTitle}\n`;
    }

    // Write table of contents to file
    await writeFile("table_of_contents.txt", tableOfContents);

    // Write outro message to file
    const outroMessage = {
      role: "system",
      content:
        "Thank you for reading this ebook. We hope you found it informative, engaging, and valuable. Remember, the journey to success is a lifelong process, and this book is just the beginning. Continue to learn, grow, and take action towards your goals. We wish you the best in your journey, and we're confident that you have the tools and knowledge to make a lasting impact on your life and the lives of others. Happy reading!",
    };

    await appendFile("book_draft.txt", `\n\n${outroMessage.content}`);

    console.log("Ebook generation completed.");
  } catch (error) {
    console.error("Error while generating ebook:", error);
  }
}

module.exports = {
  generateEbook,
};
