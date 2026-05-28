import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Hero } from "../assets";
import { HeroTypeWritter, HomeSocialLinks, SectionLayout } from "../components";
import { Blob, Shape, NumberMark } from "../components/Decorations";
import { HeroData, Socials } from "../utils/helper";
import { fromLeft, fromRight, fadeUp, scaleIn, scrollHint } from "../utils/motionVariants";

const Home = () => {
  return (
    <SectionLayout
      id="home"
      staggerMode="fast"
      leftDecor={
        <>
          <Blob className="top-1/4 -left-20" color="teal" size={400} />
          <Blob className="bottom-10 left-1/3" color="violet" size={300} delay={2} />
        </>
      }
      rightDecor={
        <>
          <Blob className="top-10 right-0" color="coral" size={280} delay={1} />
          <NumberMark value="01" className="bottom-0 right-0" />
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="flex flex-col gap-5 items-center lg:items-start text-center lg:text-left">
          <motion.span
            variants={fadeUp}
            className="text-xs sm:text-sm tracking-[0.4em] uppercase text-accent-teal"
          >
            Hello, it's me
          </motion.span>

          <motion.h1
            variants={fromLeft}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05]"
          >
            <span className="gradient-text">{HeroData.name}</span>
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl text-text-primary mt-2"
          >
            And I'm <HeroTypeWritter words={HeroData.titles} speed={85} />
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-text-muted text-base lg:text-lg leading-relaxed max-w-xl mt-2"
          >
            {HeroData.description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-4 mt-6">
            <AnimatePresence>
              {Socials.map((item, index) => (
                <HomeSocialLinks key={item.id} data={item} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.a
            variants={fadeUp}
            href="mailto:jithanroyjony@gmail.com"
            whileHover={{ y: -2 }}
            className="mt-6 group inline-flex items-center gap-3 px-7 py-3 rounded-full bg-accent-teal text-bg-deep font-semibold tracking-wide hover:bg-accent-amber transition-colors"
          >
            Hire me
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </motion.a>
        </div>

        <motion.div
          variants={fromRight}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
            {/* pulsing halo */}
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-gradient-primary blur-3xl"
            />

            {/* slow conic-gradient rotating ring */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #00ADB5, #A78BFA, #FF6B6B, #FFB454, #00ADB5)",
                WebkitMask:
                  "radial-gradient(circle, transparent 58%, black 60%, black 64%, transparent 66%)",
                mask:
                  "radial-gradient(circle, transparent 58%, black 60%, black 64%, transparent 66%)",
              }}
            />

            {/* counter-rotating dashed outline */}
            <motion.div
              aria-hidden
              animate={{ rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-10 rounded-full border border-dashed border-accent-teal/30"
            />

            {/* floating accent shapes */}
            <motion.div
              animate={{ y: [-12, 12, -12] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 -right-2 w-8 h-8 rounded-full bg-accent-coral shadow-[0_0_24px_rgba(255,107,107,0.6)]"
            />
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [0, 45, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-4 -left-2 w-6 h-6 bg-accent-amber shadow-[0_0_20px_rgba(255,180,84,0.6)]"
            />
            <motion.div
              animate={{ y: [-8, 8, -8], x: [0, 6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 right-6 w-7 h-7 rounded-full border-2 border-accent-violet"
            />

            {/* the portrait — knocked out + retinted to palette */}
            <motion.div variants={scaleIn} className="relative">
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-bg-deep shadow-[0_0_80px_rgba(0,173,181,0.45)]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, #00ADB5 0%, #393E46 70%, #161a23 100%)",
                }}
              >
                {/* tint layer below image */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 35%, rgba(0,173,181,0.35), transparent 70%)",
                  }}
                />
                <img
                  src={Hero}
                  alt="Jithan Roy"
                  className="relative w-full h-full object-cover"
                  style={{
                    filter:
                      "saturate(0.55) contrast(1.05) hue-rotate(140deg) brightness(0.95)",
                    mixBlendMode: "luminosity",
                  }}
                />
                {/* color wash to unify with palette */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,173,181,0.18) 0%, transparent 50%, rgba(167,139,250,0.22) 100%)",
                    mixBlendMode: "color",
                  }}
                />
                {/* subtle inner vignette */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 0 0 60px rgba(22,26,35,0.7), inset 0 0 120px rgba(22,26,35,0.4)",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={scrollHint}
        initial="initial"
        animate="animate"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted text-[10px] tracking-[0.4em] uppercase"
      >
        Scroll
        <span className="block w-px h-8 bg-text-muted/60" />
      </motion.div>
    </SectionLayout>
  );
};

export default Home;
