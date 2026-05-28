import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FiHome,
  FiUser,
  FiZap,
  FiActivity,
  FiBriefcase,
  FiMail,
  FiHeart,
  FiChevronUp,
} from "react-icons/fi";

const SECTIONS = [
  { id: "home", label: "Home", Icon: FiHome },
  { id: "about", label: "About", Icon: FiUser },
  { id: "skills", label: "Skills", Icon: FiZap },
  { id: "experience", label: "Journey", Icon: FiActivity },
  { id: "projects", label: "Projects", Icon: FiBriefcase },
  { id: "contact", label: "Contact", Icon: FiMail },
  { id: "outro", label: "Outro", Icon: FiHeart },
];

const ScrollProgress = ({ containerRef }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = containerRef?.current;
    if (!root) return;

    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    );

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
    setOpen(false);
  };

  const active = SECTIONS[activeIdx];
  const ActiveIcon = active.Icon;
  const progress = ((activeIdx + 1) / SECTIONS.length) * 100;
  const ringCirc = 2 * Math.PI * 14; // r=14
  const ringOffset = ringCirc - (ringCirc * progress) / 100;

  return (
    <>
      {/* DESKTOP: vertical rail (unchanged behavior) */}
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
                activeIdx === i
                  ? "text-accent-teal"
                  : "text-text-muted/50 group-hover:text-text-muted"
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

      {/* MOBILE: expandable pill nav with progress ring */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        {/* expanded menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[18rem]"
            >
              <div className="rounded-2xl bg-bg-deep/95 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-2">
                <div className="grid grid-cols-1 gap-0.5">
                  {SECTIONS.map((s, i) => {
                    const Icon = s.Icon;
                    const isActive = i === activeIdx;
                    return (
                      <motion.button
                        key={s.id}
                        onClick={() => scrollTo(i)}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.035, duration: 0.25 }}
                        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                          isActive
                            ? "bg-accent-teal/15"
                            : "hover:bg-white/5 active:bg-white/10"
                        }`}
                      >
                        <span
                          className={`font-display text-[10px] tabular-nums tracking-widest ${
                            isActive ? "text-accent-teal" : "text-text-muted/50"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-colors ${
                            isActive
                              ? "border-accent-teal/50 bg-accent-teal/10 text-accent-teal"
                              : "border-white/10 text-text-muted"
                          }`}
                        >
                          <Icon className="text-sm" />
                        </span>
                        <span
                          className={`flex-1 text-left text-sm font-medium transition-colors ${
                            isActive ? "text-text-primary" : "text-text-muted"
                          }`}
                        >
                          {s.label}
                        </span>
                        {isActive && (
                          <motion.span
                            layoutId="mobile-nav-active"
                            className="w-1.5 h-1.5 rounded-full bg-accent-teal shadow-[0_0_8px_rgba(0,173,181,0.8)]"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* collapsed pill button */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.96 }}
          aria-label="Open section navigation"
          className="relative flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-bg-deep/95 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
        >
          {/* progress ring with icon */}
          <span className="relative flex items-center justify-center w-9 h-9">
            <svg
              className="absolute inset-0 -rotate-90"
              viewBox="0 0 36 36"
              width="36"
              height="36"
            >
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
              />
              <motion.circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="url(#nav-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={ringCirc}
                initial={false}
                animate={{ strokeDashoffset: ringOffset }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              <defs>
                <linearGradient
                  id="nav-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00ADB5" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
            </svg>
            <AnimatePresence mode="wait">
              <motion.span
                key={active.id}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="text-accent-teal text-sm"
              >
                <ActiveIcon />
              </motion.span>
            </AnimatePresence>
          </span>

          {/* label + counter */}
          <span className="flex flex-col items-start leading-none">
            <AnimatePresence mode="wait">
              <motion.span
                key={active.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-text-primary text-sm font-semibold tracking-wide"
              >
                {active.label}
              </motion.span>
            </AnimatePresence>
            <span className="text-[9px] tracking-[0.3em] uppercase text-text-muted/70 mt-1">
              {String(activeIdx + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
            </span>
          </span>

          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-text-muted/70 text-sm ml-1"
          >
            <FiChevronUp />
          </motion.span>
        </motion.button>
      </div>
    </>
  );
};

export default ScrollProgress;
