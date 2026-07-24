import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        heroColor: "#150c1c",
        greenColor: "#B3EB16",
        eventBgColor: "#1C1C1C",
      },
      fontFamily: {
        helveticaNeue: ["Helvetica Neue", "sans-serif"],
        bodoniseventytwo: ["bodoniseventytwo", "sans-serif"],
        humaneMedium: ["humaneMedium", "sans-serif"],
        tektur: ["Tektur", "sans-serif"],
      },
    },
  },
} satisfies Config;
