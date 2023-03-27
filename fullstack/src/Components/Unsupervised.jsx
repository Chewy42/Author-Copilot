import React, { useState } from "react";
import { generateEbook } from "../api";

const Unsupervised = () => {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");

  const downloadEbook = (data, filename) => {
    const file = new Blob([data], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
  };  

  const handleGenerate = async () => {
    setGenerating(true);
    const { content } = await generateEbook(topic);
    setGeneratedText(content);
    setGenerating(false);
    downloadEbook(content, `${topic}.txt`);
  };
  
  return (
    <section className="container mx-auto px-4 py-6 flex-grow bg-gray-100">
      <h1 className="text-3xl mb-6">Unsupervised Ebook Generation</h1>
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter the topic for the ebook"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
        disabled={generating}
        onClick={handleGenerate}
      >
        {generating ? "Generating..." : "Generate Ebook"}
      </button>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Generated Text:</h2>
        <div className="border border-gray-400 p-4 bg-white max-h-96 overflow-y-scroll">
          {generatedText}
        </div>
      </div>
    </section>
  );
};

export default Unsupervised;
