import React from "react";
import Header from "./Components/Header";
import Landing from "./Components/Landing";
import FeaturesSection from "./Components/FeaturesSection";
import PricingSection from "./Components/PricingSection";
import LimitedTimeOffer from "./Components/LimitedTimeOffer"; // Add this import
import Footer from "./Components/Footer";
import TestimonialsSection from "./Components/TestimonialsSection";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Landing />
        <FeaturesSection />
        <TestimonialsSection />
        <LimitedTimeOffer />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;