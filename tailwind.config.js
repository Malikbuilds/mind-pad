// Tailwind CSS configuration file
module.exports = {
  darkMode: ["class", "dark"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./components/ui/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "hsl(var(--accent))",
      "accent-foreground": "hsl(var(--accent-foreground))",
      secondary: "oklch(var(--secondary))",
      "secondary-foreground": "oklch(var(--secondary-foreground))",
      background: "hsl(0, 0%, 100%)", // light mode white
      // Add others as needed
        },
      },
    },
  }