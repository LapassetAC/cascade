import { textApparitionAnim, textDisparitionAnim } from "@/styles/theme";
import { styled, css } from "styled-components";
import Arrow from "@/assets/icons/Arrow";

const StyledContainer = styled.aside`
  margin-bottom: 40px;
  ${({ $isFromPage }) =>
    !$isFromPage &&
    css`
      opacity: 0;
      animation: ${textApparitionAnim} 0.4s 2.4s forwards;
    `}
  @media ${(props) => props.theme.minWidth.sm} {
    opacity: 1;
    animation: none;
    grid-column: 1 / 2;
    position: sticky;
    top: 170px;
    height: fit-content;
    margin-bottom: 0;
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 15px;
  }
  a {
    text-align: end;
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
      @media ${(props) => props.theme.minWidth.sm} {
        margin-bottom: 15px;
      }
    }
    &.category {
      animation-delay: 0.05s;
      margin-bottom: 0;
      @media ${(props) => props.theme.minWidth.sm} {
        margin-bottom: 15px;
      }
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
`;

export default function ProjectInfo({
  project,
  displayedProject,
  isFromPage,
  isInfoTransition,
  isMobile,
}) {
  if (isMobile) {
    const { title, url, category, services } = project;
    return (
      <StyledContainer>
        <div className="row">
          <h2 className="info title">{title}</h2>
          <p className="info category">{category}</p>
        </div>
        <div className="row">
          <ul>
            {services.map((service, i) => (
              <li key={i}>
                <p className="info service">{service}</p>
              </li>
            ))}
          </ul>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Voir <Arrow />
          </a>
        </div>
      </StyledContainer>
    );
  } else {
    const { title, category, services } = displayedProject;
    return (
      <StyledContainer
        $isFromPage={isFromPage}
        $isInfoTransition={isInfoTransition}
      >
        <div className="mask">
          <h2 className="info title">{title}</h2>
        </div>
        <div className="mask">
          <p className="info category">{category}</p>
        </div>
        <ul>
          {services.map((service, i) => (
            <li className="mask" key={service}>
              <p className="info service">{service}</p>
            </li>
          ))}
        </ul>
      </StyledContainer>
    );
  }
}
