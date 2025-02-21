import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // colors: {
      //   primary: "#10635a", // Custom primary color
      //   hoverPrimary: "green", // Custom hover color
      // },
      // transitionProperty: {
      //   default: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
      // },
      boxShadow: {
        hover: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Custom hover shadow
      },
    },
  },
  plugins: [],
}
export default config
