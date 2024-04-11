import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  letter-spacing: -0.05em;
  background-color: ${({ theme }) => theme.color.white};
  min-height: 100vh;
}

a,p,button,h1,h2,h3,i,input, ul, li {
  letter-spacing: -0.05em;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  list-style: none;
  @media ${({ theme }) => theme.minWidth.md} {
    font-size: 22px;
  }
}

a {
  color: inherit;
  text-decoration: none;
}

.grid {
  display: block;
  /* grid-template-columns: repeat(1, 1fr); */
  /* grid-gap: 15px; */
  margin: 0 15px;
  @media ${(props) => props.theme.minWidth.sm} {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 30px;
    margin: 0 30px;
  }
}

.mask {
  overflow-y: hidden;
}
`;
