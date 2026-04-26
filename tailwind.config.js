/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        entra:      '#7C3AED',
        intune:     '#1D6FEB',
        exchange:   '#0891B2',
        autopilot:  '#4F46E5',
        purview:    '#0D9488',
        azure:      '#0284C7',
        graph:      '#0E7490',
        licensing:  '#C2410C',
        sharepoint: '#0078D4',
        onedrive:   '#0557A5',
        teams:      '#5B5EA6',
        m365apps:   '#D83B01',
      },
      fontFamily: {
        syne: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
