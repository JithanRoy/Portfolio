import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const STATUS_TEXTS = ["Loading assets", "Preparing scenes", "Almost there"];

const Loader = ({ progress, isLoading }) => {
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStatusIdx((i) => (i + 1) % STATUS_TEXTS.length);
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-bg-deep flex flex-col items-center justify-center overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0, originY: 1 }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
            className="absolute inset-0 bg-bg-deep"
          />

          <div className="relative flex flex-col items-center gap-10 px-6">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm tracking-[0.4em] text-text-muted uppercase"
            >
              Portfolio · 2026
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold text-7xl sm:text-8xl md:text-[8rem] leading-none gradient-text tabular-nums"
            >
              {String(progress).padStart(2, "0")}
            </motion.div>

            <div className="w-72 sm:w-80 md:w-96 flex flex-col gap-3">
              <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-teal-amber rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between text-[10px] tracking-[0.3em] uppercase text-text-muted/70">
                <span>Init</span>
                <span>Ready</span>
              </div>
            </div>

            <div className="h-5 overflow-hidden relative w-72 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={statusIdx}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-text-muted text-sm tracking-wide"
                >
                  {STATUS_TEXTS[statusIdx]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
