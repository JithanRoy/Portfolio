import React, { useRef } from "react";
import { About, Contact, Experience, Home, Projects, Skills, Footer } from "./";
import { Loader, ScrollProgress } from "../components";
import useLoader from "../hooks/useLoader";
import useSectionSnap from "../hooks/useSectionSnap";

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "contact",
  "outro",
];

const App = () => {
  const containerRef = useRef(null);
  const { progress, isLoading } = useLoader();
  useSectionSnap(containerRef, SECTION_IDS);

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
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>

      <ScrollProgress containerRef={containerRef} />
    </>
  );
};

export default App;
