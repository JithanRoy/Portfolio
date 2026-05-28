import React, { useState } from "react";
import { motion } from "motion/react";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { SectionLayout } from "../components";
import { Blob, Shape, DotGrid, NumberMark } from "../components/Decorations";
import { ProjectsData } from "../utils/helper";
import { fadeUp, fromLeft } from "../utils/motionVariants";

const ProjectCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  const isGithub = project.gitURL?.includes("github");

  return (
    <motion.a
      variants={fadeUp}
      href={project.gitURL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-bg-elevated/60 border border-white/5 hover:border-accent-teal/40 transition-colors"
    >
      {/* image area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-deep">
        <motion.img
          src={project.imgSrc}
          alt={project.name}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* subtle gradient overlay on image */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-bg-deep/70 via-bg-deep/10 to-transparent pointer-events-none"
        />
        {/* hover external link chip */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -8 }}
          transition={{ duration: 0.25 }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-bg-deep/90 backdrop-blur flex items-center justify-center border border-white/10"
        >
          {isGithub ? (
            <FaGithub className="text-accent-teal text-sm" />
          ) : (
            <FaArrowUpRightFromSquare className="text-accent-teal text-xs" />
          )}
        </motion.div>
      </div>

      {/* footer strip (always visible) */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-bg-surface/60">
        <span className="text-text-primary text-sm font-medium tracking-wide truncate">
          {project.name}
        </span>
        <motion.span
          animate={{ x: hovered ? 3 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-accent-teal text-xs flex-shrink-0"
        >
          →
        </motion.span>
      </div>

      {/* animated gradient border on hover */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,173,181,0.4), transparent 40%, transparent 60%, rgba(167,139,250,0.4))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />
    </motion.a>
  );
};

const Projects = () => {
  return (
    <SectionLayout
      id="projects"
      index={5}
      label="Selected Work"
      staggerMode="fast"
      leftDecor={<DotGrid className="bottom-10 left-10" color="amber" />}
      rightDecor={
        <>
          <Shape variant="arc" color="coral" size={140} className="top-12 right-12" spin={false} />
          <Blob className="bottom-0 -right-12" color="teal" size={260} delay={1} />
          <NumberMark value="05" className="-top-6 -right-6" />
        </>
      }
    >
      <div className="mb-6 lg:mb-8">
        <motion.h2
          variants={fromLeft}
          className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight"
        >
          <span className="text-text-primary">Selected</span>{" "}
          <span className="gradient-text">work.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-text-muted text-sm lg:text-base mt-2 max-w-xl">
          A few things I've built recently — across frontend, backend, and full-stack.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {ProjectsData.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </SectionLayout>
  );
};

export default Projects;
