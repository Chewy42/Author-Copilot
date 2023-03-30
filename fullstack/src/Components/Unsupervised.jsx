import React, { useState } from "react";
import axios from "axios";

const Unsupervised = () => {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [error, setError] = useState("");

  const generateEbook = async () => {
    setGeneratedText(true);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/chat/unsupervised`,
        {
          openai_api_key: "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",
          orginization: "org-PIyyECxRrd44dRekgDdeywej",
          topic,
        }
      );
      console.log(response.data);
    } catch (error) {
      setError(error);
      console.error(error);
    }
    setGenerating(false);
  };

  return (
    <section className="container mx-auto px-4 py-6 flex-grow bg-white rounded-xl border-2 text-center hover:scale-[100.78%] drop-shadow-xl ease-linear transition-all duration-300">
      <h1 className="text-3xl mb-6 font-bold text-center">
        Unsupervised Ebook Generation
      </h1>
      <div className="mb-4">
        <label
          htmlFor="topic"
          className="block text-gray-700 text-lg font-bold mb-2"
        >
          Enter a topic for <span className="hover:text-accent">your</span>{" "}
          ebook:
        </label>
        <input
          id="topic"
          className="border-2 border-gray-300 bg-white h-10 px-4 pr-20 text-sm focus:outline-none focus:border-accent"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., The Art of Money"
        />
      </div>
      <button
        className="bg-secondary hover:scale-105 transition-all ease-linear duration-300 text-white font-bold py-2 px-4 rounded"
        disabled={generating}
        onClick={generateEbook}
      >
        {generating ? "Generating..." : "Generate Ebook"}
      </button>
      {error && <div className="mt-4 text-red-600 font-bold">{error}</div>}
      {generatedText && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Generated Text:</h2>
          <div className="border border-gray-400 p-4 bg-white max-h-96 overflow-y-scroll">
            {generatedText}
          </div>
        </div>
      )}
    </section>
  );
};

export default Unsupervised;
