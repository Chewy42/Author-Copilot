import React from "react";
import { StarIcon } from "@heroicons/react/solid";

const ExpertOpinions = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">
          Endorsed by Industry Experts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Expert 1 */}
          <div className="text-center">
            <StarIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Expert Name 1</h3>
            <p className="text-blue-700">
              "AuthorCopilot helped me streamline my ebook creation process and
              increased my productivity by 200%."
            </p>
          </div>
          {/* Expert 2 */}
          <div className="text-center">
            <StarIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />

            <h3 className="text-xl font-semibold mb-2">Expert Name 2</h3>
            <p className="text-blue-700">
              "I've been recommending AuthorCopilot to all my clients. It's a
              game-changer for ebook authors!"
            </p>
          </div>
          {/* Expert 3 */}
          <div className="text-center">
            <StarIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Expert Name 3</h3>
            <p className="text-blue-700">
              "With AuthorCopilot, I can focus on my writing and let the
              platform handle the rest. It's fantastic!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertOpinions;
