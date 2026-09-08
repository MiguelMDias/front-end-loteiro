/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta "estrada ao entardecer" — Cavalcante > Brasília
        clay: {
          DEFAULT: '#C1502E', // terra vermelha da chapada
          dark: '#9A3E24',
          light: '#DD8B6E',
        },
        dusk: {
          DEFAULT: '#223A5E', // céu no fim de tarde na BR
          dark: '#152840',
          light: '#3C5A85',
        },
        sand: {
          DEFAULT: '#EFE6D8', // poeira / cerrado seco
          dark: '#E1D3BC',
        },
        ink: '#1B1712', // asfalto / texto principal
        gold: '#E3A72F', // faixa amarela de pista
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
