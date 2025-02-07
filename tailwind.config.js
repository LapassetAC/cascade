/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#1E1E1E",
      },
      animation: {
        "fade-in": "fadeIn 0.4s forwards",
        "fade-in-up": "fadeInUp 0.4s forwards",
        "drop-in": "dropIn 0.4s forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(-50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        dropIn: {
          "0%": { 
            opacity: "0",
            clipPath: "rect(0 0% 0% 0)",
          },
          "100%": { 
            opacity: "1",
            clipPath: "var(--clip-path)",
          },
        },
      },
    },
  },
  plugins: [],
};
