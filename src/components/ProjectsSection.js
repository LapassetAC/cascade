import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { styled, keyframes } from "styled-components";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../../sanity/lib/client";
import { textApparitionAnim, textDisparitionAnim } from "@/styles/theme";
import { ThemeContext } from "styled-components";
import { Context } from "@/app/Context";

const projectIntro = keyframes`
  0% {
    opacity: 0;
    visibility: hidden;
    transform: translateY(90px);
  }
  100% {
    opacity: 1;
    visibility: visible;
    transform: translateY(0px);
  }
`;

const StyledContainer = styled.section`
  opacity: 0;
  animation: ${projectIntro} 0.4s 2.2s forwards;
  grid-row-gap: 0 !important;
  .project-block {
    grid-column: 1 / 3;
    position: sticky;
    top: 120px;
    height: fit-content;
    h2 {
      margin-bottom: 30px;
    }
  }
  .project-info {
    .mask {
      &:nth-child(1) {
        .info {
          animation-delay: 0.05s;
        }
      }
      &:nth-child(2) {
        .info {
          animation-delay: 0.1s;
        }
      }
    }
    ul {
      .mask {
        &:nth-child(1) {
          .info {
            animation-delay: 0.15s;
          }
        }
        &:nth-child(2) {
          .info {
            animation-delay: 0.2s;
          }
        }
        &:nth-child(3) {
          .info {
            animation-delay: 0.25s;
          }
        }
        &:nth-child(4) {
          .info {
            animation-delay: 0.3s;
          }
        }
        &:nth-child(5) {
          .info {
            animation-delay: 0.35s;
          }
        }
      }
    }
    .info {
      opacity: ${({ $isInfoTransition }) => ($isInfoTransition ? 1 : 0)};
      animation: ${({ $isInfoTransition }) =>
          $isInfoTransition ? textDisparitionAnim : textApparitionAnim}
        0.4s forwards;
    }
    .info,
    .mask {
      line-height: 30px;
    }
  }
`;

const StyledProjectVisuals = styled.a`
  grid-column: 3 / 7;
  padding-bottom: 180px;
  div {
    position: relative;
  }
  img {
    height: auto;
    width: 100%;
  }
  video {
    height: auto;
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s, visibility 0.5s;
  }
  video.show {
    opacity: 1;
    visibility: visible;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default function ProjectsSection({ projects }) {
  const theme = useContext(ThemeContext);
  const { setColors } = useContext(Context);

  const projectRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProject, setCurrentProject] = useState(projects[currentIndex]);
  const [isInfoTransition, setIsInfoTransition] = useState(false);
  const triggerFromTop = 700;

  useEffect(() => {
    const handleScroll = () => {
      const newCurrentIndex = projectRefs.current.findIndex((ref) => {
        const rect = ref.getBoundingClientRect();
        return rect.top < triggerFromTop && rect.bottom >= triggerFromTop;
      });
      if (newCurrentIndex === -1 || window.scrollY === 0) {
        setColors({ bgColor: theme.color.white, fontColor: theme.color.black });
      } else {
        setCurrentIndex(newCurrentIndex);
        setColors({
          bgColor: projects[newCurrentIndex].image.dominantColor,
          fontColor: theme.color.white,
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsInfoTransition(true);
    setTimeout(() => {
      setIsInfoTransition(false);
      setCurrentProject(projects[currentIndex]);
    }, 400 + currentProject.services.length * 100);
  }, [currentIndex]);

  return (
    <StyledContainer className="grid" $isInfoTransition={isInfoTransition}>
      <div className="project-block">
        <h2>Projets sélectionés</h2>
        <div className="project-info" key={currentProject.title}>
          <div className="mask">
            <h3 className="info title">{currentProject.title}</h3>
          </div>
          <div className="mask">
            <p className="info category">{currentProject.category}</p>
          </div>
          <ul>
            {currentProject.services.map((service, i) => (
              <div className="mask" key={i}>
                <li className="info service">{service}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      {projects.map((project, index) => {
        const { title, image, url, videoUrl } = project;
        const imageProps = useNextSanityImage(client, image);
        const [isHovered, setIsHovered] = useState(false);
        return (
          <StyledProjectVisuals
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            ref={(el) => (projectRefs.current[index] = el)}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            <div>
              <Image {...imageProps} alt={title} sizes="100vw" />
              <video
                preload="true"
                playsInline
                autoPlay
                loop
                muted
                className={isHovered ? "show" : ""}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </StyledProjectVisuals>
        );
      })}
    </StyledContainer>
  );
}
