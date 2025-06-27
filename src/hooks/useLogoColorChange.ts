"use client";

import { useEffect, useState, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface UseLogoColorChangeProps {
  logoRef: RefObject<HTMLDivElement | null>;
}

export const useLogoColorChange = ({ logoRef }: UseLogoColorChangeProps) => {
  const [shouldUseWhiteLogo, setShouldUseWhiteLogo] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const logoElement = logoRef.current;
    let scrollTrigger: ScrollTrigger | null = null;

    if (logoElement) {
      // Find the Skills section element
      const skillsSection = document.querySelector(
        "section[class*=\"bg-[url('/imgs/blue-noise.jpg')]\"]"
      );

      if (skillsSection) {
        // Create ScrollTrigger to track when logo overlaps with Skills section
        scrollTrigger = ScrollTrigger.create({
          trigger: skillsSection,
          start: "top 60px", // When skills section reaches the logo area (accounting for top-8 positioning)
          end: "bottom 60px", // When skills section bottom passes the logo area
          onEnter: () => setShouldUseWhiteLogo(true), // Logo is over blue background
          onLeave: () => setShouldUseWhiteLogo(false), // Logo is past blue background
          onEnterBack: () => setShouldUseWhiteLogo(true), // Logo is back over blue background
          onLeaveBack: () => setShouldUseWhiteLogo(false), // Logo is before blue background
        });
      }
    }

    return () => {
      // Kill the specific ScrollTrigger created by this hook
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, [logoRef]);

  return shouldUseWhiteLogo;
};
