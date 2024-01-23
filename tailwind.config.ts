import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
      },
      colors: {
        primary: "#a87133",
        dark: "#764f24",
        darker: "#54391a",
        lighter: "#dcc6ad",
        light: "#c29c70",
        lightest: "#f6f1eb",
        muted: "hsl(var(--muted-foreground))",
       foreground: "hsl(var(--foreground))"
      },
    },
  },
  plugins: [],
} satisfies Config;
