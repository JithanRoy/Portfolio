import React, { useRef } from "react";
import { About, Contact, Home, Projects, Skills, Footer } from "./";
import { Loader, ScrollProgress } from "../components";
import useLenis from "../hooks/useLenis";
import useLoader from "../hooks/useLoader";

const App = () => {
  const containerRef = useRef(null);
  const { progress, isLoading } = useLoader();
  useLenis(containerRef);

  return (
    <>
      <Loader progress={progress} isLoading={isLoading} />

      <main
        ref={containerRef}
        className="snap-container bg-bg-deep text-text-primary"
      >
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>

      <ScrollProgress containerRef={containerRef} />
    </>
  );
};

export default App;
