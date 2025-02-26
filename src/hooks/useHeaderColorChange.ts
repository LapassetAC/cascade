"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface UseHeaderColorChangeProps {
  logoRef: RefObject<HTMLDivElement | null>;
  contactRef?: RefObject<HTMLDivElement | null>;
  skillsSectionRef: RefObject<HTMLDivElement | null>;
}

export const useHeaderColorChange = ({
  logoRef,
  contactRef,
  skillsSectionRef,
}: UseHeaderColorChangeProps) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const logoElement = logoRef.current;
    const contactElement = contactRef?.current;
    const skillsSectionElement = skillsSectionRef.current;

    if (skillsSectionElement) {
      // Create a function to check intersection between elements and skills section
      const checkIntersection = () => {
        const skillsSectionRect = skillsSectionElement.getBoundingClientRect();

        // Check if the logo is intersecting with the skills section
        if (logoElement) {
          const logoRect = logoElement.getBoundingClientRect();
          const isLogoIntersectingSkills = !(
            logoRect.bottom < skillsSectionRect.top ||
            logoRect.top > skillsSectionRect.bottom ||
            logoRect.right < skillsSectionRect.left ||
            logoRect.left > skillsSectionRect.right
          );

          // Apply color change based on intersection
          gsap.to(logoElement, {
            color: isLogoIntersectingSkills
              ? "var(--background-color)"
              : "var(--foreground-color)",
            duration: 0.3,
          });
        }

        // Check if the contact button is intersecting with the skills section
        if (contactElement) {
          const contactRect = contactElement.getBoundingClientRect();
          const isContactIntersectingSkills = !(
            contactRect.bottom < skillsSectionRect.top ||
            contactRect.top > skillsSectionRect.bottom ||
            contactRect.right < skillsSectionRect.left ||
            contactRect.left > skillsSectionRect.right
          );

          // Apply color change based on intersection
          gsap.to(contactElement, {
            color: isContactIntersectingSkills
              ? "var(--background-color)"
              : "var(--foreground-color)",
            duration: 0.3,
          });
        }
      };

      // Create ScrollTrigger that updates on scroll
      ScrollTrigger.create({
        trigger: skillsSectionElement,
        start: "top bottom", // Start checking when trigger enters viewport
        end: "bottom top", // End checking when trigger leaves viewport
        onUpdate: checkIntersection, // Check intersection on every scroll update
      });

      // Initial check
      checkIntersection();
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [logoRef, contactRef, skillsSectionRef]);
};
