import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapAnimation = () => {
  const elementRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const title = element.querySelector(".skill-title");
    const items = element.querySelectorAll(".skill-item");

    gsap.set([title, items], { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",

        // markers: true,
      },
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "power3.out",
    }).to(
      items,
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        // stagger: 0.1,
        ease: "power3.out",
      },
      "+=0"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return elementRef;
};
