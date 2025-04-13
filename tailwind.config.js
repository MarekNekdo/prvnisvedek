module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'pulse-fast': 'pulse 0.7s infinite',
      },
    },
  },
  plugins: [],
};
