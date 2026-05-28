import React, { useEffect, useState } from "react";

const HeroTypeWritter = ({ words, speed = 90 }) => {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const word = words[wordIdx];

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i <= word.length) {
        setText(word.slice(0, i));
        i++;
      } else {
        clearInterval(id);
        setTimeout(() => {
          setWordIdx((p) => (p === words.length - 1 ? 0 : p + 1));
        }, 1200);
      }
    }, speed);
    return () => clearInterval(id);
  }, [word, speed, words]);

  return (
    <span className="gradient-text font-medium">
      {text}
      <span className="inline-block w-[2px] h-[1em] align-middle bg-accent-teal animate-pulse ml-1" />
    </span>
  );
};

export default HeroTypeWritter;
