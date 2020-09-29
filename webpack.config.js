var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: /src/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'
						],
						plugins: [
							[
								'@babel/plugin-transform-runtime',
								{
									regenerator: true,
									corejs: 3
								}
							]
						]
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body'
		})
	],
	devServer: {
		contentBase: './dist'
	},
	output: {
		filename: '[name].[contenthash].js'
	}
}