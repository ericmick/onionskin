const path = require('path');
module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "/dist"),
		publicPath: "/public/",
		filename: "index.js"
	},
	module: {
		loaders: [
			{
				loader: "babel",
				test: /\.js$/,
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	devtool: "source-map"
};