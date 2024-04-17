import React from 'react';
import HeroSection from '../Home/HeroSection'; // Assuming styled with Material UI
import Cards from '../Home/Cards'; // Assuming styled with Material UI
import WhyChooseUs from '../Home/whyus';
import Footer from '../Home/Footer'; // Assuming styled with Material UI

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <WhyChooseUs />
      <Footer />
    </>
  );
}

export default Home;
