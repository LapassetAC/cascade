import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import HeroSection from "@/components/HeroSection";
import styled from "styled-components";

const StyledContainer = styled.div`
  header {
    align-items: center;
    a {
      h1 {
        font-weight: 900;
        font-style: italic;
        font-size: 32px;
      }
      &:nth-child(2) {
        grid-column: 3 / 4;
      }
    }
  }
`;

export default function Home({ projects }) {
  return (
    <StyledContainer>
      <header className="grid">
        <a href="">
          <h1>Cascade</h1>
        </a>
        <a href="">Projets</a>
        <a href="">Savoir-faire</a>
        <a href="">À propos</a>
        <a href="">Contact</a>
      </header>
      <HeroSection />
      <ProjectsSection projects={projects} />
    </StyledContainer>
  );
}

export const getStaticProps = async () => {
  const projects = await client.fetch(PROJECTS_QUERY);

  return {
    props: {
      projects,
    },
  };
};
