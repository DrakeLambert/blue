var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: './src/index.jsx',
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
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body'
		})
	],
	devServer: {
		historyApiFallback: true
	},
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/'
	}
}