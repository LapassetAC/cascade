import { Project } from "@/types/project";

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  console.log(projects);
  return (
    <div>
      {projects.map((project) => (
        <div key={project._id}>{project.title}</div>
      ))}
    </div>
  );
};

export default ProjectsSection;
