import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        starken: {
          primary: '#4A6B54',
          secondary: '#7A9B84',
          light: '#B8D4BE',
        },
        dark: {
          bg: '#1a1a2e',
          card: '#16213e',
          sidebar: '#0f0f1a',
          text: '#eaeaea',
          muted: '#a0a0a0',
          border: '#2d3748',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
