"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface UseFooterIntersectionProps {
  logoRef: RefObject<HTMLDivElement | null>;
  contactRef?: RefObject<HTMLDivElement | null>;
  footerRef: RefObject<HTMLDivElement | null>;
}

export const useFooterIntersection = ({
  logoRef,
  contactRef,
  footerRef,
}: UseFooterIntersectionProps) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const logoElement = logoRef.current;
    const contactElement = contactRef?.current;
    const footerElement = footerRef.current;

    if (footerElement) {
      // Create a function to check intersection between elements and footer
      const checkIntersection = () => {
        const footerRect = footerElement.getBoundingClientRect();

        // Check if the logo is intersecting with the footer
        if (logoElement) {
          const logoRect = logoElement.getBoundingClientRect();
          const isLogoIntersectingFooter = !(
            logoRect.bottom < footerRect.top - 30 ||
            logoRect.top > footerRect.bottom + 30 ||
            logoRect.right < footerRect.left ||
            logoRect.left > footerRect.right
          );

          // Apply color change based on intersection
          gsap.to(logoElement, {
            color: isLogoIntersectingFooter
              ? "var(--background-color)"
              : "var(--foreground-color)",
            duration: 0.3,
          });
        }

        // Check if the contact button is intersecting with the footer
        if (contactElement) {
          const contactRect = contactElement.getBoundingClientRect();
          const isContactIntersectingFooter = !(
            contactRect.bottom < footerRect.top - 30 ||
            contactRect.top > footerRect.bottom + 30 ||
            contactRect.right < footerRect.left ||
            contactRect.left > footerRect.right
          );

          // Apply color change based on intersection
          gsap.to(contactElement, {
            color: isContactIntersectingFooter
              ? "var(--background-color)"
              : "var(--foreground-color)",
            duration: 0.3,
          });
        }
      };

      // Create ScrollTrigger for the footer
      ScrollTrigger.create({
        trigger: footerElement,
        start: "top-=30 bottom", // Start checking 30px before footer enters viewport
        end: "bottom bottom", // End checking when bottom of footer leaves viewport
        onUpdate: checkIntersection, // Check intersection on every scroll update
      });

      // Initial check
      checkIntersection();
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [logoRef, contactRef, footerRef]);
};
