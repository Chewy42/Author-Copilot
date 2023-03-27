import React from "react";

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-blue-50 py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">
          Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Plan 1 */}

          <div className="bg-white p-8 rounded-md shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Basic</h3>

            <p className="text-blue-700 mb-6">
              Perfect for individuals looking to write their first ebook.
            </p>

            <div className="text-4xl font-bold mb-6">$9.99/mo</div>

            <a
              href="#subscribe"
              className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-3 rounded-md shadow-md"
            >
              Subscribe
            </a>
          </div>

          {/* Plan 2 */}

          <div className="bg-white p-8 rounded-md shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Pro</h3>

            <p className="text-blue-700 mb-6">
              Ideal for experienced writers and small businesses.
            </p>

            <div className="text-4xl font-bold mb-6">$19.99/mo</div>

            <a
              href="#subscribe"
              className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-3 rounded-md shadow-md"
            >
              Subscribe
            </a>
          </div>

          {/* Plan 3 */}

          <div className="bg-white p-8 rounded-md shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>

            <p className="text-blue-700 mb-6">
              Customized solution for large organizations and publishers.
            </p>

            <div className="text-4xl font-bold mb-6">Contact Us</div>

            <a
              href="#contact"
              className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-3 rounded-md shadow-md"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
