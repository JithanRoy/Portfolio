import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "motion/react";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import { SectionLayout } from "../components";
import { Blob, NumberMark, Shape } from "../components/Decorations";
import Alert from "./Alert";
import { fromLeft, fromRight, fadeUp } from "../utils/motionVariants";

const initialData = { firstName: "", lastName: "", email: "", message: "" };

const Contact = () => {
  const [data, setData] = useState(initialData);
  const [alert, setAlert] = useState({ isAlert: false, message: "", status: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const dismissLater = () => {
    setTimeout(
      () => setAlert({ isAlert: false, message: "", status: null }),
      4000
    );
  };

  const sendMessage = () => {
    if (data.email === "" || data.message === "") {
      setAlert({ isAlert: true, message: "Required fields cannot be empty", status: "warning" });
      dismissLater();
      return;
    }
    setAlert({ isAlert: true, message: "Sending message...", status: "success" });

    const templateParams = {
      from_name: `${data.firstName} ${data.lastName}`,
      to_name: "Jithan Roy",
      reply_to: data.email,
      message: data.message,
    };

    emailjs
      .send("service_le7sg66", "template_nits4h8", templateParams, "kWAi9UQGxYN0veZ_H")
      .then(
        () => {
          setData(initialData);
          setAlert({ isAlert: true, message: "Thanks for submitting your request!", status: "success" });
          dismissLater();
        },
        () => {
          setAlert({ isAlert: true, message: "Failed to send message, please try again later", status: "warning" });
          dismissLater();
        }
      );
  };

  return (
    <SectionLayout
      id="contact"
      index={5}
      label="Let's Talk"
      staggerMode="fast"
      leftDecor={<Blob className="top-1/4 -left-12" color="teal" size={340} />}
      rightDecor={
        <>
          <Blob className="bottom-0 -right-16" color="coral" size={320} delay={1} />
          <Shape variant="ring" color="amber" size={80} className="top-16 right-16" />
          <NumberMark value="05" className="-bottom-10 -right-6" />
        </>
      }
    >
      <AnimatePresence>
        {alert.isAlert && <Alert status={alert.status} message={alert.message} />}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <motion.h2
            variants={fromLeft}
            className="font-display font-bold text-4xl sm:text-5xl leading-tight"
          >
            <span className="block text-text-primary">Let's build</span>
            <span className="block gradient-text">something good.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-muted text-base lg:text-lg">
            Have an idea, a role, or just want to chat? Drop a message — I usually reply within a day.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-4 mt-2">
            <a
              href="mailto:jithanroyjony@gmail.com"
              className="flex items-center gap-4 text-text-muted hover:text-accent-teal transition-colors"
            >
              <span className="w-10 h-10 rounded-full bg-bg-elevated border border-white/10 flex items-center justify-center">
                <FaEnvelope className="text-accent-teal" />
              </span>
              jithanroyjony@gmail.com
            </a>
            <a
              href="tel:+8801521327660"
              className="flex items-center gap-4 text-text-muted hover:text-accent-teal transition-colors"
            >
              <span className="w-10 h-10 rounded-full bg-bg-elevated border border-white/10 flex items-center justify-center">
                <FaPhone className="text-accent-teal" />
              </span>
              +880 1521 327 660
            </a>
            <div className="flex items-center gap-4 text-text-muted">
              <span className="w-10 h-10 rounded-full bg-bg-elevated border border-white/10 flex items-center justify-center">
                <FaLocationDot className="text-accent-teal" />
              </span>
              Dhaka, Bangladesh
            </div>
          </motion.div>
        </div>

        <motion.div variants={fromRight} className="w-full">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-primary opacity-20 rounded-2xl blur-2xl" />
            <div className="relative bg-bg-surface/80 backdrop-blur border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={data.firstName}
                  onChange={handleChange}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/15 focus:border-accent-teal outline-none text-text-primary placeholder:text-text-muted/60 transition-colors"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={data.lastName}
                  onChange={handleChange}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/15 focus:border-accent-teal outline-none text-text-primary placeholder:text-text-muted/60 transition-colors"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={data.email}
                onChange={handleChange}
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/15 focus:border-accent-teal outline-none text-text-primary placeholder:text-text-muted/60 transition-colors"
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Tell me about it *"
                value={data.message}
                onChange={handleChange}
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/15 focus:border-accent-teal outline-none text-text-primary placeholder:text-text-muted/60 resize-none transition-colors"
              />
              <motion.button
                onClick={sendMessage}
                whileHover={{ y: -2 }}
                className="self-end mt-2 inline-flex items-center gap-3 px-7 py-3 rounded-full bg-accent-teal text-bg-deep font-semibold hover:bg-accent-amber transition-colors"
              >
                Send message
                <span>→</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionLayout>
  );
};

export default Contact;
