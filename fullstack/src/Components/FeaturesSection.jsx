import React from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-purple-800 mb-16">
          Unlock Exclusive Premium Features with AuthorCopilot
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <CheckCircleIcon className="w-12 h-12 mx-auto mb-6 text-purple-800" />
            <h3 className="text-2xl font-semibold mb-4 text-center">Automated Writing</h3>
            <p className="text-purple-900 text-center">
              Utilize our advanced GPT-4 powered technology to automatically generate high-quality content. Say goodbye to writer's block and hello to unlimited creativity.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <CheckCircleIcon className="w-12 h-12 mx-auto mb-6 text-purple-800" />
            <h3 className="text-2xl font-semibold mb-4 text-center">Industry-Standard Formatting</h3>
            <p className="text-purple-900 text-center">
              Enjoy hassle-free formatting and ensure your ebook meets industry standards. Impress your readers with a professionally designed ebook that stands out from the crowd.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <CheckCircleIcon className="w-12 h-12 mx-auto mb-6 text-purple-800" />
            <h3 className="text-2xl font-semibold mb-4 text-center">Efficient Publishing</h3>
            <p className="text-purple-900 text-center">
              Easily publish your ebook on multiple platforms and reach a wider audience. Maximize your earning potential with our streamlined publishing process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;