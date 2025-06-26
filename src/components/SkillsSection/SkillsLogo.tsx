import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SkillsLogo = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const path4Ref = useRef<SVGPathElement>(null);
  const path5Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = [
      path1Ref.current,
      path2Ref.current,
      path3Ref.current,
      path4Ref.current,
      path5Ref.current,
    ];

    // Find the skills section by traversing up from the SVG
    const skillsSection = svg.closest("section");
    if (!skillsSection) return;

    const skillsCount = 5;

    // Initialize all paths as hidden
    paths.forEach((path) => {
      if (path) {
        gsap.set(path, {
          opacity: 0,
          scaleY: 0,
          transformOrigin: "bottom",
        });
      }
    });

    // Show first path initially
    if (paths[0]) {
      gsap.set(paths[0], { opacity: 1, scaleY: 1 });
    }

    // Create a single scroll trigger that manages all paths
    ScrollTrigger.create({
      trigger: skillsSection,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const totalProgress = self.progress;
        const pathProgress = totalProgress * skillsCount;
        const activePathIndex = Math.floor(pathProgress);

        // Show all paths up to the current active skill
        paths.forEach((path, index) => {
          if (path) {
            if (index <= activePathIndex) {
              // Show this path with smooth transition
              gsap.to(path, {
                opacity: 1,
                scaleY: 1,
                duration: 0.2,
                ease: "power2.out",
                overwrite: true,
              });
            } else {
              // Hide this path with smooth transition
              gsap.to(path, {
                opacity: 0,
                scaleY: 0,
                duration: 0.2,
                ease: "power2.out",
                overwrite: true,
              });
            }
          }
        });
      },
    });

    return () => {
      // Clean up only the ScrollTriggers created by this component
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === skillsSection) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width="243"
      height="192"
      viewBox="0 0 243 192"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current w-full h-auto mb-4 md:mb-0 relative z-10"
    >
      <path
        ref={path5Ref}
        d="M203.493 191.5H243V30.5C243 13.9315 229.569 0.500031 213 0.500031H188V1.23459C197.238 6.34796 203.493 16.1936 203.493 27.5V191.5Z"
      />
      <path
        ref={path4Ref}
        d="M157.493 153.5H197V30.5C197 13.9315 183.569 0.500031 167 0.500031H142V1.23459C151.238 6.34796 157.493 16.1936 157.493 27.5V153.5Z"
      />
      <path
        ref={path3Ref}
        d="M111.493 115.5H151V30.5C151 13.9315 137.569 0.500031 121 0.500031H96.0003V1.23459C105.238 6.34796 111.493 16.1936 111.493 27.5V115.5Z"
      />
      <path
        ref={path2Ref}
        d="M65.4932 77.5H105V30.5C105 13.9315 91.5688 0.500031 75.0003 0.500031H51.0003V1.81357C59.6869 7.06901 65.4932 16.6065 65.4932 27.5V77.5Z"
      />
      <path
        ref={path1Ref}
        d="M32.1669 39.5H59.0005V30.5C59.0005 13.9315 45.569 0.5 29.0005 0.5H0.000488281V1.87841C14.7952 10.0433 26.3253 23.4394 32.1669 39.5Z"
      />
    </svg>
  );
};

export default SkillsLogo;
