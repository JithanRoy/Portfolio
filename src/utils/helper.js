import {
  FaDiagramProject,
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaHouse,
  FaLinkedinIn,
  FaRenren,
  FaUser,
  FaYoutube,
} from "react-icons/fa6";
import { ChatApp, OpenAI } from "../assets";

import Empathika from "../assets/img/Project/Empathika.png";
import Cartup from "../assets/img/Project/cartup.png";
import NewsLetter from "../assets/img/Project/newsLetter.png";
import Tasker from "../assets/img/Project/tasker.png";

export const Socials = [
  {
    id: `facebook-${Date.now()}`,
    Icon: FaFacebookF,
    uri: "",
    color: "#1877F2",
  },
  {
    id: `linkedin-${Date.now()}`,
    Icon: FaLinkedinIn,
    uri: "https://www.linkedin.com/in/jithan-r-2b7a3323b/",
    color: "#0072b1",
  },
  {
    id: `github-${Date.now()}`,
    Icon: FaGithub,
    uri: "https://github.com/JithanRoy",
    color: "#fff",
  },
  {
    id: `youtube-${Date.now()}`,
    Icon: FaYoutube,
    uri: "",
    color: "#ff0000",
  },
];

export const Menus = [
  {
    id: `home-${Date.now()}`,
    Icon: FaHouse,
    uri: "#home",
    name: "Home",
  },
  {
    id: `about-${Date.now()}`,
    Icon: FaUser,
    uri: "#about",
    name: "About",
  },
  {
    id: `skills-${Date.now()}`,
    Icon: FaRenren,
    uri: "#skills",
    name: "Skills",
  },
  {
    id: `projects-${Date.now()}`,
    Icon: FaDiagramProject,
    uri: "#projects",
    name: "Projects",
  },
  {
    id: `contact-${Date.now()}`,
    Icon: FaEnvelope,
    uri: "#contact",
    name: "Contact",
  },
];

export const ProjectsData = [
  {
    id: `cartup-${Date.now()}`,
    name: "Cartup",
    imgSrc: Cartup,
    gitURL: "https://cartup.com/",
  },
  {
    id: `codepen-${Date.now()}`,
    name: "Empathika",
    imgSrc: Empathika,
    gitURL: "https://empathika.com/",
  },
  {
    id: `openai-${Date.now()}`,
    name: "Imaginify",
    imgSrc: OpenAI,
    gitURL: "https://github.com/JithanRoy/Imaginify",
  },
  {
    id: `chatapp-${Date.now()}`,
    name: "Chat App Build",
    imgSrc: ChatApp,
    gitURL: "https://github.com/Vetrivel-VP",
  },
  {
    id: `newsLatter-${Date.now()}`,
    name: "Newsletter Signup UI",
    imgSrc: NewsLetter,
    gitURL: "https://github.com/JithanRoy/NewsLetter-UI-Build",
  },
  {
    id: `pixabayclone-${Date.now()}`,
    name: "Tasker",
    imgSrc: Tasker,
    gitURL: "https://tasker-app-jithan.netlify.app/",
  },
  // {
  //   id: `freshjuiceui-${Date.now()}`,
  //   name: "Fresh Juice UI Build",
  //   imgSrc: FreshJuiceUI,
  //   gitURL: "https://github.com/Vetrivel-VP",
  // },
  // {
  //   id: `socialmedia-${Date.now()}`,
  //   name: "Social Media App",
  //   imgSrc: SocialMedia,
  //   gitURL: "https://github.com/Vetrivel-VP",
  // },
  // {
  //   id: `portfoliofirebase-${Date.now()}`,
  //   name: "Portfolio UI Fireabse",
  //   imgSrc: PortfolioFirebase,
  //   gitURL: "https://github.com/Vetrivel-VP",
  // },
];

export const HeroData = {
  name: "Jithan Roy",
  titles: [
    "a Software Engineer..",
    "a Team Lead..",
    "a Full-stack Developer..",
  ],
  description:
    "I am a Full-Stack Software Engineer with over 4 years of experience building and shipping scalable web applications. While I have a strong foundation in frontend engineering with React and Next.js, I currently specialize in backend development using Node.js, Golang, and PostgreSQL. I am passionate about architecting reliable, high-performance systems—from optimizing database queries to containerizing services with Docker. Let’s build something robust and amazing together!",
};

export const AboutData = {
  paragraphs: [
    "I am a Full-Stack Software Engineer with over 4 years of experience dedicated to building and shipping scalable web applications. My professional journey is rooted in a B.Sc. in Computer Science from East West University [cite: 37, 38], where I built the technical foundation that has allowed me to thrive in roles ranging from Junior Software Engineer to my current position as a Software Engineer[cite: 9, 26, 44].",
    "While I have a deep background in frontend engineering—leveraging React, Next.js, and TypeScript to create high-performance, responsive interfaces [cite: 5, 33]—I now specialize in backend development and database engineering[cite: 5]. I have a proven track record of architecting RESTful APIs and optimizing PostgreSQL schemas, successfully improving query performance by up to 40% and significantly reducing page load times through advanced code splitting.",
    "Beyond my core stack, I am a proactive developer currently deepening my expertise in Golang and containerization with Docker to build more reliable, distributed systems[cite: 5, 6, 34]. Whether I am collaborating with product teams to translate complex requirements into technical solutions or mentoring junior developers in full-stack fundamentals, I am committed to clean code and exceptional system performance[cite: 15, 64].",
  ],
};

export const SkillsData = {
  paragraphs: [
    ...AboutData.paragraphs,
    "My passion for problem-solving and dedication to clean code is evident in my project work, where I consistently deliver scalable and effective solutions[cite: 7, 50]. I am a driven individual with a proven track record in full-stack engineering, ready to contribute my expertise in high-performance backend systems and modern frontend frameworks to any team[cite: 4, 15].",
  ],
  skills: [
    {
      skill: "JavaScript/TypeScript",
      percentage: "90%",
      color: "#10B981",
      move: true,
    }, // [cite: 33]
    { skill: "React/Next.js", percentage: "85%", color: "#EAB308", move: true }, // [cite: 13, 33]
    {
      skill: "Node.js/Express",
      percentage: "80%",
      color: "#84CC16",
      move: true,
    }, // [cite: 12, 34]
    { skill: "Golang", percentage: "75%", color: "#00ADD8", move: true }, // [cite: 34, 49]
    {
      skill: "PostgreSQL/SQL",
      percentage: "80%",
      color: "#336791",
      move: false,
    }, // [cite: 14, 35]
    { skill: "Docker", percentage: "70%", color: "#2496ED", move: true }, // [cite: 16, 51]
    { skill: "Tailwind CSS", percentage: "90%", color: "#3B82F6", move: false }, // [cite: 33, 48]
  ],
};
