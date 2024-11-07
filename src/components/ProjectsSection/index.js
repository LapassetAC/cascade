import { useState, useEffect } from "react";
import ProjectVisual from "./ProjectVisual";
import ProjectInfo from "./ProjectInfo";
import { textApparitionAnim, cascadeDelay } from "@/styles/theme";
import styled, { css } from "styled-components";

const StyledContainer = styled.section`
  grid-column: 1 / 6;
  align-items: start;
  .hero {
    margin-top: 15px;
    align-items: start;
    @media ${(props) => props.theme.minWidth.sm} {
      margin-top: 30px;
    }
    overflow-y: hidden;
    &.slogan {
      margin-bottom: 30px;
      @media ${(props) => props.theme.minWidth.sm} {
        margin-bottom: 0px;
        grid-column: 1 / 2;
        /* top: 120px; */
        /* position: sticky; */
        align-items: start;
      }
      span {
        display: inline-block;
        ${cascadeDelay(5, 0.7)}
        ${({ $isFromPage }) =>
          !$isFromPage &&
          css`
            transform: translateY(-60px);
            animation: ${textApparitionAnim} 0.4s forwards;
          `}
      }
    }
    &.businessDescription {
      grid-column: 2 / 5;
      margin-bottom: 45px;
      ${({ $isFromPage }) =>
        !$isFromPage &&
        css`
          animation: ${textApparitionAnim} 0.4s 2.3s forwards;
          opacity: 0;
        `}
      @media ${(props) => props.theme.minWidth.sm} {
        margin-bottom: 60px;
      }
    }
  }

  .projects-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    @media ${(props) => props.theme.minWidth.sm} {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 30px;
      grid-column: 2 / 6;
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
      <p className="hero slogan">
        <span>Créateurs </span> <span>de&nbsp;</span>
        <span> sites </span> <span>web </span> <span>engageants.</span>
      </p>
      <p className="hero businessDescription">
        Nous concevons des interfaces web uniques pour des projets inspirants.
        Fidèles aux valeurs de nos clients, nos créations se distinguent par
        leur fluidité, leur performance et un référencement naturel (SEO)
        optimisé.
      </p>
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
                priority={index === 0}
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
