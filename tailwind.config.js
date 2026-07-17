/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-neutral': '#09090b',  // zinc-950
        'light-neutral': '#fafafa', // zinc-50
        'brand-indigo': '#6366F1',  // Indigo accent
        'brand-cyan': '#06B6D4',    // Cyan accent
      },
    },
  },
  plugins: [],
};
