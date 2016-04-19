var path = require('path'),
	webpack = require('webpack');

// PATHS
var PATHS = {
	app: __dirname,
	publicPath: __dirname + '/dist/',
	bower: __dirname + '/bower_components'
};

module.exports = {
	// modulesDirectories: ["web_loaders", "web_modules", "node_loaders", "../node_modules"],
	context: PATHS.app,
	resolve: {
		// 现在可以写 require('file') 代替 require('file.js')
		extensions: ['', '.js', '.json', '.vue']
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: "style!css?sourceMap"
		}, {
			test: /\.js$/,
			loader: 'babel',
			// exclude: /node_modules|bower_components/
		}, {
			test: /\.html$/,
			loader: 'raw'
		}, {
			test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
			loader: 'url-loader?limit=8192'
		}, {
			test: /\.vue$/,
			loader: 'vue-loader'
		}, ]
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		// uncomment for production. comment out during dev
		new webpack.optimize.UglifyJsPlugin({
			mangle: false
		})
	],
	devtool: 'sourcemap',
	devServer: {
		historyApiFallback: true,
		stats: {
			chunkModules: false,
			colors: true
		},
		contentBase: __dirname
	}
};