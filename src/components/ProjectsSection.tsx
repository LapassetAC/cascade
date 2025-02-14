import { Project } from "@/types/project";
import Image from "next/image";
import { useRef } from "react";
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
    <section className="flex flex-col gap-y-16 pb-16">
      {projects.map((project, index) => {
        const { title, image, url, videoUrl, category, services } = project;
        return (
          <a
            key={project._id}
            href={url}
            className="col-span-3 group"
            onMouseEnter={() => {
              handleMouseEnter();
            }}
            onMouseLeave={() => {
              handleMouseLeave();
            }}
          >
            <div className="relative">
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
