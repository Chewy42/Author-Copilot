import React, { useState, useContext } from "react";
import { CogIcon } from "@heroicons/react/outline";
import AuthContext from "./contexts/AuthContext";
import axios from "axios";

const Unsupervised = () => {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  const generateEbook = async () => {
    if (!topic) {
      setError("Please enter a topic for your ebook");
      return;
    }

    setGenerating(true);
    setError("");

    try {
      console.log(user.token)

      const response = await axios.post(
        "http://localhost:3001/api/chat/unsupervised",
        { topic, user },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      const blob = new Blob([response.data], { type: "application/epub+zip" });
      const url = URL.createObjectURL(blob);

      setGeneratedText(url);
    } catch (err) {
      setError(err.message);
    }

    setGenerating(false);
  };

  // const downloadEbook = () => {
  //   if (!generatedText) {
  //     setError("No ebook has been generated");
  //     return;
  //   }

  //   const link = document.createElement("a");
  //   link.href = generatedText;
  //   link.download = `${topic}.epub`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

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
          Enter a topic for{" "}
          <span className="hover:text-accent transition-all duration-300">
            your
          </span>{" "}
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
        className="bg-secondary hover:scale-105 transition-all ease-linear duration-300 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        disabled={generating}
        onClick={generateEbook}
      >
        {generating && (
          <CogIcon className="animate-spin h-5 w-5 mr-2" aria-hidden="true" />
        )}
        {generating ? "Generating..." : "Generate Ebook"}
      </button>
      {error && <div className="mt-4 text-red-600 font-bold">{error}</div>}
      {generatedText && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Generated Ebook:</h2>
          <a
            className="text-accent hover:text-accent-hover transition-colors duration-300 ease-in-out"
            href={generatedText}
            download
          >
            Download Ebook
          </a>
        </div>
      )}
    </section>
  );
};

export default Unsupervised;
