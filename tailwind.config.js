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
      'bg-lime-300',
	    'bg-green-300',
      'bg-indigo-300',
      'bg-teal-300',
      'bg-cyan-300',
      'bg-pink-300',
      'bg-orange-300',
      'bg-rose-300',
      'bg-fuschia-300',
      'bg-sky-300',
      'bg-yellow-300',
      'bg-emerald-300',
      'bg-violet-300',
      'bg-purple-700',
      'bg-blue-700',
      'bg-gray-700',
      'bg-green-700',
      'bg-indigo-700',
      'bg-teal-700',
      'bg-cyan-700',
      'bg-pink-700',
      'bg-orange-700',
      'bg-rose-700',
      'bg-fuschia-700',
      'bg-sky-700',
      'bg-yellow-700',
      'bg-emerald-700',
      'bg-violet-700',
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
