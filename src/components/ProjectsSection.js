import Image from "next/image";
import { styled } from "styled-components";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../../sanity/lib/client";

const StyledContainer = styled.section`
  .project-info {
    grid-column: 1 / 3;
  }
  img {
    grid-column: 3 / 7;
    height: auto;
    width: 100%;
  }
`;

export default function ProjectsSection({ projects }) {
  return (
    <StyledContainer>
      {projects.map((project) => {
        const { title, image, url, category, services } = project;
        const imageProps = useNextSanityImage(client, image);
        return (
          <div className="grid" key={title}>
            <div className="project-info">
              <div className="title">{title}</div>
              <div className="category">{category}</div>
              <div className="services">
                {services.map((service, i) => (
                  <span className="service-tag" key={i}>
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <Image {...imageProps} alt={title} sizes="100vw" />
          </div>
        );
      })}
    </StyledContainer>
  );
}
