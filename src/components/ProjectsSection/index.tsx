import { Project } from "@/types/project";
import Image from "next/image";

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="grid gap-8">
      {/* <div> */}
      {projects.map((project) => {
        const { title, image, url, videoUrl } = project;
        return (
          <div className="col-span-3" key={project._id}>
            <Image
              src={image.asset.url}
              // ref={refImage}
              sizes="(max-width: 768px) 100px, 800px"
              width={800}
              height={447}
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
