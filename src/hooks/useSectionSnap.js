import { useEffect } from "react";

export default function useSectionSnap(containerRef, sectionIds) {
  useEffect(() => {
    const root = containerRef?.current;
    if (!root) return;

    let isAnimating = false;
    let lastTime = 0;
    const COOLDOWN = 800;

    const sectionsFitInViewport = () => {
      const els = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);
      const vh = root.clientHeight;
      return els.every((el) => el.offsetHeight <= vh + 1);
    };

    const currentIndex = () => {
      const vh = root.clientHeight;
      const scrollMid = root.scrollTop + vh / 2;
      const els = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);
      for (let i = 0; i < els.length; i++) {
        const top = els[i].offsetTop;
        const bottom = top + els[i].offsetHeight;
        if (scrollMid >= top && scrollMid < bottom) return i;
      }
      return 0;
    };

    const scrollToIndex = (idx) => {
      const target = document.getElementById(sectionIds[idx]);
      if (!target) return;
      isAnimating = true;
      root.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      setTimeout(() => {
        isAnimating = false;
      }, 700);
    };

    const onWheel = (e) => {
      if (!sectionsFitInViewport()) return;
      const now = performance.now();
      if (isAnimating || now - lastTime < COOLDOWN) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < 10) return;
      e.preventDefault();
      lastTime = now;
      const idx = currentIndex();
      const next = e.deltaY > 0 ? idx + 1 : idx - 1;
      if (next < 0 || next >= sectionIds.length) return;
      scrollToIndex(next);
    };

    const onKey = (e) => {
      if (!sectionsFitInViewport()) return;
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      const idx = currentIndex();
      let next = idx;
      if (e.key === "ArrowDown" || e.key === "PageDown") next = idx + 1;
      else if (e.key === "ArrowUp" || e.key === "PageUp") next = idx - 1;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = sectionIds.length - 1;
      if (next < 0 || next >= sectionIds.length) return;
      scrollToIndex(next);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [containerRef, sectionIds]);
}
