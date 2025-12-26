import React from "react";
import Banner from "../components/home/Banner";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Testimonial from "../components/home/Testimonial";
import Footer from "../components/home/Footer";
import ContactUs from "../components/home/ContactUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Testimonial />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
