import { useEffect, useState } from "react";

const MIN_DURATION = 1500;

export default function useLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    let rafId;
    let ready = false;

    const tick = (now) => {
      const elapsed = now - startedAt;
      const ratio = Math.min(elapsed / MIN_DURATION, 1);
      const target = ready ? 100 : Math.min(ratio * 90, 90);
      setProgress((prev) => prev + (target - prev) * 0.15);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const finish = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(MIN_DURATION - elapsed, 0);
      setTimeout(() => {
        ready = true;
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => setIsLoading(false), 800);
        }, 200);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", finish);
    };
  }, []);

  return { progress: Math.round(progress), isLoading };
}
