import React from "react";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import FeaturesSection from "./Components/FeaturesSection";
import PricingSection from "./Components/PricingSection";
import LimitedTimeOffer from "./Components/LimitedTimeOffer"; // Add this import
import Footer from "./Components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <LimitedTimeOffer />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
