import { heroui } from "@heroui/theme";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",

  plugins: [heroui()],
};

export default config;
