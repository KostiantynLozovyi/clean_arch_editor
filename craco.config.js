const path                     = require('node:path');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
	webpack: {
		alias: {
			'@domain'        : path.resolve(__dirname, 'src/domain'),
			'@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
			'@adapters'      : path.resolve(__dirname, 'src/adapters'),
			'@application'   : path.resolve(__dirname, 'src/application'),
			'@utility'       : path.resolve(__dirname, 'src/utility')
		},
		plugins: [
			new CircularDependencyPlugin({
				// exclude detection of files based on a RegExp
				exclude: /node_modules/,

				// add errors to webpack instead of warnings
				failOnError: true,

				// allow import cycles that include an asyncronous import,
				// e.g. via import(/* webpackMode: "weak" */ './file.js')
				allowAsyncCycles: false,

				// set the current working directory for displaying module paths
				cwd: process.cwd()
			})
		]
	}
};
