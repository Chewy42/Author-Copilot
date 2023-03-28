import React from "react";

const PricingSection = () => {
  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">
          Exclusive Limited-Time Offer
        </h2>
        <p className="text-xl text-center text-purple-900 mb-12">
        Discover a world of possibilities with AuthorCopilot – the ultimate writing assistant that has helped thousands of satisfied customers to create their masterpieces. Act now and subscribe to AuthorCopilot to enjoy a limited-time 50% off discount offer, and unlock a range of prebuilt tools to help you create captivating ebooks. Please note that you will need to provide your own OpenAI API Key to start your subscription. Don't let this opportunity slip away – sign up now and unleash your writing potential!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pricing Plan 1 */}
          <div className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Basic Plan
            </h3>
            <p className="text-purple-900 text-center mb-6">
              Get access to essential features and start your ebook writing
              journey.
            </p>
            <p className="text-4xl font-bold text-center text-purple-800 mb-6">
              <span className="line-through">$9.99</span> $4.99/month
            </p>
            <button className="bg-purple-800 text-white hover:bg-purple-700 px-4 py-2 rounded-md shadow-md w-full">
              Subscribe Now
            </button>
          </div>
          {/* Pricing Plan 2 */}
          <div className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Pro Plan
            </h3>
            <p className="text-purple-900 text-center mb-6">
              Unlock premium features and turbocharge your ebook writing
              process.
            </p>
            <p className="text-4xl font-bold text-center text-purple-800 mb-6">
              <span className="line-through">$19.99</span> $9.99/month
            </p>
            <button className="bg-purple-800 text-white hover:bg-purple-700 px-4 py-2 rounded-md shadow-md w-full">
              Subscribe Now
            </button>
          </div>{" "}
          {/* Pricing Plan 3 */}
          <div className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Elite Plan
            </h3>
            <p className="text-purple-900 text-center mb-6">
              Gain access to all features and receive dedicated support for
              maximum success.
            </p>
            <p className="text-4xl font-bold text-center text-purple-800 mb-6">
              <span className="line-through">$39.99</span> $19.99/month
            </p>
            <button className="bg-purple-800 text-white hover:bg-purple-700 px-4 py-2 rounded-md shadow-md w-full">
              Subscribe Now
            </button>
          </div>
        </div>
        <p className="text-center text-purple-800 mt-12">
          Not sure yet? Try our{" "}
          <span className="underline">7-day free trial</span> and see the
          benefits for yourself!
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
