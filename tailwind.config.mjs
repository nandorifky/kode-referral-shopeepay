/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Outfit', 'sans-serif'],
			},
			colors: {
				shopee: {
					DEFAULT: '#EE4D2D',
					dark: '#d73c1e',
					light: '#FF7355'
				},
				dark: {
					bg: '#050505',
					card: '#171717',
					border: '#262626'
				}
			}
		},
	},
	plugins: [require('@tailwindcss/typography')],
}