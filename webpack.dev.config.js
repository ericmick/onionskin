const config = require('./webpack.config');
module.exports = Object.assign({}, config, {
	hot: true,
	inline: true,
	debug: true
});