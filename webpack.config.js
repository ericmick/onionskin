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
				loader: "babel-loader",
				exclude: /node_modules/,
				test: /\.jsx?$/,
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	},
	devtool: "source-map",
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};