import { Project } from "@/types/project";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useWindowSize from "@/hooks/useWindowSize";
import useUserActivity from "@/hooks/useUserActivity";

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  const isMobile = useWindowSize();

  const videoRefs = projects.map(() => useRef<HTMLVideoElement>(null));
  const isUserActive = useUserActivity();

  const projectRefs = projects.map(() =>
    useInView({
      triggerOnce: false,
      threshold: 0.4,
      rootMargin: "-100px",
    })
  );

  return (
    <section className="col-span-3 flex flex-col gap-y-32 pb-16">
      {projects.map((project, index) => {
        const { title, image, url, videoUrl, category, services } = project;
        const [inViewRef, inView] = projectRefs[index];
        const videoRef = videoRefs[index];

        useEffect(() => {
          const videoElement = videoRef.current;

          if (!videoElement) {
            return;
          }

          if (inView && isUserActive) {
            videoElement
              .play()
              .catch((error) =>
                console.error(`Video ${index} play error:`, error)
              );
          } else {
            videoElement.pause();
          }
        }, [inView, videoRef, index, isUserActive]);

        const setRefs = (element: HTMLVideoElement | null) => {
          videoRef.current = element;
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
            <div className="relative">
              <Image
                className="absolute object-cover"
                src={image.asset.url}
                fill
                sizes="(max-width: 768px) 100px, 800px"
                quality={85}
                alt={title}
                priority={index === 0}
              />
              <div className="overflow-hidden">
                <video
                  ref={setRefs}
                  className="w-full relative p-4 md:p-8 xl:p-16"
                  playsInline
                  loop
                  muted
                  preload="metadata"
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
    </section>
  );
};

export default ProjectsSection;
