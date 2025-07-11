"use client";

import { useEffect, useState, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface UseHeroVisibilityProps {
  heroRef: RefObject<HTMLDivElement | null>;
}

export const useHeroVisibility = ({ heroRef }: UseHeroVisibilityProps) => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroElement = heroRef.current;
    let scrollTrigger: ScrollTrigger | null = null;

    if (heroElement) {
      // Create ScrollTrigger to track when hero section exits viewport
      scrollTrigger = ScrollTrigger.create({
        trigger: heroElement,
        start: "bottom top", // When bottom of hero reaches top of viewport
        end: "bottom top",
        onEnter: () => setIsHeroVisible(false), // Hero has exited viewport
        onLeave: () => setIsHeroVisible(false), // Hero has exited viewport
        onEnterBack: () => setIsHeroVisible(true), // Hero is back in viewport
        onLeaveBack: () => setIsHeroVisible(true), // Hero is back in viewport
      });
    }

    return () => {
      // Kill the specific ScrollTrigger created by this hook
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, [heroRef]);

  return isHeroVisible;
};
