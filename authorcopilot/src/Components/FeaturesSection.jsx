import React from "react";

import { CheckCircleIcon } from "@heroicons/react/outline";

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-white py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}

          <div className="text-center">
            <CheckCircleIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />

            <h3 className="text-xl font-semibold mb-2">Automated Writing</h3>

            <p className="text-blue-700">
              GPT-4 powered technology automates the ebook writing process.
            </p>
          </div>

          {/* Feature 2 */}

          <div className="text-center">
            <CheckCircleIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />

            <h3 className="text-xl font-semibold mb-2">Clean Formatting</h3>

            <p className="text-blue-700">
              Automatically formats your ebook to meet industry standards.
            </p>
          </div>

          {/* Feature 3 */}

          <div className="text-center">
            <CheckCircleIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />

            <h3 className="text-xl font-semibold mb-2">Quick Publishing</h3>

            <p className="text-blue-700">
              Streamline the publishing process with our easy-to-use platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
