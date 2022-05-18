module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: {
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`
    ],
    safelist: [
    	'bg-purple-300',
    	'bg-blue-300',
    	'bg-gray-300',
	'bg-green-300'
    ]
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
