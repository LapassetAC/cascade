/* eslint-disable react-hooks/rules-of-hooks */
import { Project } from "@/types/project";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useWindowSize from "@/hooks/useWindowSize";
import useUserActivity from "@/hooks/useUserActivity";

// Create a custom hook for managing multiple video refs and inView states
const useProjectsInView = (projectsCount: number) => {
  const inViewHooks = [];
  for (let i = 0; i < projectsCount; i++) {
    inViewHooks.push(
      useInView({
        triggerOnce: false,
        threshold: 0.4,
        rootMargin: "-100px",
      })
    );
  }
  return inViewHooks;
};

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  // Check if projects exist early
  if (!projects || projects.length === 0) {
    return null;
  }

  const isMobile = useWindowSize();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const isUserActive = useUserActivity();

  // Create refs for all possible projects
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Create inView observers for all projects
  const projectInViewData = useProjectsInView(projects.length);

  // Handle video playback based on inView state
  useEffect(() => {
    projects.forEach((_, index) => {
      const videoElement = videoRefs.current[index];
      const inView = projectInViewData[index]?.[1];

      if (!videoElement) {
        return;
      }

      if (inView && isUserActive) {
        videoElement
          .play()
          .catch((error) => console.error(`Video ${index} play error:`, error));
      } else {
        videoElement.pause();
      }
    });
  }, [projects, projectInViewData, isUserActive]);

  return (
    <section className="col-span-3 flex flex-col gap-y-32 pb-16">
      <h2 className="title">Nos projets</h2>

      {projects.map((project, index) => {
        const { title, image, url, videoUrl, category, services } = project;
        const [inViewRef] = projectInViewData[index];

        // Don't render if project is not in the show all projects and beyond first 3
        if (!showAllProjects && index >= 3) {
          return null;
        }

        const setRefs = (element: HTMLVideoElement | null) => {
          videoRefs.current[index] = element;
          inViewRef(element);
        };

        const ProjectWrapper = isMobile ? "div" : "a";
        const wrapperProps = {
          className: "col-span-3",
          ...(isMobile
            ? {}
            : { href: url, target: "_blank", rel: "noopener noreferrer" }),
        };

        return (
          <ProjectWrapper key={project._id} {...wrapperProps}>
            <div className="relative aspect-[4/3] lg:min-h-[500px] lg:aspect-[16/10] overflow-hidden">
              <Image
                className="absolute object-cover"
                src={image.asset.url}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                quality={85}
                alt={title}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <video
                  ref={setRefs}
                  className="max-w-[60%] max-h-[70%] w-auto h-auto"
                  playsInline
                  loop
                  muted
                  preload={index === 0 ? "auto" : "metadata"}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="flex justify-between mt-4 md:block">
              <div className="md:grid grid-cols-3 gap-4 md:text-right">
                <h3 className="font-bold">{title}</h3>
                <p>{category}</p>
                <ul>
                  {services.map((service, i) => (
                    <li key={i}>
                      <p className="">{service}</p>
                    </li>
                  ))}
                </ul>
              </div>
              {isMobile && (
                <a
                  href={url}
                  className="md:hidden text-right flex items-start gap-2 font-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir
                  <svg
                    className="mt-[6px]"
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.82107 1.00022C8.82107 0.586008 8.48528 0.250222 8.07107 0.250222L1.32107 0.250221C0.906854 0.250221 0.571068 0.586008 0.571068 1.00022C0.571068 1.41444 0.906854 1.75022 1.32107 1.75022H7.32107V7.75022C7.32107 8.16443 7.65685 8.50022 8.07107 8.50022C8.48528 8.50022 8.82107 8.16443 8.82107 7.75022L8.82107 1.00022ZM1.53033 8.60162L8.6014 1.53055L7.54074 0.469891L0.46967 7.54096L1.53033 8.60162Z" />
                  </svg>
                </a>
              )}
            </div>
          </ProjectWrapper>
        );
      })}
      {projects.length > 3 && (
        <button
          onClick={() => setShowAllProjects(!showAllProjects)}
          className="text-center font-bold -m-4 p-4"
        >
          {showAllProjects
            ? "← Voir moins de projets"
            : "→ Voir plus de projets"}
        </button>
      )}
    </section>
  );
};

export default ProjectsSection;
