import { Project } from "@/types/project";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      screenWidth < 768 ? setIsMobile(true) : setIsMobile(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.play();
    }
  };
  const handleMouseLeave = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div className="grid gap-8">
      {/* <div> */}
      {projects.map((project) => {
        const { title, image, url, videoUrl } = project;
        return (
          <div className="col-span-3" key={project._id}>
            <a
              href=""
              className="group"
              onMouseEnter={() => {
                handleMouseEnter();
              }}
              onMouseLeave={() => {
                handleMouseLeave();
              }}
            >
              <Image
                className="absolute"
                src={image.asset.url}
                // ref={refImage}
                sizes="(max-width: 768px) 100px, 800px"
                width={800}
                height={447}
                quality={85}
                alt={title}
                // priority={priority}
              />

              <div className="overflow-hidden">
                <video
                  ref={videoRef}
                  className="hidden sm:block group-hover:translate-y-0 transition-transform w-full relative p-8 md:transition-transform md:transform md:-translate-y-full"
                  preload="auto"
                  playsInline
                  loop
                  muted
                  autoPlay
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsSection;
