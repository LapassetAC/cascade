import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import HeroCascade from "@/components/HeroCascade";
import styled from "styled-components";

const StyledContainer = styled.div`
  header {
    align-items: center;
    a {
      font-size: 24px;
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
  section {
    &.hero {
      & > div {
        grid-column: 2 / 3;
      }
      p {
        &:first-child {
          font-size: 48px;
          font-weight: 900;
        }
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
      <section className="hero grid">
        <HeroCascade />
        <p>Revitalisez votre présence digitale</p>
        <p>
          Nous concevons des sites web engageants pour des marques engagées. Nos
          créations se distinguent par leur fluidité, leur respect de
          l'environnement, et leur optimisation pour le référencement naturel
          (SEO).
        </p>
      </section>
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
