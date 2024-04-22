import formsPlugin from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        sm: "18px",
        base: "20px",
        lg: "24px",
        xl: "28px",
        "2xl": "32px",
      },
      colors: {
        greenHome: "#AFD8DA",
        grayLine: "#747474",
        blueAnt: "#1890FF",
        main: "#74BA7B",
      },
    },
  },
  plugins: [formsPlugin],
};
