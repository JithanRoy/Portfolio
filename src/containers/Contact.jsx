import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Leaf1, Leaf2 } from "../assets";
// import { db } from "../config/firebase.config"
// import { addDoc, collection } from "firebase/firestore";
import Alert from "./Alert";

const Contact = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [alert, setAlert] = useState({
    isAlert: false,
    message: "",
    status: null,
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    //update the state for the corresponding input values
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendMessage = async () => {
    if (data.email === "" || data.message === "") {
      // throw an alert
      setAlert({
        isAlert: true,
        message: "Required fields cannot be empty",
        status: "warning",
      });
      let alertInterval = setInterval(() => {
        setAlert({
          isAlert: false,
          message: "",
          status: null,
        });
        clearInterval(alertInterval);
      }, 4000);
    } else {
      setAlert({
        isAlert: true,
        message: "Sending message...",
        status: "success",
      });

      const templateParams = {
        from_name: `${data.firstName} ${data.lastName}`,
        to_name: "Jithan Roy",
        reply_to: data.email,
        message: data.message,
      };

      emailjs
        .send(
          "service_le7sg66",
          "template_nits4h8",
          templateParams,
          "kWAi9UQGxYN0veZ_H",
        )
        .then(
          (response) => {
            setData({ firstName: "", lastName: "", email: "", message: "" });
            setAlert({
              isAlert: true,
              message: "Thanks for submitting your request!",
              status: "success",
            });
            setTimeout(() => {
              setAlert({
                isAlert: false,
                message: "",
                status: null,
              });
            }, 4000);
          },
          (err) => {
            setAlert({
              isAlert: true,
              message: "Failed to send message, please try again later",
              status: "warning",
            });
            setTimeout(() => {
              setAlert({
                isAlert: false,
                message: "",
                status: null,
              });
            }, 4000);
          },
        );
    }
  };

  return (
    <section
      id="contact"
      className="flex items-center justify-center flex-col gap-12 my-12"
    >
      {/* Toast alert notification */}
      <AnimatePresence>
        {alert.isAlert && (
          <Alert status={alert.status} message={alert.message} />
        )}
      </AnimatePresence>

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
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary capitalize text-xl font-serif tracking-widest whitespace-nowrap">
            Contact Me
          </p>
          <img src={Leaf2} className="w-6 h-auto object-contain" alt="leaf" />
        </motion.div>
      </div>

      {/* main content  */}
      <div className="w-full flex flex-col items-center justify-start gap-4">
        <div className="w-full lg:w-[600px] p-2 flex flex-col items-center justify-start gap-4">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={data.firstName}
              onChange={handleTextChange}
              className="w-full px-4 py-3 rounded-md border border-[rgba(255,255,255,0.3)] bg-transparent focus:border-primary outline-none text-white"
            />

            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={data.lastName}
              onChange={handleTextChange}
              className="w-full px-4 py-3 rounded-md border border-[rgba(255,255,255,0.3)] bg-transparent focus:border-primary outline-none text-white"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleTextChange}
            className="w-full px-4 py-3 rounded-md border border-[rgba(255,255,255,0.3)] bg-transparent focus:border-primary outline-none text-white"
          ></input>

          <textarea
            name="message"
            id=""
            rows="10"
            value={data.message}
            onChange={handleTextChange}
            className="w-full px-4 py-3 rounded-md border border-[rgba(255,255,255,0.3)] bg-transparent focus:border-primary outline-none text-white"
            placeholder="Message here..."
          ></textarea>

          <div className="w-full flex items-center justify-center lg:justify-end">
            <button
              className="px-12 py-3 bg-gradient-to-br from-primary to-secondary rounded-md w-full lg:w-auto text-bgPrimary font-semibold hover:bg-gradient-to-br hover:from-black hover:to-black hover:border hover:border-primary hover:text-primary"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
