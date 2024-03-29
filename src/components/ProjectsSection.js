import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { styled } from "styled-components";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../../sanity/lib/client";
import { fadeIn } from "@/styles/theme";

const StyledContainer = styled.section`
  opacity: 0;
  animation: ${fadeIn} 0.4s 2s forwards;

  .project-info {
    grid-column: 1 / 3;
    position: sticky;
    top: 120px;
    height: fit-content;
  }
  .image-container {
  }
  .category {
    margin: 10px 0 15px;
  }
`;

const StyledProjectVisuals = styled.a`
  grid-column: 3 / 7;
  position: relative;
  height: calc(100vh - 120px);
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
  const projectRefs = useRef([]);
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const headersHeight = 600;

  useEffect(() => {
    const handleScroll = () => {
      const currentIndex = projectRefs.current.findIndex((ref) => {
        const rect = ref.getBoundingClientRect();
        return (
          rect.top < window.innerHeight * 0.5 && rect.bottom >= headersHeight
        );
      });
      if (currentIndex !== -1 && currentIndex !== currentProject) {
        setCurrentProject(projects[currentIndex]);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentProject]);

  const changeBgColor = (color) => {
    document.body.style.backgroundColor = color;
  };
  return (
    <StyledContainer className="grid">
      <div className="project-info">
        <p className="title">{currentProject.title}</p>
        <p className="category">{currentProject.category}</p>
        <div className="services">
          {currentProject.services.map((service, i) => (
            <p key={i}>{service}</p>
          ))}
        </div>
      </div>
      {projects.map((project, index) => {
        const { title, image, url, videoUrl, category, services } = project;
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
              changeBgColor(image.dominantColor);
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              changeBgColor("#F4F3EF"); //TODO color from theme
              setIsHovered(false);
            }}
          >
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
          </StyledProjectVisuals>
        );
      })}
    </StyledContainer>
  );
}
