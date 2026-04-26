import { motion } from "framer-motion";
import { Leaf1, Leaf2 } from "../assets";
import { SkillCard } from "../components";
import { SkillsData } from "../utils/helper";

const Skills = () => {
  return (
    <section
      id="skills"
      className="flex items-center justify-center flex-col gap-12 my-12"
    >
      {/* title  */}
      <div className="w-full flex items-center justify-center py-24">
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 200 }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-5"
        >
          <img src={Leaf1} className="w-6 h-auto object-contain" alt="leaf" />
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary capitalize text-xl font-serif tracking-widest">
            skills
          </p>
          <img src={Leaf2} className="w-6 h-auto object-contain" alt="leaf" />
        </motion.div>
      </div>

      {/* main content  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {/* text content  */}
        <div className="w-full px-8 flex flex-col gap-6 items-start justify-start">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary capitalize text-xl lg:text-2xl font-serif tracking-widest font-semibold mb-2">
            My Skills & work Experience
          </p>
          {SkillsData.paragraphs.map((paragraph, index) => (
            <p
              key={`skill-para-${index}`}
              className="text-gray-300 text-lg lg:text-xl font-light tracking-wide leading-relaxed text-left"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* image section  */}
        <div className="w-full flex flex-col gap-4 items-center justify-center px-4 md:px-8">
          {SkillsData.skills.map((skillItem, index) => (
            <SkillCard
              key={`skill-card-${index}`}
              skill={skillItem.skill}
              percentage={skillItem.percentage}
              color={skillItem.color}
              move={skillItem.move}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
