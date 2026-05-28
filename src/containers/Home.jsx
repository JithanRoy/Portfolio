import { AnimatePresence, motion } from "motion/react";
import { FiDownload } from "react-icons/fi";
import {
  SiDocker,
  SiGo,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Hero } from "../assets";
import { HeroTypeWritter, HomeSocialLinks, SectionLayout } from "../components";
import { Blob, NumberMark } from "../components/Decorations";
import { HeroData, Socials } from "../utils/helper";
import {
  fadeUp,
  fromLeft,
  fromRight,
  scaleIn,
  scrollHint,
} from "../utils/motionVariants";

const TECH_STACK = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Golang", Icon: SiGo, color: "#00ADD8" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
];

const TechOrbit = () => {
  return (
    <motion.div
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0"
      style={{ pointerEvents: "none" }}
    >
      {TECH_STACK.map(({ name, Icon, color }, i) => {
        const angle = (i / TECH_STACK.length) * 360;
        return (
          <div
            key={name}
            className="absolute top-1/2 left-1/2"
            style={{
              width: 0,
              height: 0,
              transform: `rotate(${angle}deg) translateY(calc(-1 * var(--orbit-radius)))`,
            }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              whileHover={{ scale: 1.2 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-bg-surface/90 backdrop-blur border border-white/15 flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-accent-teal/70 transition-colors cursor-default group"
              style={{ pointerEvents: "auto" }}
            >
              <Icon className="text-xl sm:text-2xl" style={{ color }} />
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] tracking-widest uppercase text-text-primary bg-bg-deep/95 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {name}
              </span>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
};

const Home = () => {
  return (
    <SectionLayout
      id="home"
      staggerMode="fast"
      leftDecor={
        <>
          <Blob className="top-1/4 -left-20" color="teal" size={400} />
          <Blob
            className="bottom-10 left-1/3"
            color="violet"
            size={300}
            delay={2}
          />
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

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 mt-6"
          >
            <AnimatePresence>
              {Socials.map((item, index) => (
                <HomeSocialLinks key={item.id} data={item} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <motion.a
              href="mailto:jithanroyjony@gmail.com"
              whileHover={{ y: -2 }}
              className="group inline-flex items-center gap-3 px-7 py-3 rounded-full bg-accent-teal text-bg-deep font-semibold tracking-wide hover:bg-accent-amber transition-colors"
            >
              Hire me
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </motion.a>

            <motion.a
              href={`${process.env.PUBLIC_URL}/Jithan_Roy.pdf`}
              download="Jithan_Roy_CV.pdf"
              whileHover={{ y: -2 }}
              className="group inline-flex items-center gap-3 px-7 py-3 rounded-full border border-white/20 text-text-primary font-semibold tracking-wide hover:border-accent-teal hover:text-accent-teal transition-colors"
            >
              Download CV
              <FiDownload className="text-base transition-transform group-hover:translate-y-0.5" />
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          variants={fromRight}
          className="relative flex items-center justify-center"
        >
          <div className="hero-orbit relative w-[22rem] h-[22rem] sm:w-[26rem] sm:h-[26rem] lg:w-[30rem] lg:h-[30rem] flex items-center justify-center">
            {/* soft teal halo behind */}
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-accent-teal blur-3xl"
            />

            {/* rotating conic-gradient rim */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #00ADB5, #A78BFA, transparent 35%, transparent 65%, #00ADB5)",
                WebkitMask:
                  "radial-gradient(circle, transparent 60%, black 62%, black 66%, transparent 68%)",
                mask: "radial-gradient(circle, transparent 60%, black 62%, black 66%, transparent 68%)",
              }}
            />

            {/* dashed orbit path (icons sit on this ring) */}
            <motion.div
              aria-hidden
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-accent-teal/20"
            />

            {/* orbiting tech logos */}
            <TechOrbit />

            {/* orbiting accent shapes (around the portrait, not on it) */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1 -right-1 w-6 h-6 rounded-full bg-accent-coral shadow-[0_0_22px_rgba(255,107,107,0.55)]"
            />
            <motion.div
              animate={{ y: [8, -8, 8], rotate: [0, 45, 0] }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-3 -left-1 w-5 h-5 bg-accent-amber shadow-[0_0_18px_rgba(255,180,84,0.55)]"
            />
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-1 right-8 w-6 h-6 rounded-full border-2 border-accent-violet"
            />

            {/* the portrait — natural colors, just framed */}
            <motion.div variants={scaleIn} className="relative">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-[3px] border-bg-deep ring-1 ring-accent-teal/30 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_60px_rgba(0,173,181,0.25)]"
              >
                <img
                  src={Hero}
                  alt="Jithan Roy"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 30%" }}
                />
                {/* edge vignette only — fades the busy background edges into the page */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-full"
                  style={{
                    boxShadow:
                      "inset 0 0 50px rgba(22,26,35,0.55), inset 0 0 12px rgba(22,26,35,0.4)",
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
