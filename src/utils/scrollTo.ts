/**
 * Smoothly scrolls to the footer/bottom of the page
 */
export const scrollToFooter = (e: React.MouseEvent) => {
  e.preventDefault();
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

/**
 * Smoothly scrolls to the top of the page
 */
export const scrollToTop = (e: React.MouseEvent) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/**
 * Smoothly scrolls to a specific element by ID
 */
export const scrollToElement = (e: React.MouseEvent, elementId: string) => {
  e.preventDefault();
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
