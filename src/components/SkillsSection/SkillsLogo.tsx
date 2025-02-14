import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SkillsLogo = () => {
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const path3Ref = useRef(null);
  const path4Ref = useRef(null);
  const path5Ref = useRef(null);

  useEffect(() => {
    const paths = [
      path1Ref.current,
      path2Ref.current,
      path3Ref.current,
      path4Ref.current,
      path5Ref.current,
    ];

    const skills = document.querySelectorAll("#skills-list > li");
    paths.forEach((path, index) => {
      console.log(skills);
      if (skills[index]) {
        gsap.fromTo(
          path,
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
            duration: 0.3,
            scrollTrigger: {
              trigger: skills[index],
              start: "top center",
              end: "bottom center",
              //   scrub: 1,
              //   markers: true, // Pour débugger
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <svg
      width="243"
      height="192"
      viewBox="0 0 243 192"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current w-full sticky top-96"
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
