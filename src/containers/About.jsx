import React from "react";
import { motion } from "motion/react";
import { about } from "../assets";
import { SectionLayout } from "../components";
import { Blob, Shape, NumberMark } from "../components/Decorations";
import { AboutData } from "../utils/helper";
import { fromLeft, fromRight, fadeUp } from "../utils/motionVariants";

const About = () => {
  return (
    <SectionLayout
      id="about"
      index={2}
      label="About"
      leftDecor={
        <>
          <Blob className="top-1/3 -left-16" color="coral" size={360} />
          <Shape variant="ring" color="amber" size={80} className="bottom-20 left-1/3" />
        </>
      }
      rightDecor={
        <>
          <Blob className="bottom-10 -right-16" color="amber" size={320} delay={1.5} />
          <NumberMark value="02" className="-top-6 -right-6" />
        </>
      }
      staggerMode="fast"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="order-2 lg:order-1 flex flex-col gap-4 lg:gap-5">
          <motion.div
            variants={fromLeft}
            className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl leading-tight"
          >
            <span className="block gradient-text-warm">Engineering</span>
            <span className="block text-text-primary">that ships.</span>
          </motion.div>

          {AboutData.paragraphs.map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="text-text-muted text-sm lg:text-base leading-relaxed"
            >
              {para}
            </motion.p>
          ))}
        </div>

        <motion.div
          variants={fromRight}
          className="order-1 lg:order-2 flex justify-center"
        >
          <motion.div
            animate={{ y: [-6, 6, -6], rotate: -3 }}
            transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 0 } }}
            className="relative w-56 sm:w-80 lg:w-96"
          >
            <div className="absolute -inset-1 bg-gradient-decor rounded-2xl blur-sm opacity-70" />
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/10">
              <img src={about} alt="Profile" className="w-full h-auto block" />
            </div>
            <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-accent-teal" />
            <div className="absolute -bottom-4 -left-4 w-7 h-7 bg-accent-violet" />
          </motion.div>
        </motion.div>
      </div>
    </SectionLayout>
  );
};

export default About;
