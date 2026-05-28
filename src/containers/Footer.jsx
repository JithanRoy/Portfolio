import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Socials } from "../utils/helper";
import { HomeSocialLinks, SectionLayout } from "../components";
import { Blob, NumberMark } from "../components/Decorations";
import { fadeUp } from "../utils/motionVariants";

const MARQUEE = "LET'S BUILD SOMETHING · LET'S BUILD SOMETHING · LET'S BUILD SOMETHING · ";

const Footer = () => {
  return (
    <SectionLayout
      id="outro"
      leftDecor={<Blob className="top-1/4 -left-20" color="violet" size={400} />}
      rightDecor={
        <>
          <Blob className="bottom-10 -right-16" color="teal" size={360} delay={1.5} />
          <NumberMark value="07" className="-top-4 -right-6" />
        </>
      }
    >
      <div className="flex flex-col items-center justify-center text-center gap-8">
        <motion.span
          variants={fadeUp}
          className="text-xs tracking-[0.4em] uppercase text-accent-teal"
        >
          Thanks for visiting
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="font-display font-bold text-4xl sm:text-7xl lg:text-8xl gradient-text leading-none"
        >
          Jithan Roy
        </motion.h2>

        <motion.div variants={fadeUp} className="flex items-center gap-4">
          <AnimatePresence>
            {Socials.map((item, index) => (
              <HomeSocialLinks key={item.id} data={item} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-2 text-text-muted leading-relaxed">
          <p>jithanroyjony@gmail.com</p>
          <p>+880 1521 327 660</p>
        </motion.div>

        <motion.a
          variants={fadeUp}
          href="mailto:jithanroyjony@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-bg-deep transition-colors"
        >
          Hire me
        </motion.a>
      </div>

      <div className="absolute bottom-6 inset-x-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="flex whitespace-nowrap animate-marquee font-display text-6xl sm:text-7xl">
          <span>{MARQUEE.repeat(3)}</span>
          <span>{MARQUEE.repeat(3)}</span>
        </div>
      </div>
    </SectionLayout>
  );
};

export default Footer;
