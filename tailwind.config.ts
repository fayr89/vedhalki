import type { Config } from 'tailwindcss'

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

function buildColorPalette(name: string) {
  const palette: Record<string, string> = {}
  for (const s of shades) {
    palette[String(s)] = `oklch(var(--${name}-${s}))`
  }
  return palette
}

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: buildColorPalette('background'),
        primary: buildColorPalette('primary'),
        accent: buildColorPalette('accent'),
        secondary: buildColorPalette('secondary'),
        foreground: buildColorPalette('foreground'),
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        label: ['var(--font-label)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
