import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Write your next ebook with AuthorCopilot
        </h1>

        <p className="text-lg text-blue-700 mb-8">
          Harness the power of GPT-4 to automate the ebook writing process.
        </p>

        <Link
          to="/signup"
          className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-3 rounded-md shadow-md"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
