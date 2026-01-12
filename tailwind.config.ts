import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#0054a6",
                    dark: "#003d7a",
                    light: "#3376b8",
                },
                background: "#ffffff",
                foreground: "#1a1a1a",
            },
            fontFamily: {
                sans: ["var(--font-jakarta)", "sans-serif"],
                serif: ["var(--font-playfair)", "serif"],
            }
        },
        animation: {
            'dash': 'dash 20s linear infinite',
        },
        keyframes: {
            dash: {
                '0%': { strokeDashoffset: '1000' },
                '100%': { strokeDashoffset: '0' },
            }
        }
    },
    plugins: [],
};
export default config;
