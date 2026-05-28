const EASE = [0.22, 1, 0.36, 1];

export const fromLeft = {
  hidden: { x: -100, opacity: 0, filter: "blur(8px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

export const fromRight = {
  hidden: { x: 100, opacity: 0, filter: "blur(8px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

export const fadeUp = {
  hidden: { y: 50, opacity: 0, filter: "blur(6px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeUpSmall = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

export const scaleIn = {
  hidden: { scale: 0.85, opacity: 0, filter: "blur(8px)" },
  visible: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.25 },
  },
};

export const staggerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.2 },
  },
};

export const decorVariant = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut", delay: 0.1 },
  },
};

export const scrollHint = {
  initial: { y: 0, opacity: 0.7 },
  animate: {
    y: [0, 8, 0],
    opacity: [0.7, 1, 0.7],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};
