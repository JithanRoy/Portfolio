import React from "react";
import { motion } from "motion/react";
import { decorVariant } from "../utils/motionVariants";

export const Blob = ({ className = "", color = "teal", size = 320, delay = 0 }) => {
  const colorMap = {
    teal: "#00ADB5",
    coral: "#FF6B6B",
    amber: "#FFB454",
    violet: "#A78BFA",
  };
  return (
    <motion.div
      variants={decorVariant}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)`,
        filter: "blur(60px)",
        opacity: 0.35,
      }}
      animate={{
        x: [0, 30, -10, 0],
        y: [0, -20, 10, 0],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`absolute rounded-full pointer-events-none ${className}`}
    />
  );
};

export const Shape = ({ variant = "ring", color = "coral", size = 60, className = "", spin = true }) => {
  const colorMap = {
    teal: "#00ADB5",
    coral: "#FF6B6B",
    amber: "#FFB454",
    violet: "#A78BFA",
  };
  const c = colorMap[color];

  const inner = () => {
    if (variant === "ring") {
      return (
        <div
          style={{
            width: size,
            height: size,
            border: `2px solid ${c}`,
            borderRadius: "50%",
          }}
        />
      );
    }
    if (variant === "disc") {
      return (
        <div
          style={{
            width: size,
            height: size,
            background: c,
            borderRadius: "50%",
            opacity: 0.85,
          }}
        />
      );
    }
    if (variant === "square") {
      return (
        <div
          style={{
            width: size,
            height: size,
            background: c,
            opacity: 0.85,
          }}
        />
      );
    }
    if (variant === "arc") {
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <path
            d="M 10 90 A 80 80 0 0 1 90 10"
            stroke={c}
            strokeWidth="3"
            fill="none"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <motion.div
      variants={decorVariant}
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 20, repeat: Infinity, ease: "linear" } : undefined}
      className={`absolute pointer-events-none ${className}`}
    >
      {inner()}
    </motion.div>
  );
};

export const NumberMark = ({ value, className = "" }) => (
  <div
    aria-hidden
    className={`section-number text-[12rem] md:text-[18rem] leading-none select-none absolute pointer-events-none ${className}`}
  >
    {value}
  </div>
);

export const DotGrid = ({ className = "", color = "amber" }) => {
  const colorMap = { teal: "#00ADB5", coral: "#FF6B6B", amber: "#FFB454", violet: "#A78BFA" };
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: 180,
        height: 180,
        backgroundImage: `radial-gradient(${colorMap[color]} 1.5px, transparent 1.5px)`,
        backgroundSize: "18px 18px",
        opacity: 0.35,
      }}
    />
  );
};
