import React, { useState } from "react";
import Image from "next/image";
import { styled } from "styled-components";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../../sanity/lib/client";
import { fadeIn } from "@/styles/theme";

const StyledContainer = styled.section`
  opacity: 0;
  animation: ${fadeIn} 0.4s 1.5s forwards;

  .project-info {
    grid-column: 1 / 3;
  }
  .image-container {
    grid-column: 3 / 7;
    position: relative;
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
  }
  .category {
    margin: 10px 0 15px;
  }
`;

const StyledProject = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

export default function ProjectsSection({ projects }) {
  const changeBgColor = (color) => {
    document.body.style.backgroundColor = color;
  };
  return (
    <StyledContainer>
      {projects.map((project) => {
        const { title, image, url, videoUrl, category, services } = project;
        const imageProps = useNextSanityImage(client, image);
        const [isHovered, setIsHovered] = useState(false);
        return (
          <StyledProject
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="grid"
            key={title}
          >
            <div className="project-info">
              <p className="title">{title}</p>
              <p className="category">{category}</p>
              <div className="services">
                {services.map((service, i) => (
                  <p className="service-tag" key={i}>
                    {service}
                  </p>
                ))}
              </div>
            </div>
            <div
              className="image-container"
              onMouseEnter={() => {
                changeBgColor(image.dominantColor);
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                changeBgColor("#F4F3EF");
                setIsHovered(false);
              }}
            >
              <Image {...imageProps} alt={title} sizes="100vw" />
              <video
                preload
                playsinline
                autoPlay
                loop
                muted
                className={isHovered ? "show" : ""}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </StyledProject>
        );
      })}
    </StyledContainer>
  );
}
