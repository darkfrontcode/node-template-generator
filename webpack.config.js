const path = require('path')

module.exports = {
	entry: {

		index: [
			path.join(__dirname, './lib/source/index.ts')
		],
		
	},
	output: {

		path: path.join(__dirname, './lib/build'),
		filename: '[name].js',

	},
	module: {

		rules: [
			{
				test: /\.ts?$/,
				use: [ 'awesome-typescript-loader' ]
			},
			{
				test: /\.js$/,
				use: [ 'source-map-loader' ],
				enforce: 'pre'
			},
		]

	},
	node: {
		fs: 'empty',
		readline: 'empty'
	},
	devtool: "source-map",
	resolve: {
		extensions: ['.ts']
	}
}