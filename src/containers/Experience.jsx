import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiBriefcase, FiMapPin, FiCalendar } from "react-icons/fi";
import { SectionLayout } from "../components";
import { Blob, DotGrid, NumberMark } from "../components/Decorations";
import { ExperienceData } from "../utils/helper";
import { fadeUp, fromLeft } from "../utils/motionVariants";

// chronological: left = oldest, right = current
const ordered = [...ExperienceData].reverse();

const yearOf = (period) => {
  const m = period.match(/(\d{4})/);
  return m ? m[1] : "";
};

const Experience = () => {
  const [activeIdx, setActiveIdx] = useState(ordered.length - 1);
  const active = ordered[activeIdx];

  return (
    <SectionLayout
      id="experience"
      index={4}
      label="Journey"
      staggerMode="fast"
      leftDecor={
        <>
          <Blob className="top-20 -left-16" color="violet" size={300} />
          <DotGrid className="bottom-12 left-8" color="teal" />
        </>
      }
      rightDecor={
        <>
          <Blob className="bottom-0 -right-12" color="coral" size={240} delay={1.2} />
          <NumberMark value="04" className="-top-6 -right-6" />
        </>
      }
    >
      <div className="mb-6 lg:mb-8 text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight"
        >
          <span className="text-text-primary">The </span>
          <span className="gradient-text">journey</span>
          <span className="text-text-primary"> so far.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-text-muted text-sm lg:text-base mt-2">
          Four years of shipping, learning, and leveling up.
        </motion.p>
      </div>

      <motion.div variants={fromLeft} className="relative max-w-5xl mx-auto">
        {/* horizontal rail with milestones */}
        <div className="relative mb-8">
          {/* background line */}
          <div className="absolute left-0 right-0 top-[34px] h-px bg-white/10" />
          {/* gradient progress line */}
          <div className="absolute left-0 right-0 top-[34px] h-px bg-gradient-to-r from-accent-teal via-accent-violet to-accent-coral" />

          <div className="relative grid grid-cols-3 gap-2">
            {ordered.map((item, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(i)}
                  className="group flex flex-col items-center text-center px-2"
                >
                  {/* year above */}
                  <span
                    className={`font-display text-sm lg:text-base tracking-widest mb-2 transition-colors ${
                      isActive ? "text-accent-teal" : "text-text-muted/60 group-hover:text-text-muted"
                    }`}
                  >
                    {yearOf(item.period)}
                  </span>

                  {/* node on the rail */}
                  <div className="relative flex items-center justify-center w-6 h-6">
                    {item.current && (
                      <motion.div
                        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-accent-teal"
                      />
                    )}
                    <motion.div
                      animate={{ scale: isActive ? 1.3 : 1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 22 }}
                      className={`relative w-3 h-3 rounded-full border-[3px] border-bg-deep transition-colors ${
                        isActive
                          ? "bg-accent-teal shadow-[0_0_18px_rgba(0,173,181,0.9)]"
                          : "bg-text-muted/40 group-hover:bg-accent-teal/70"
                      }`}
                    />
                  </div>

                  {/* company name below */}
                  <span
                    className={`text-sm lg:text-base font-semibold mt-3 transition-colors leading-tight ${
                      isActive ? "text-text-primary" : "text-text-muted/70 group-hover:text-text-muted"
                    }`}
                  >
                    {item.company}
                  </span>
                  <span
                    className={`text-xs tracking-wide mt-1 transition-colors ${
                      isActive ? "text-accent-teal" : "text-text-muted/40"
                    }`}
                  >
                    {item.role}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* active stop detail panel */}
        <div className="relative min-h-[22rem] lg:min-h-[24rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {/* gradient border wrapper */}
              <div
                className="relative h-full rounded-2xl p-[1px] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,173,181,0.6) 0%, rgba(167,139,250,0.3) 40%, transparent 70%, rgba(255,107,107,0.4) 100%)",
                }}
              >
                <div className="relative h-full rounded-2xl bg-bg-deep/90 backdrop-blur-xl overflow-hidden grid grid-cols-1 lg:grid-cols-[18rem_1fr]">
                  {/* LEFT panel — display year + company stamp */}
                  <div className="relative p-6 lg:p-8 flex flex-col justify-between bg-gradient-to-br from-accent-teal/10 via-transparent to-accent-violet/10 border-b lg:border-b-0 lg:border-r border-white/8 overflow-hidden">
                    {/* texture: dot pattern */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-30 pointer-events-none"
                      style={{
                        backgroundImage:
                          "radial-gradient(rgba(0,173,181,0.4) 1px, transparent 1px)",
                        backgroundSize: "14px 14px",
                      }}
                    />
                    {/* floating orb */}
                    <motion.div
                      aria-hidden
                      animate={{ y: [-8, 8, -8], scale: [1, 1.05, 1] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-primary opacity-30 blur-3xl pointer-events-none"
                    />

                    <div className="relative">
                      <p className="font-display font-bold text-6xl lg:text-7xl gradient-text leading-none">
                        {yearOf(active.period)}
                      </p>
                    </div>

                    <div className="relative mt-6 lg:mt-0">
                      <div className="h-px w-12 bg-accent-teal/40 mb-3" />
                      <p className="text-text-primary text-lg lg:text-xl font-semibold leading-tight">
                        {active.company}
                      </p>
                      <p className="text-text-muted text-xs mt-1 flex items-center gap-1.5">
                        <FiMapPin className="text-[11px]" />
                        {active.location}
                      </p>
                      <p className="text-text-muted text-xs mt-3 flex items-center gap-1.5">
                        <FiCalendar className="text-[11px]" />
                        {active.period}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT panel — role + highlights */}
                  <div className="relative p-6 lg:p-8 flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div>
                        <p className="text-text-muted text-[10px] tracking-[0.3em] uppercase mb-2">
                          Role
                        </p>
                        <h3 className="font-display font-bold text-2xl lg:text-3xl text-text-primary leading-tight flex items-center gap-3">
                          <FiBriefcase className="text-accent-teal text-xl" />
                          {active.role}
                        </h3>
                      </div>
                      {active.current && (
                        <span className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-accent-teal/15 text-accent-teal border border-accent-teal/30 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
                          Currently
                        </span>
                      )}
                    </div>

                    <p className="text-text-muted text-[10px] tracking-[0.3em] uppercase mb-3">
                      What I shipped
                    </p>
                    <ul className="flex flex-col gap-3">
                      {active.highlights.map((h, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + idx * 0.06, duration: 0.4 }}
                          className="text-text-muted text-sm lg:text-[15px] leading-relaxed flex gap-3 group"
                        >
                          <span className="mt-2 flex-shrink-0 w-4 h-px bg-accent-teal/50 group-hover:bg-accent-teal group-hover:w-6 transition-all" />
                          <span className="group-hover:text-text-primary transition-colors">
                            {h}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-[10px] tracking-widest uppercase text-text-muted/50 mt-4">
          Click a milestone to explore
        </p>
      </motion.div>
    </SectionLayout>
  );
};

export default Experience;
