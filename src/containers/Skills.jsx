import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, animate } from "motion/react";
import { SectionLayout } from "../components";
import { Blob, DotGrid, NumberMark } from "../components/Decorations";
import { SkillsData } from "../utils/helper";
import { fromLeft, fadeUp } from "../utils/motionVariants";

const SkillBar = ({ skill, percentage, color, inView }) => {
  const target = parseInt(percentage, 10);
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) {
      setDisplay(0);
      mv.set(0);
      return;
    }
    const controls = animate(mv, target, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, mv]);

  return (
    <motion.div variants={fadeUp} className="w-full">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-text-primary text-sm font-medium tracking-wide">{skill}</span>
        <span className="font-display text-text-muted text-sm tabular-nums">{display}%</span>
      </div>
      <div className="h-[3px] w-full bg-white/8 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${target}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: color }}
          className="h-full rounded-full"
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const intro = SkillsData.paragraphs[SkillsData.paragraphs.length - 1];

  return (
    <SectionLayout
      id="skills"
      index={3}
      label="Skills & Experience"
      staggerMode="fast"
      leftDecor={
        <>
          <Blob className="top-1/4 -left-12" color="violet" size={340} />
          <DotGrid className="bottom-16 left-10" color="teal" />
        </>
      }
      rightDecor={<NumberMark value="03" className="-bottom-8 -right-8" />}
    >
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <motion.div
            variants={fromLeft}
            className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl leading-tight"
          >
            <span className="block gradient-text">What I do</span>
            <span className="block text-text-primary">every day.</span>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="text-text-muted text-base lg:text-lg leading-relaxed"
          >
            {intro}
          </motion.p>
        </div>

        <div className="flex flex-col gap-5">
          {SkillsData.skills.map((s) => (
            <SkillBar
              key={s.skill}
              skill={s.skill}
              percentage={s.percentage}
              color={s.color}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </SectionLayout>
  );
};

export default Skills;
