export default function ProjectsSection({ projects }) {
  return (
    <div>
      {projects.map((project, index) => (
        <div key={index}>{project.title}</div>
      ))}
    </div>
  );
}
