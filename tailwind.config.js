/** @type {import('tailwindcss').Config} */

const baseFontSize = 10;

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: () => ({
        ...Array.from({ length: 96 }, (_, index) => index * 0.5)
          .filter((i) => i)
          .reduce(
            (acc, i) => ({ ...acc, [i]: `${i / (baseFontSize / 4)}rem` }),
            {}
          ),
      }),
      fontSize: {
        xs: [
          `${(16 * 0.75) / baseFontSize}rem` /* 12px */,
          {
            lineHeight: `${(16 * 1) / baseFontSize}rem` /* 16px */,
          },
        ],
        sm: [
          `${(16 * 0.875) / baseFontSize}rem` /* 14px */,
          {
            lineHeight: `${(16 * 1.25) / baseFontSize}rem` /* 20px */,
          },
        ],
        base: [
          `${(16 * 1) / baseFontSize}rem` /* 16px */,
          {
            lineHeight: `${(16 * 1.5) / baseFontSize}rem` /* 24px */,
          },
        ],
        lg: [
          `${(16 * 1.125) / baseFontSize}rem` /* 18px */,
          {
            lineHeight: `${(16 * 1.75) / baseFontSize}rem` /* 28px */,
          },
        ],
        xl: [
          `${(16 * 1.25) / baseFontSize}rem` /* 20px */,
          {
            lineHeight: `${(16 * 1.75) / baseFontSize}rem` /* 28px */,
          },
        ],
        "2xl": [
          `${(16 * 1.5) / baseFontSize}rem` /* 24px */,
          {
            ineHeight: `${(16 * 2) / baseFontSize}rem` /* 32px */,
          },
        ],
        "3xl": [
          `${(16 * 1.875) / baseFontSize}rem` /* 30px */,
          {
            lineHeight: `${(16 * 2.25) / baseFontSize}rem` /* 36px */,
          },
        ],
        "4xl": [
          `${(16 * 2.25) / baseFontSize}rem` /* 36px */,
          {
            lineHeight: `${(16 * 2.5) / baseFontSize}rem` /* 40px */,
          },
        ],
        "5xl": [
          `${(16 * 3) / baseFontSize}rem` /* 48px */,
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
        "6xl": [
          `${(16 * 3.75) / baseFontSize}rem` /* 60px */,
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
        "7xl": [
          `${(16 * 4.5) / baseFontSize}rem` /* 72px */,
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
        "8xl": [
          `${(16 * 6) / baseFontSize}rem` /* 96px */,
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
        "9xl": [
          `${(16 * 8) / baseFontSize}rem` /* 128px */,
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
      },
      display: ["group-hover"],
      colors: {
        black: "#000",
        white: "#fff",
        powderAsh: "#c1c7c5",
        lighterGray: "#d5d4d4",
        darkGray: "#a9a9a9",
        gray95: "#f2f2f2",
        mantis: "#7ac142",
        mantisDarker: "#5a803d",
        transparentMantisDarker1: "rgba(90, 128, 61, 0.3)",
        transparentMantisDarker2: "rgba(90, 128, 61, 0.7)",
        fadedBlack1: "rgba(0, 0, 0, 0.7)",
        fadedBlack2: "rgba(0, 0, 0, 0.4)",
        lighterBlue: "#153c6b",
        transparentLighterBlue: "rgba(21, 60, 107, 0.3)",
        blue: "#60a5fa",
        darkBlue: "#090c1b",
        fadedDarkBlue: "rgba(9, 12, 27, 0.5)",
        tomato: "#ff6347",
        errorText: "#ba2207",
        errorBg: "#f27f6b",
        transparent: "transparent",
        lightPurple: "#a855f7",
        darkPurple: "#581c87",
      },
      fontFamily: {
        righteous: ["Righteous", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },

  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
