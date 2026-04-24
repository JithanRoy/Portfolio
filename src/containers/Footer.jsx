import React from "react";
import { AnimatePresence } from "framer-motion";
import { Socials } from "../utils/helper";
import { HomeSocialLinks } from "../components";

const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-start mt-32 mb-12">
        <p className="text-3xl tracking-wide text-texlight">
          Jithan Roy
        </p>
        <div className="flex items-center justify-center gap-16 mt-16">
            <AnimatePresence>
              {Socials && Socials.map((item, index) => (
                  <HomeSocialLinks key={index} data={item} index={index} />
              ))}
            </AnimatePresence>
        </div>

        <div className="w-full flex flex-col items-center justify-center mt-12 leading-loose">
            <p className="text-texlight text-center">
                Thanks for visiting my profile!
            </p>
            <p className="text-texlight text-center">
                Jithanroyjony@gmail.com
            </p>
            <p className="text-texlight text-center">+880 1521327660</p>
            <a href="mailto:jithanroyjony@gmail.com">
                <p className="text-primary text-center">Hire Me</p>
            </a>
        </div>
    </div>
  );
};

export default Footer;
