import React, { useState, useContext, useRef, useEffect } from "react";
import { CogIcon } from "@heroicons/react/outline";
import AuthContext from "./contexts/AuthContext";
import axios from "axios";

const Unsupervised = () => {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState("");
  const [ws, setWs] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3001/api/chat/unsupervised?token=${user.token}`);
    ws.onmessage = (message) => {
      const response = JSON.parse(message.data);
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        const blob = new Blob([new Uint8Array(response.data)], { type: "application/epub+zip" });
        const url = URL.createObjectURL(blob);
        setGeneratedText(url);
        setGenerating(false);
      }
    };
    setWs(ws);
    return () => ws.close();
  }, [user]);

  const generateEbook = () => {
    if (!topic) {
      setError("Please enter a topic for your ebook");
      return;
    }
    setGenerating(true);
    setError("");
    ws.send(JSON.stringify({ topic, user, numChapters: 5 }));
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
        {progress && <div className="mt-4 text-gray-600 font-bold">{progress}</div>}
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
