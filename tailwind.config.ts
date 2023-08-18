import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily:{
        poppins:[ 'Poppins', 'sans-serif'],
        Outfit:['Poppins', 'sans-serif'],
      },
      textColor:{
        custom1:"#373B5C",
        custom2:"#F0EFFA",
        custom3:"#413B89",
        custom4:"#49454fcc",
        custom5:"#1A1558",
      },
      backgroundColor:{
        custom1:"#f1edfb",
        custom2:"#300078",
      },
    },
  },
  plugins: [],
}
export default config
