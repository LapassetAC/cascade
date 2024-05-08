import styled from "styled-components";

const StyledContainer = styled.div`
  color: ${({ theme }) => theme.color.white};
  padding-bottom: 60px;
  @media ${({ theme }) => theme.minWidth.sm} {
    padding: 30px 0 140px;
  }
  h1 {
    grid-column: 1 / 2;
    margin-bottom: 15px;
    @media ${({ theme }) => theme.minWidth.sm} {
      margin-bottom: 0;
    }
  }
  .intro {
    grid-column: 1 / 3;
    @media ${({ theme }) => theme.minWidth.sm} {
      grid-column: 2 / 5;
      margin-bottom: 30px;
    }
  }
  .presentation {
    grid-column: 1 / 3;
    margin-top: 15px;
    @media ${({ theme }) => theme.minWidth.sm} {
      grid-column: 2 / 5;
      margin-top: 30px;
    }
  }
  h2 {
    font-weight: 900;
    margin-bottom: 8px;
    @media ${({ theme }) => theme.minWidth.sm} {
      margin-bottom: 15px;
    }
  }
`;

export default function About() {
  return (
    <StyledContainer className="grid">
      <h1>Deux frères, deux&nbsp;artisans&nbsp;du&nbsp;web.</h1>
      <p className="intro">
        Fondé par deux frères passionnés se définissant comme artisans du web,
        le studio Cascade incarne leur volonté de faire passer les sites et
        interfaces dans une nouvelle ère, tant en termes de design que de
        performance énergétique. Conscients de la complexité des services du
        secteur et de l’opacité liée à ses coûts (hébergement, maintenance,
        etc.) nous nous engageons à offrir une structure de prix réduite et
        transparente.
      </p>
      <div className="presentation">
        <h2>Adrien</h2>
        <p>
          Initialement formé à l’informatique, Adrien a enrichi son parcours par
          un Master en Design Graphique et Interactivité à l’École Supérieure
          d’Art et de Design Graphique Le Havre-Rouen afin d’acquérir une double
          compétence en design et développement web. <br />
          Avec plus de 7 ans d'expérience en freelance, il excelle grâce à sa
          veille des tendances design et technologies web, assurant une
          innovation constante dans ses projets.
        </p>
      </div>
      <div className="presentation">
        <h2>Clément</h2>
        <p>
          Diplômé de l’EDHEC (Master en Business Management et MSc en Stratégie,
          Organisations & Conseil) avec une expérience en conseil chez Sopra
          Steria et Deloitte, Clément s’est orienté vers le domaine du web
          poussé par sa passion du code et son désir de créativité. <br />
          Il mise sur une écoute attentive et une communication claire pour
          guider ses clients, tirant parti de son expérience variée pour
          répondre avec agilité et pédagogie à leurs besoins.
        </p>
      </div>
    </StyledContainer>
  );
}
