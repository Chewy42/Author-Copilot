import React from "react";
import { Link } from "react-router-dom";

const CallToActionSection = () => {
    return (
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">
          Claim Your 50% Off Limited-Time Offer Today!
        </h2>
        <p className="text-lg text-white mb-8">
          Don't miss out on this exclusive deal to unlock the full potential of our AI-powered ebook writing tools.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 hover:bg-blue-200 px-6 py-3 md shadow-md"
        >
          Get Started Now
        </Link>
      </div>
    </section>
  );
};

export default CallToActionSection;