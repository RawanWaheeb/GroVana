/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        primary: {
          main: "#2E5B41",
          50: "#9dde9d",
          100: "#85d685",
          200: "#6cce6c",
          300: "#54c654",
          400: "#3bbd3b",
          500: "#23b523",
          600: "#0aad0a",
          700: "#099c09",
          800: "#088a08",
          900: "#077907",
          DEFAULT: "#98CBB0",
          buttons: "#2E5B41",
          light: "#E7EFE4",
        },
      },
      keyframes: {
        moveingBorder: {
          "0%, 100%": {
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          "50%": {
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
          },
        },
      },
      fontFamily: {
        "fira-sans-condensed": ['"Fira Sans Condensed"', "sans-serif"],
      },
      screens: {
        "2xl": "1400px",
      },
    },
    animation: {
      moveingBorder: "moveingBorder 8s ease-in-out infinite",
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [],
};
