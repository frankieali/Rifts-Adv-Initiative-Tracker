import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from "svelte-preprocess";
import visualizer from 'rollup-plugin-visualizer';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'es',
		name: 'app',
		// file: 'public/build/bundle.js'
    dir: 'public/build'
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
        css: css => {
          css.write('public/build/bundle.css')
        },
      },
      emitCss: false,
      // // cascade: false,
      // preprocess: preprocess({
      //   sass: {
      //     includePaths: [
      //       'src/theme',
      //       './node_modules'
      //     ]
      //   }
      // })
      onwarn: (warning, handler) => {
        // e.g. don't warn on <marquee> elements, cos they're cool
        if (warning.code === 'css-unused-selector') return;

        // let Rollup handle all other warnings normally
        handler(warning);
      },
      preprocess: sveltePreprocess({
        defaults: {
          style: 'scss'
        },
        scss: {
          // prependData: `@import 'src/theme/material-theme';`,
          includePaths: ['src/theme','node-modules'],
        }
      }),
      // enable run-time checks when not in production
      // dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance

		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		// css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
    commonjs(),

    // https://www.npmjs.com/package/rollup-plugin-visualizer
    visualizer({
      open: false,
      template: "treemap", //Which digram type to use: sunburst, treemap, network
      gzipSize: true,
      brotliSize: true
    }),
    
    // Once in the "client:" section, and again in the "server:" section.
    // postcss({
    //   extensions: ['.scss', '.sass'],
    //   extract: true,
    //   minimize: true,
    //   use: [
    //     ['sass', {
    //       includePaths: [
    //         './src/theme',
    //         './node_modules'
    //       ]
    //     }]
    //   ]
    // }),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
