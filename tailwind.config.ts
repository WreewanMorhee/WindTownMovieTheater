import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      keyframes: {
        skeleton: {
          'from': {opacity: '0.1'},
          'to': {opacity: '0.5'},
        },
        loading: {
          'from': {transform: 'translate(-50%, -50%) rotate(0)'},
          'to': {transform: 'translate(-50%, -50%) rotate(360deg)'},
        },
        loading2: {
          'from': {transform: 'rotate(0)'},
          'to': {transform: 'rotate(360deg)'},
        },
        flip: {
          'from': {transform: 'rotateY(90deg)'},
          'to': {transform: 'rotate(0)'},
        },
      },
      screens: {
        'fone': {'max': '1099px'},
        'desk': '1100px',
      }
    },
  },
  plugins: [],
} satisfies Config;
