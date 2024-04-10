import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { styled, keyframes } from "styled-components";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../../sanity/lib/client";
import {
  textApparitionAnim,
  textDisparitionAnim,
  cascadeDelay,
} from "@/styles/theme";

const StyledContainer = styled.section`
  grid-row-gap: 0 !important;
  grid-column: 1 / 7;
  margin: 0 !important;
  .project-info {
    margin-bottom: 40px;
    @media ${(props) => props.theme.minWidth.sm} {
      grid-column: 1 / 3;
      position: sticky;
      top: 170px;
      height: fit-content;
      margin-bottom: 0;
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
        margin-top: 10px;
        margin-bottom: 15px;
        @media ${(props) => props.theme.minWidth.sm} {
          margin-top: 0;
        }
      }
      &.category {
        animation-delay: 0.05s;
        margin-bottom: 15px;
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
      grid-column: 3 / 7;
    }
  }
`;

const StyledProjectVisuals = styled.a`
  opacity: 0;
  animation: ${textApparitionAnim} 0.4s forwards;
  ${cascadeDelay(6, 2.5)}

  position: relative;
  &:hover {
    cursor: pointer;
    video {
      transform: translateY(0px);
    }
  }
  img {
    height: auto;
    width: 100%;
    aspect-ratio: 1.66;
  }
  .mask {
    top: 30px;
    left: 30px;
    right: 30px;
    bottom: 30px;
    position: absolute;
  }
  video {
    width: 100%;
    transform: translateY(-101%);
    transition: transform 0.2s;
  }
`;

export default function ProjectsSection({ projects }) {
  const projectRefs = useRef([]);
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
    <StyledContainer className="grid" $isInfoTransition={isInfoTransition}>
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
              <li className="mask" key={i}>
                <p className="info service">{service}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="projects-container">
        {projects.map((project, index) => {
          const { title, image, url, videoUrl, category, services } = project;
          const imageProps = useNextSanityImage(client, image);
          const videoRef = useRef(null);

          const handleMouseEnter = () => {
            videoRef.current.play();
          };
          const handleMouseLeave = () => {
            videoRef.current.pause();
          };

          return (
            <>
              <StyledProjectVisuals
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                ref={(el) => (projectRefs.current[index] = el)}
                onMouseEnter={() => {
                  handleMouseEnter();
                  setCurrentProject(projects[index]);
                }}
                onMouseLeave={() => {
                  handleMouseLeave();
                  setCurrentProject(null);
                }}
              >
                <Image {...imageProps} alt={title} />
                <div className="mask">
                  <video ref={videoRef} preload="auto" playsInline loop muted>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </StyledProjectVisuals>
              {isMobile && (
                <div className="project-info">
                  <h2 className="info title">{title}</h2>
                  <p className="info category">{category}</p>
                  <ul>
                    {services.map((service, i) => (
                      <li key={i}>
                        <p className="info service">{service}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          );
        })}
      </div>
    </StyledContainer>
  );
}
