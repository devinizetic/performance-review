/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      height: {
        'screen-minus-header': 'calc(100vh - 3rem)'
      },
      colors: {
        primary: '#8D408D',
        secondary: '#5090CC',
        secondaryAlt: '#3C7CBB',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))'
        }
      }
    }
  },
  plugins: []
};
