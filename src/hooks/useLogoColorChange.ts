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
    const scrollTriggers: ScrollTrigger[] = [];

    if (logoElement) {
      let activeCount = 0;

      const updateState = (entering: boolean) => {
        activeCount += entering ? 1 : -1;
        setShouldUseWhiteLogo(activeCount > 0);
      };

      // Dark background sections that need white menu
      const darkSections = ["nos-solutions", "skills-section"];

      darkSections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: "top 60px",
              end: "bottom 60px",
              onEnter: () => updateState(true),
              onLeave: () => updateState(false),
              onEnterBack: () => updateState(true),
              onLeaveBack: () => updateState(false),
            })
          );
        }
      });
    }

    return () => {
      scrollTriggers.forEach((trigger) => trigger.kill());
    };
  }, [logoRef]);

  return shouldUseWhiteLogo;
};
