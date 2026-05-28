import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function useLenis(wrapperRef) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
    if (isTouch) return;

    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: wrapperRef.current.firstElementChild || wrapperRef.current,
      duration: 1.1,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [wrapperRef]);

  return lenisRef;
}
