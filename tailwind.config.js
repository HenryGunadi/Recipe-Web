/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        workSans: ["Work Sans", "sans-serif"],
      },
      height: {
        "1/4-screen": "25vh",
        "1/2-screen": "50vh",
        "3/4-screen": "75vh",
        "90vh": "90vh",
      },
      width: {
        "1/2-screen": "50vw",
        "3/4-screen": "75vwp",
      },
      screens: {
        phones: "576px",
        tablets: "768px",
        laptops: "992px",
        desktops: "1200px",
        "desktops-xl": "1500px",
      },
    },
  },
  plugins: [],
};
