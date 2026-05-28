import React, { useState } from "react";
import { motion } from "motion/react";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { SectionLayout } from "../components";
import { Blob, Shape, DotGrid, NumberMark } from "../components/Decorations";
import { ProjectsData } from "../utils/helper";
import { fadeUp, fromLeft } from "../utils/motionVariants";

const ProjectCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      variants={fadeUp}
      href={project.gitURL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="group relative block rounded-2xl overflow-hidden bg-bg-elevated border border-white/5 aspect-[4/3]"
    >
      <motion.img
        src={project.imgSrc}
        alt={project.name}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <motion.div
        initial={false}
        animate={{ y: hovered ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-deep/95 via-bg-deep/80 to-transparent p-5 flex items-end justify-between"
      >
        <span className="text-accent-teal font-medium tracking-wide">{project.name}</span>
        <span className="flex items-center gap-2 text-text-primary">
          {project.gitURL?.includes("github") ? <FaGithub /> : <FaArrowUpRightFromSquare />}
        </span>
      </motion.div>
    </motion.a>
  );
};

const Projects = () => {
  return (
    <SectionLayout
      id="projects"
      index={4}
      label="Selected Work"
      staggerMode="fast"
      leftDecor={<DotGrid className="bottom-10 left-10" color="amber" />}
      rightDecor={
        <>
          <Shape variant="arc" color="coral" size={160} className="top-12 right-12" spin={false} />
          <Blob className="bottom-0 -right-12" color="teal" size={280} delay={1} />
          <NumberMark value="04" className="-top-6 -right-6" />
        </>
      }
    >
      <div className="mb-10">
        <motion.h2
          variants={fromLeft}
          className="font-display font-bold text-4xl sm:text-5xl leading-tight"
        >
          <span className="text-text-primary">Selected</span>{" "}
          <span className="gradient-text">work.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-text-muted mt-3 max-w-xl">
          A few things I've built recently — across frontend, backend, and full-stack.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ProjectsData.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </SectionLayout>
  );
};

export default Projects;
