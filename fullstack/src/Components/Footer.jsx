import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-purple-800 text-white py-12">
      <div className="container mx-auto text-center">
        <div className="text-xl font-bold mb-4">
          Author<span className="text-purple-300">Copilot</span>
        </div>

        <nav className="mb-6">
          <Link
            to="#features"
            className="text-purple-300 hover:text-purple-200 px-4"
          >
            Features
          </Link>

          <Link
            to="#pricing"
            className="text-purple-300 hover:text-purple-200 px-4"
          >
            Pricing
          </Link>

          <Link
            to="/contact"
            className="text-purple-300 hover:text-purple-200 px-4"
          >
            Contact
          </Link>

          <Link
            to="/terms-of-service"
            className="text-purple-300 hover:text-purple-200 px-4"
          >
            Terms of Service
          </Link>
        </nav>

        <p className="text-purple-300">
          &copy; {new Date().getFullYear()} AuthorCopilot. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
