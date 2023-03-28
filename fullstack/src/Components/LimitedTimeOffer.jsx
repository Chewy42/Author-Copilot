import React, { useEffect, useState } from "react";
import { CheckCircleIcon, UserGroupIcon } from "@heroicons/react/outline";

const LimitedTimeOffer = () => {
  const [remainingTime, setRemainingTime] = useState(null);

  const calculateRemainingTime = () => {
    const endTime = new Date("2023-04-30T00:00:00");
    const currentTime = new Date();
    const remaining = endTime - currentTime;
    setRemainingTime(remaining);
  };

  useEffect(() => {
    calculateRemainingTime();
    const timer = setInterval(calculateRemainingTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Limited Time Offer: 50% Off
          </h2>
          <p className="text-lg text-white mb-6">
            Subscribe now and get a 50% discount on your first month. Don't miss out on this amazing deal!
          </p>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <CheckCircleIcon className="w-6 h-6 text-white" />
            <span className="text-white">
              Offer ends in {Math.floor(remainingTime / (1000 * 60 * 60 * 24))} days
            </span>
          </div>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <UserGroupIcon className="w-6 h-6 text-white" />
            <span className="text-white">Join over 5000 satisfied customers</span>
          </div>
          <button className="w-full md:w-auto bg-white hover:bg-gray-100 focus:ring-4 focus:ring-purple-400 text-purple-800 font-bold py-3 px-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-110">
            Claim Your Offer Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default LimitedTimeOffer;
