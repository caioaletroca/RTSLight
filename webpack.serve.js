const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'cheap-source-map',
	output: {
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development'),
			}
		}),
		new BrowserSyncPlugin({
			host: process.env.IP || 'localhost',
      		port: process.env.PORT || 3000,
			server: {
				baseDir: ['./', './dist']
			}
	    }),
		new HtmlWebpackPlugin({
			title: 'RTS Game',
			template: 'src/app.html',
			//favicon: 'www/img/favicon.ico',
		}),
		new BundleAnalyzerPlugin(),
	],
});