const express = require("express");
const router = express.Router();
const { generateEbook } = require("../ebookGeneratorUnsupervised");

router.post("/generateEbook", async (req, res) => {
  try {
    const { topic } = req.body;
    const { ebook, tableOfContents, error } = await generateEbook(topic);
    
    if (error) {
      console.error("Error in generateEbook function:", error);
      return res.status(500).json({ message: error });
    }

    res.status(200).json({ content: ebook });
  } catch (err) {
    console.error("Error in the chat route:", err);
    res.status(500).json({ message: "Error generating ebook" });
  }
});

module.exports = router;
