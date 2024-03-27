import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import CascadeLogo from "@/components/CascadeLogo";
import styled from "styled-components";

const StyledContainer = styled.div`
  header {
    align-items: center;
    a {
      &:nth-child(2) {
        grid-column: 3 / 4;
      }
    }
  }
  section {
    &.hero {
      p {
        grid-column: 3 / 5;
      }
    }
  }
`;

export default function Home({ projects }) {
  return (
    <StyledContainer>
      <header className="grid">
        <a href="">
          <CascadeLogo />
        </a>
        <a href="">Projets</a>
        <a href="">Savoir-faire</a>
        <a href="">À propos</a>
        <a href="">Contact</a>
      </header>
      <section className="grid hero">
        <p>Revitalisez votre présence digitale.</p>
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
