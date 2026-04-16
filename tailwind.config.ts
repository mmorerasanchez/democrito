import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "Poppins", "Inter", "system-ui", "sans-serif"],
        body: ["Satoshi", "Outfit", "Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', "Consolas", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1.4" }],
        xs: ["0.75rem", { lineHeight: "1.4" }],
        sm: ["0.8125rem", { lineHeight: "1.5" }],
        base: ["0.875rem", { lineHeight: "1.6" }],
        md: ["1rem", { lineHeight: "1.5" }],
        lg: ["1.125rem", { lineHeight: "1.5" }],
        xl: ["1.375rem", { lineHeight: "1.4" }],
        "2xl": ["1.5rem", { lineHeight: "1.3" }],
        "3xl": ["2.25rem", { lineHeight: "1.2" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        "foreground-muted": "hsl(var(--foreground-muted))",
        "foreground-subtle": "hsl(var(--foreground-subtle))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          muted: "hsl(var(--accent-muted))",
          subtle: "hsl(var(--accent-subtle))",
        },
        "warm-dark": "hsl(var(--warm-dark))",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          bg: "hsl(var(--success-bg) / 0.1)",
          border: "hsl(var(--success-border) / 0.3)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          bg: "hsl(var(--warning-bg) / 0.1)",
          border: "hsl(var(--warning-border) / 0.3)",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          bg: "hsl(var(--error-bg) / 0.1)",
          border: "hsl(var(--error-border) / 0.3)",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          bg: "hsl(var(--info-bg) / 0.1)",
          border: "hsl(var(--info-border) / 0.3)",
        },
        category: {
          teal: "hsl(var(--category-teal))",
          amber: "hsl(var(--category-amber))",
          emerald: "hsl(var(--category-emerald))",
          orange: "hsl(var(--category-orange))",
          violet: "hsl(var(--category-violet))",
          rose: "hsl(var(--category-rose))",
          blue: "hsl(var(--category-blue))",
          red: "hsl(var(--category-red))",
          gold: "hsl(var(--category-gold))",
        },
        status: {
          draft: "hsl(var(--status-draft))",
          testing: "hsl(var(--status-testing))",
          production: "hsl(var(--status-production))",
          archived: "hsl(var(--status-archived))",
        },
      },
      spacing: {
        header: "var(--header-height)",
        "sidebar-w": "var(--sidebar-width)",
        "sidebar-collapsed": "var(--sidebar-collapsed)",
        "right-panel": "var(--right-panel)",
      },
      zIndex: {
        dropdown: "50",
        sticky: "100",
        overlay: "200",
        modal: "300",
        toast: "400",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "ai-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "ai-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "bulk-bar-in": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ai-pulse": "ai-pulse 1.4s ease-in-out infinite",
        "ai-cursor": "ai-cursor 1s step-end infinite",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "bulk-bar-in": "bulk-bar-in 0.3s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
