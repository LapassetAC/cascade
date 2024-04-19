import { useState, useEffect } from "react";
import ProjectVisual from "./ProjectVisual";
import ProjectInfo from "./ProjectInfo";
import { styled } from "styled-components";

const StyledContainer = styled.section`
  grid-row-gap: 0 !important;
  grid-column: 1 / 7;
  margin: 0 !important;

  .projects-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    @media ${(props) => props.theme.minWidth.sm} {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 30px;
      grid-column: 3 / 7;
    }
  }
`;

export default function ProjectsSection({ projects, isFromPage }) {
  const [currentProject, setCurrentProject] = useState(null);
  const [displayedProject, setDisplayedProject] = useState(null);
  const [isInfoTransition, setIsInfoTransition] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (currentProject !== null) {
      setIsInfoTransition(true);
      setTimeout(() => {
        setDisplayedProject(currentProject);
        setIsInfoTransition(false);
      }, 200 + currentProject.services.length * 100);
    } else {
      setIsInfoTransition(true);
    }
  }, [currentProject]);

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

  return (
    <StyledContainer
      className="grid"
      $isInfoTransition={isInfoTransition}
      $isFromPage={isFromPage}
    >
      {!isMobile && displayedProject !== null && (
        <ProjectInfo
          displayedProject={displayedProject}
          isFromPage={isFromPage}
          isInfoTransition={isInfoTransition}
          isMobile={isMobile}
        />
      )}
      <div className="projects-container">
        {projects.map((project, index) => {
          return (
            <div key={index}>
              <ProjectVisual
                project={project}
                isFromPage={isFromPage}
                isMobile={isMobile}
                index={index}
                setCurrentProjectIndex={() =>
                  setCurrentProject(projects[index])
                }
              />
              {isMobile && (
                <ProjectInfo
                  project={project}
                  isFromPage={isFromPage}
                  isInfoTransition={isInfoTransition}
                  isMobile={isMobile}
                />
              )}
            </div>
          );
        })}
      </div>
    </StyledContainer>
  );
}
