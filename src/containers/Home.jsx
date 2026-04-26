import { AnimatePresence, motion } from "framer-motion";
import { Hero } from "../assets";
import { HeroTypeWritter, HomeSocialLinks } from "../components";
import { HeroData, Socials } from "../utils/helper";

const Home = () => {
  return (
    <section
      id="home"
      className="flex items-center justify-center flex-col gap-12 relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {/* content section */}
        <div className="w-full h-full flex flex-col items-center lg:items-start justify-center gap-4">
          <h2 className="text-3xl lg:text-4xl text-texlight">
            Hello, It's me
            <span className="block tracking-wider text-4xl lg:text-6xl mt-4 text-white">
              {" "}
              {HeroData.name}
            </span>
          </h2>

          {/* typewritter */}
          <h2 className="text-2xl lg:text-4xl text-texlight mt-4">
            And I'm <HeroTypeWritter words={HeroData.titles} speed={100} />
          </h2>

          <p className="text-lg lg:text-xl text-gray-100 mt-6 text-center lg:text-left leading-relaxed font-light">
            {HeroData.description}
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-16 mt-16">
            <AnimatePresence>
              {Socials &&
                Socials.map((item, index) => (
                  <HomeSocialLinks key={index} data={item} index={index} />
                ))}
            </AnimatePresence>
          </div>
          {/* Hire me  */}
          <a
            href="mailto:jithanroyjony@gmail.com"
            style={{ boxShadow: "inset 0px 0px 10px rgba(255, 255, 255, 0.3)" }}
            className="mt-12 border border-[rgba(255,255,255,0.3)] rounded-xl px-8 py-3 active:95 group hover:border-primary"
          >
            <p className="text-texlight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary">
              Hire me
            </p>
          </a>
        </div>

        {/* hero image */}
        <div className="w-full h-full flex items-start justify-center lg:items-center mt-12 lg:mt-0">
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <motion.img
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              }}
              src={Hero}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-[0_0_40px_rgba(0,255,170,0.4)] border-[8px] border-primary/30 relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
