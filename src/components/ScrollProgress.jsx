import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "outro", label: "Outro" },
];

const ScrollProgress = ({ containerRef }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const root = containerRef?.current;
    if (!root) return;

    const targets = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = SECTIONS.findIndex((s) => s.id === visible.target.id);
          if (idx !== -1) setActiveIdx(idx);
        }
      },
      { root, threshold: [0.3, 0.5, 0.7] }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [containerRef]);

  const scrollTo = (idx) => {
    const root = containerRef?.current;
    const target = document.getElementById(SECTIONS[idx].id);
    if (!root || !target) return;
    root.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  };

  return (
    <>
      <nav
        aria-label="Section navigation"
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-2"
      >
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollTo(i)}
            aria-label={`Go to ${s.label}`}
            className="group relative flex items-center gap-3 py-2 pr-1"
          >
            <span
              className={`font-display text-xs tabular-nums transition-colors ${
                activeIdx === i ? "text-accent-teal" : "text-text-muted/50 group-hover:text-text-muted"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="relative block w-8 h-px bg-white/15">
              {activeIdx === i && (
                <motion.span
                  layoutId="rail-active"
                  className="absolute inset-y-0 left-0 w-full bg-accent-teal"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </span>
            <span className="absolute right-full mr-3 text-xs tracking-widest uppercase text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {s.label}
            </span>
          </button>
        ))}
      </nav>

      <nav
        aria-label="Section navigation"
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-full bg-bg-surface/80 backdrop-blur border border-white/10"
      >
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollTo(i)}
            aria-label={`Go to ${s.label}`}
            className={`h-2 rounded-full transition-all ${
              activeIdx === i ? "w-6 bg-accent-teal" : "w-2 bg-white/25"
            }`}
          />
        ))}
      </nav>
    </>
  );
};

export default ScrollProgress;
