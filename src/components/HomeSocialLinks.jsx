import React, { useRef, useState } from "react";
import { motion } from "motion/react";

const HomeSocialLinks = ({ index, data }) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.4, y: y * 0.4 });
  };

  return (
    <motion.a
      ref={ref}
      target="_blank"
      rel="noopener noreferrer"
      href={data.uri || "#"}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, x: offset.x, y: offset.y }}
      transition={{ delay: (index || 0) * 0.08, type: "spring", stiffness: 220, damping: 18 }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      whileHover={{ scale: 1.12 }}
      className="w-11 h-11 rounded-full bg-bg-elevated border border-white/10 flex items-center justify-center text-text-primary hover:text-accent-teal hover:border-accent-teal/60 transition-colors"
      aria-label={data.id}
    >
      <data.Icon className="text-base" />
    </motion.a>
  );
};

export default HomeSocialLinks;
