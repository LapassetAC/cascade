import { keyframes, css } from "styled-components";

export const breakpoint = {
  xs: 375,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1440,
  xxl: 1728,
};

const theme = {
  color: {
    white: "#F4F3EF",
    black: "#1E1E1E",
    blue: "#1E50B1",
  },

  minWidth: {
    xs: `(min-width: ${breakpoint.xs}px)`,
    sm: `(min-width: ${breakpoint.sm}px)`,
    md: `(min-width: ${breakpoint.md}px)`,
    lg: `(min-width: ${breakpoint.lg}px)`,
    xl: `(min-width: ${breakpoint.xl}px)`,
    xxl: `(min-width: ${breakpoint.xxl}px)`,
  },
  cubicBezier: {
    pageTranstion: "cubic-bezier(.65,.05,.36,1)",
    base: "cubic-bezier(.25, .8, .25, 1)",
    bounce: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
  },
  pageTransitionTime: 1,
  pageAppearanceTime: 1,
  columnGap: "15px",
  border: "1px solid #332728",
  aspectRatio: {
    mobile: 1.25,
    desktop: 1.8,
  },
  headerHeight: 86,
  footerHeight: 86,
};

export const textApparitionAnim = keyframes`
  0% {
    transform: translateY(-50px);
    opacity: 0;
    visibility: hidden;
  }
  30% {
    opacity: 0;
    visibility: hidden;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
    visibility: visible;
  }
`;

export const textDisparitionAnim = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
    visibility: visible;
  }
  30% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
    transform: translateY(50px);
  }
`;

export function cascadeDelay(elementNumber, baseDelayInMs) {
  let styles = "";
  for (let i = 0; i <= elementNumber; i++) {
    styles += `
    &:nth-of-type(${i + 1}) {
      animation-delay: ${i / 10 + baseDelayInMs}s;
    }
    `;
  }
  return css`
    ${styles}
  `;
}

export default theme;
