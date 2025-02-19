import { Project } from "@/types/project";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useWindowSize from "@/hooks/useWindowSize";

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  const isMobile = useWindowSize();

  // Create an array of video refs
  const videoRefs = projects.map(() => useRef<HTMLVideoElement>(null));

  const projectRefs = projects.map(() =>
    useInView({
      triggerOnce: false,
      threshold: 0.4,
      rootMargin: "-100px",
    })
  );

  return (
    <section className="col-span-3 flex flex-col gap-y-16 pb-16">
      {projects.map((project, index) => {
        const { title, image, url, videoUrl, category, services } = project;
        const [inViewRef, inView] = projectRefs[index];
        const videoRef = videoRefs[index];

        useEffect(() => {
          console.log(`Video ${index} inView:`, inView);
          const videoElement = videoRef.current;

          if (!videoElement) {
            console.log(`Video ${index} element not found`);
            return;
          }

          if (inView) {
            console.log(`Attempting to play video ${index}`);
            videoElement
              .play()
              .then(() => console.log(`Video ${index} playing successfully`))
              .catch((error) =>
                console.error(`Video ${index} play error:`, error)
              );
          } else {
            videoElement.pause();
          }
        }, [inView, videoRef, index]);

        // Combine the refs
        const setRefs = (element: HTMLVideoElement | null) => {
          // Set the video ref
          videoRef.current = element;
          // Set the inView ref
          inViewRef(element);
        };

        return (
          <a key={project._id} href={url} className="col-span-3">
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
                  className="hidden sm:block w-full relative p-8"
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
            <div className="mt-4 grid grid-cols-3 gap-4 text-right">
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
          </a>
        );
      })}
    </section>
  );
};

export default ProjectsSection;
