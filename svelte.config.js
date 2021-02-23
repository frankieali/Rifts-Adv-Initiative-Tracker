// svelte.config.js
const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  onwarn: (warning, handler) => {
    // e.g. don't warn on <marquee> elements, cos they're cool
    if (warning.code === 'css-unused-selector') return;

    // let Rollup handle all other warnings normally
    handler(warning);
  },
  preprocess: sveltePreprocess({
    scss: {
      includePaths: ['./src/theme','./node-modules/svelte-materialify/packages'],
    },
  }),
};