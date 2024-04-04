import styled from "styled-components";
import Image from "next/image";
import TeamImage from "@/assets/images/team.jpg";

const StyledContainer = styled.div`
  padding: 90px 0 200px;
  background-color: ${({ theme }) => theme.color.blue};
  color: ${({ theme }) => theme.color.white};
  .intro {
    grid-column: 2 / 5;
    margin-bottom: 100px;
  }
  img {
    grid-column: 1 / 7;
    width: 100%;
    height: auto;
    margin-bottom: 200px;
  }
  .presentation-adri {
    grid-column: 1 / 4;
  }
  .presentation-clem {
    grid-column: 4 / 7;
  }
  h2 {
    font-size: 40px;
    font-weight: 900;
    margin-bottom: 30px;
  }
`;

export default function About() {
  return (
    <StyledContainer className="grid">
      <p className="intro">
        Fondé par deux frères passionnés se définissant comme artisans du Web,
        le studio Cascade incarne leur volonté de faire passer les sites et
        interfaces dans une nouvelle ère, tant en termes de design que de
        performance énergétique. Conscients de la complexité des services du
        secteur et de l’opacité liée à ses coûts (hébergement, maintenance,
        etc.) nous nous engageons à offrir une structure de prix réduite et
        transparente.
      </p>
      <Image src={TeamImage} alt="Photo d'équipe" />
      <div className="presentation-adri">
        <h2>Adrien</h2>
        <p>
          Initialement formé à l’informatique, Adrien a enrichi son parcours par
          un Master en Design Graphique et Intéractivité à l’École Supérieure
          d’Art et de Design Graphique Le Havre-Rouen afin d’acquérir une double
          compétence en design et développement web. <br />
          Avec plus de 7 ans d'expérience en freelance, il excelle grâce à sa
          veille des tendances design et technologies web, assurant une
          innovation constante dans ses projets.
        </p>
      </div>
      <div className="presentation-clem">
        <h2>Clément</h2>
        <p>
          Diplômé de l’EDHEC avec une expérience en conseil chez Sopra Steria et
          Deloitte, Clément s’est orienté vers le domaine du Web poussé par sa
          passion du code et son désir de créativité. <br />
          Il mise sur une écoute attentive et une communication claire pour
          guider ses clients, tirant parti de son expérience variée pour
          répondre avec agilité et pédagogie à leurs besoins.
        </p>
      </div>
    </StyledContainer>
  );
}
