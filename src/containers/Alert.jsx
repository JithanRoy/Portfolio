import React from "react";
import { motion } from "motion/react";

const Alert = ({ status, message }) => {
  const statusConfig = {
    success: { ring: "border-accent-teal", text: "text-accent-teal", bar: "bg-accent-teal" },
    warning: { ring: "border-accent-amber", text: "text-accent-amber", bar: "bg-accent-amber" },
    danger: { ring: "border-accent-coral", text: "text-accent-coral", bar: "bg-accent-coral" },
  };
  const config = statusConfig[status] || statusConfig.success;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-8 right-8 z-[80] px-4 py-3 rounded-md border ${config.ring} bg-bg-surface/90 backdrop-blur-md min-w-[240px]`}
    >
      <p className={`${config.text} text-sm`}>{message}</p>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10 overflow-hidden rounded-b-md">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ width: 0 }}
          transition={{ duration: 4 }}
          className={`${config.bar} h-full`}
        />
      </div>
    </motion.div>
  );
};

export default Alert;
