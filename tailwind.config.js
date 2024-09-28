/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      gray: {
        DEFAULT: "#DFDFDF",
      },
      white: {
        DEFAULT: "#FFFFFF",
      },
      red: {
        DEFAULT: "#C42626",
      },
      title: {
        DEFAULT: "#231F20",
      },
      parag: {
        DEFAULT: "#251F21",
      },
    },
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
