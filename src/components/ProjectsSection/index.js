import { useState, useEffect } from "react";
import ProjectVisual from "./ProjectVisual";
import { styled, css } from "styled-components";
import { textApparitionAnim, textDisparitionAnim } from "@/styles/theme";
import Arrow from "@/assets/icons/Arrow";

const StyledContainer = styled.section`
  grid-row-gap: 0 !important;
  grid-column: 1 / 7;
  margin: 0 !important;
  .project-info {
    margin-bottom: 40px;
    ${({ $isFromPage }) =>
      !$isFromPage &&
      css`
        opacity: 0;
        animation: ${textApparitionAnim} 0.4s 2.4s forwards;
      `}
    @media ${(props) => props.theme.minWidth.sm} {
      opacity: 1;
      animation: none;
      grid-column: 1 / 2;
      position: sticky;
      top: 170px;
      height: fit-content;
      margin-bottom: 0;
    }
    .row {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 15px;
    }
    a {
      text-align: end;
    }
    .info {
      @media ${(props) => props.theme.minWidth.sm} {
        opacity: ${({ $isInfoTransition }) => ($isInfoTransition ? 1 : 0)};
        animation: ${({ $isInfoTransition }) =>
            $isInfoTransition ? textDisparitionAnim : textApparitionAnim}
          0.2s forwards;
      }
      &.title {
        font-weight: 900;
        @media ${(props) => props.theme.minWidth.sm} {
          margin-bottom: 15px;
        }
      }
      &.category {
        animation-delay: 0.05s;
        margin-bottom: 0;
        @media ${(props) => props.theme.minWidth.sm} {
          margin-bottom: 15px;
        }
      }
      &.service {
        margin-bottom: 0;
      }
    }
    .info,
    .mask {
      @media ${(props) => props.theme.minWidth.sm} {
        line-height: 30px;
      }
    }
    ul {
      .mask {
        &:nth-child(1) {
          .info {
            animation-delay: 0.1s;
          }
        }
        &:nth-child(2) {
          .info {
            animation-delay: 0.15s;
          }
        }
        &:nth-child(3) {
          .info {
            animation-delay: 0.2s;
          }
        }
        &:nth-child(4) {
          .info {
            animation-delay: 0.25s;
          }
        }
        &:nth-child(5) {
          .info {
            animation-delay: 0.3s;
          }
        }
        &:nth-child(6) {
          .info {
            animation-delay: 0.35s;
          }
        }
      }
    }
  }
  .projects-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    @media ${(props) => props.theme.minWidth.sm} {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 30px;
      grid-column: 2 / 7;
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
      {displayedProject !== null && !isMobile && (
        <div className="project-info" key={displayedProject.title}>
          <div className="mask">
            <h2 className="info title">{displayedProject.title}</h2>
          </div>
          <div className="mask">
            <p className="info category">{displayedProject.category}</p>
          </div>
          <ul>
            {displayedProject.services.map((service, i) => (
              <li className="mask" key={service}>
                <p className="info service">{service}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="projects-container">
        {projects.map((project, index) => {
          const { title, url, category, services } = project;
          return (
            <>
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
                <div className="project-info">
                  <div className="row">
                    <h2 className="info title">{title}</h2>
                    <p className="info category">{category}</p>
                  </div>
                  <div className="row">
                    <ul>
                      {services.map((service, i) => (
                        <li key={i}>
                          <p className="info service">{service}</p>
                        </li>
                      ))}
                    </ul>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Voir <Arrow />
                    </a>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </StyledContainer>
  );
}
