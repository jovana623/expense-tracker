/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBg: "#fff",
      },
    },
  },
  plugins: [require("tailwindcss-3d")],
};
