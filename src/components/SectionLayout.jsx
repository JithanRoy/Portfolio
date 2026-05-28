import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, staggerFast } from "../utils/motionVariants";

const SectionLayout = ({
  id,
  index,
  label,
  children,
  leftDecor = null,
  rightDecor = null,
  centerDecor = null,
  staggerMode = "normal",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });

  const variants = staggerMode === "fast" ? staggerFast : staggerContainer;

  return (
    <section id={id} ref={ref} className="snap-section">
      <motion.div
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      >
        {leftDecor && <div className="absolute inset-y-0 left-0 w-1/2">{leftDecor}</div>}
        {rightDecor && <div className="absolute inset-y-0 right-0 w-1/2">{rightDecor}</div>}
        {centerDecor}
      </motion.div>

      {(index !== undefined || label) && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="absolute top-8 left-6 lg:top-12 lg:left-12 flex items-center gap-4 z-10"
        >
          {index !== undefined && (
            <span className="font-display text-accent-teal text-sm tracking-[0.3em]">
              {String(index).padStart(2, "0")}
            </span>
          )}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ originX: 0 }}
            className="h-px w-12 bg-accent-teal/40"
          />
          {label && (
            <span className="text-text-muted text-xs tracking-[0.3em] uppercase">
              {label}
            </span>
          )}
        </motion.div>
      )}

      <motion.div
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionLayout;
