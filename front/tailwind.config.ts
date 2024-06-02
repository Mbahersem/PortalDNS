import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'my-blue': '#D4F1F4',
        'my-ablue':'#05445E',
        'my-butt':'#189AB4',
      },
      colors: {
        h1col: '#189AB4',
      },
    },
  },
  plugins: [],
};
export default config;
