import { Project } from "@/types/project";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import useWindowSize from "@/hooks/useWindowSize";

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  const isMobile = useWindowSize();
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const [refImage, inView] = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "150px 0px 150px 0px",
  });

  return (
    <div className="grid gap-8">
      {projects.map((project, index) => {
        const { title, image, url, videoUrl } = project;
        return (
          <div className="col-span-3" key={project._id}>
            <a
              href=""
              className="group relative"
              onMouseEnter={() => {
                handleMouseEnter();
              }}
              onMouseLeave={() => {
                handleMouseLeave();
              }}
            >
              <Image
                className="absolute object-cover"
                src={image.asset.url}
                fill
                ref={refImage}
                sizes="(max-width: 768px) 100px, 800px"
                quality={85}
                alt={title}
                priority={index === 0}
              />

              <div className="overflow-hidden">
                {inView && (
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
                )}
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsSection;
