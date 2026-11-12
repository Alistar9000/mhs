/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      
      fontFamily: {
        sans: ["IranSans", "ui-sans-serif", "system-ui"],
      },
      boxShadow:{
        card:'0 6px 24px rgba(17,24,39,.06)',
      },
      colors:{
        bg:'#F4F6FB',
        muted:'#6B7280',
        good: { DEFAULT: '#16A34A', soft: '#DCFCE7' },
        bad:  { DEFAULT: '#DC2626', soft: '#FEE2E2' },
      },
      borderRadius:{ xl2:'18px'}
    },
  },
  plugins: [],
}

