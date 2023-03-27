import React from "react";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-gray-100 py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">
          Testimonials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="text-center">
            <p className="text-lg mb-4">
              "AuthorCopilot has revolutionized the way I write my ebooks. The
              AI-powered tools are incredibly helpful."
            </p>
            <h4 className="text-xl font-semibold">John Doe</            h4>
            <p className="text-sm text-blue-600">Best-selling Author</p>
          </div>

          {/* Testimonial 2 */}
          <div className="text-center">
            <p className="text-lg mb-4">
              "The automation features of AuthorCopilot save me so much time and
              effort. I can focus on my creative ideas!"
            </p>
            <h4 className="text-xl font-semibold">Jane Smith</h4>
            <p className="text-sm text-blue-600">Content Creator</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

