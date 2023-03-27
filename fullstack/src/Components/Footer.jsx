import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-12">
      <div className="container mx-auto text-center">
        <div className="text-xl font-bold mb-4">
          Author<span className="text-blue-300">Copilot</span>
        </div>

        <nav className="mb-6">
          <a
            href="#features"
            className="text-blue-200 hover:text-blue-100 px-4"
          >
            Features
          </a>

          <a href="#pricing" className="text-blue-200 hover:text-blue-100 px-4">
            Pricing
          </a>

          <a href="#contact" className="text-blue-200 hover:text-blue-100 px-4">
            Contact
          </a>
        </nav>

        <p className="text-blue-300">
          &copy; {new Date().getFullYear()} AuthorCopilot. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
