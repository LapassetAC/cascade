import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Only register plugin on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGsapAnimation = () => {
  const elementRef = useRef<HTMLLIElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Ensure we're on client side and component is mounted
    if (typeof window === "undefined" || !isMounted) return;

    const element = elementRef.current;
    if (!element) return;

    // More robust initialization with retry mechanism
    let retryCount = 0;
    const maxRetries = 20;

    const initAnimation = () => {
      const title = element.querySelector(".skill-title");
      const items = element.querySelectorAll(".skill-item");

      if (!title || items.length === 0) {
        retryCount++;
        if (retryCount < maxRetries) {
          // Use both setTimeout and requestAnimationFrame for better reliability
          setTimeout(() => requestAnimationFrame(initAnimation), 50);
          return;
        } else {
          console.warn(
            "GSAP animation: Elements not found after",
            maxRetries,
            "retries"
          );
          return;
        }
      }

      // Clean up existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Convert NodeList to Array for better handling
      const allItems = Array.from(items);

      // Set initial state with immediate application
      gsap.set(title, { opacity: 0, y: -30 });
      gsap.set(allItems, { opacity: 0, y: -30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          refreshPriority: -1,
          onRefresh: () => {
            // Re-set initial state on refresh
            gsap.set(title, { opacity: 0, y: -30 });
            gsap.set(allItems, { opacity: 0, y: -30 });
          },
          onToggle: (self) => {
            // Force restart animation when coming into view
            if (self.isActive && tl.progress() === 0) {
              tl.restart();
            }
          },
        },
      });

      // Animate title first, then items
      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      }).to(
        allItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.05,
        },
        "-=0.2"
      ); // Start items animation slightly before title finishes

      timelineRef.current = tl;
    };

    // Use multiple initialization attempts
    requestAnimationFrame(() => {
      setTimeout(initAnimation, 0);
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [isMounted]);

  return elementRef;
};
