module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  // content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // screens: {
    //   'tb': '1200px'
    // },
    colors: {
      primary: {
        darkest: "#051B34",
        DEFAULT: "#0089d1",
        lightest: "#E8F2FD",
      },
      secondary: {
        darkest: "#650000",
        DEFAULT: "#CB2020",
        lightest: "#FFEBEB",
      },
      success: {
        darkest: "#004615",
        DEFAULT: "#03C03C",
        lightest: "#E8FFEF",
      },
      warn: {
        darkest: "#5C2500",
        DEFAULT: "#FF7417",
        lightest: "#FFF1E8",
      },
      danger: {
        DEFAULT: "#dc2626",
      },
      neutral: {
        darkest: "#4F4A4A",
        darker: "#686464",
        dark: "#9B9B9B",
        DEFAULT: "#B4B4B4",
        light: "#CECECE",
        lighter: "#E7E7E7",
        lightest: "#F5F5F5",
      },
      base: {
        white: "#F1F5F9",
        black: "#1B1B1C",
      },
      black: "#000000",
      white: "#ffffff",
    },

    extend: {
      ringColor: {
        DEFAULT: "#092E58",
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite', // Define a custom animation called 'spin-slow'
      },
    },
  },
  plugins: [],
};
