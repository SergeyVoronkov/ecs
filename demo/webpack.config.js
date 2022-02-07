const path = require('path');
module.exports = {
	entry: './index.ts',
	mode: "development",
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.index.js',
		// path: path.resolve(__dirname, 'dist'),
	},
};