import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { ArrowDownIcon } from "@heroicons/react/outline";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-purple-700 to-indigo-800 py-20 relative">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-6 animate-pulse">
          Write Engaging Ebooks That Sell with AuthorCopilot
        </h1>
        <p className="text-2xl text-white mb-8">
          Let AI assist you in crafting high-quality and compelling ebooks that
          engage readers and generate revenue. Join thousands of successful
          authors who have transformed their writing with AuthorCopilot.
        </p>
        <Link
          to="/signup"
          className="bg-white text-purple-700 hover:bg-purple-300 px-6 py-3 rounded-md shadow-md mr-4 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Get Started for Free
        </Link>
        <ScrollLink
          to="pricing"
          smooth={true}
          className="text-white cursor-pointer hover:text-purple-300 px-6 py-3 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Limited Time Offer: Save 50% Now
        </ScrollLink>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <ScrollLink to="pricing" smooth={true}>
          <ArrowDownIcon className="cursor-pointer w-12 h-12 text-white animate-bounce duration-500" />
        </ScrollLink>
      </div>
    </section>
  );
};

export default HeroSection;
