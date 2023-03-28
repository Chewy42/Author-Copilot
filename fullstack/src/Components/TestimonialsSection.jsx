import React from "react";

const TestimonialsSection = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">
          Trusted by Thousands of Satisfied Customers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="text-center bg-white rounded-md shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <p className="text-lg mb-4">
              "AuthorCopilot has revolutionized the way I write my ebooks. The
              AI-powered tools save me time and help me create better content.
              Plus, the affordable subscription has paid for itself tenfold!"
            </p>
            <h4 className="text-xl font-semibold mb-2">John Doe</h4>
            <p className="text-sm text-purple-800">Best-selling Author</p>
          </div>

          {/* Testimonial 2 */}
          <div className="text-center bg-white rounded-md shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <p className="text-lg mb-4">
              "The automation features of AuthorCopilot save me so much time and
              effort. I can focus on my creative ideas! Their customer loyalty
              program keeps me coming back for more."
            </p>
            <h4 className="text-xl font-semibold mb-2">Jane Smith</h4>
            <p className="text-sm text-purple-800">Content Creator</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
