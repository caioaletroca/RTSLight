const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'cheap-source-map',
	output: {
		path: path.resolve(__dirname, 'build')
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development'),
			}
		}),
		new HtmlWebpackPlugin({
			title: 'RTSLight',
			template: 'src/app.html',
			//favicon: 'www/img/favicon.ico',
		}),
		new CleanWebpackPlugin([ 'build' ]),
		new CopyWebpackPlugin([
      		{
      			from: 'assets', to: 'assets'
      		},
    	]),
	],
});