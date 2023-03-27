import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClockIcon } from "@heroicons/react/outline";

const LimitedTimeOffer = () => {
  const [timeLeft, setTimeLeft] = useState(3600 * 24);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <section className="bg-red-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Limited Time Offer: 50% Off
        </h2>

        <p className="text-lg text-red-700 mb-8">
          Sign up now and get 50% off on our subscription plans.
        </p>

        <div className="flex justify-center items-center mb-8">
          <ClockIcon className="w-6 h-6 text-red-600 mr-2" />
          <span className="text-xl font-semibold text-red-600">
            {formatTime(timeLeft)}
          </span>
        </div>

        <Link
          to="/signup"
          className="bg-red-600 text-white hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50 px-6 py-3 rounded-md shadow-md transform transition-all duration-200 hover:scale-105"
          >
          Claim Offer
        </Link>
      </div>
    </section>
  );
};

export default LimitedTimeOffer;

