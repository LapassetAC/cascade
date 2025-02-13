import { Project } from "@/types/project";
import Image from "next/image";

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  // console.log(projects);
  return (
    <div>
      {projects.map((project) => {
        const { title, image, url, videoUrl } = project;
        return (
          <div key={project._id}>
            <Image
              src={image.asset.url}
              // ref={refImage}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              // width={800}
              // height={447}
              quality={85}
              alt={title}
              // priority={priority}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsSection;
