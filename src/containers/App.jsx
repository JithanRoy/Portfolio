import React from "react";
import { About, Contact, Header, Home, ParticlesContainer, Projects, Skills, Footer } from './';

const App = () => {
  return (
    <div className="w-full xl:w-[1600px] py-12 md:py-32 px-4 md:px-12 lg:px-32 mx-auto overflow-hidden">
        {/* Fire Glow Border */}
        <div className="fixed inset-0 border-2 border-transparent pointer-events-none z-[9999] animate-fire"></div>
        {/* particles container */}  
        <ParticlesContainer />
        {/* header */}
        <Header />

        {/* home container */}
        <Home />

        {/* services count cards  */}
        {/*<ServiceCount />*/}

        {/* about container */}
        <About />

        {/* skills container */}
        <Skills />

        {/* projects container */}
        <Projects />

        {/* contact container */}
        <Contact />

        {/* footer container */}
        <Footer />
    </div>
  );
};

export default App;
