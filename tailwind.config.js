/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
  ],
  theme: {
    extend: {
      colors: {
        "platinum":  "#e7ecef", // 231,236,239
        "dusk-blue": "#274c77", // 39,76,119
        "steel-blue":"#6096ba", // 96,150,186
        "icy-blue":   "#a3cef1", // 163,206,241
        "grey-olive": "#8b8c89", // 139,140,137
      },
    },
  },
  plugins: [],
};
