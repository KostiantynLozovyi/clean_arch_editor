const path = require('node:path');

module.exports = {
	webpack: {
		alias: {
			'@domain'        : path.resolve(__dirname, 'src/domain'),
			'@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
			'@adapters'      : path.resolve(__dirname, 'src/adapters'),
			'@application'   : path.resolve(__dirname, 'src/application'),
			'@utility'       : path.resolve(__dirname, 'src/utility')
		}
	}
};
