import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Security from "../components/Security";
import Pricing from "../components/Pricing";
import Navbar from '../components/Navbar'
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Security />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;
