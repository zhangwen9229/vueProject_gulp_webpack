var path = require('path'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

// PATHS
var PATHS = {
	app: __dirname,
	publicPath: __dirname + '/dist/',
	bower: __dirname + '/bower_components',
	templateurl : './src/index.html'
};

module.exports = {
	// modulesDirectories: ["web_loaders", "web_modules", "node_loaders", "../node_modules"],
	context: PATHS.app,
	resolve: {
		// 现在可以写 require('file') 代替 require('file.js')
		extensions: ['', '.js', '.json', '.vue'],
		// fallback: [path.join(__dirname, './node_modules')],
		// alias: {
		// 	'src': path.resolve(__dirname, './src'),
		// }
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader","css?sourceMap","autoprefixer-loader")
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
			loader: 'vue'
		}, ]
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin("[name].css?[contenthash]"),
		new webpack.optimize.CommonsChunkPlugin({
			name:"vendors",
			filename:"vendors.js"
		}),
		// uncomment for production. comment out during dev
		// new webpack.optimize.UglifyJsPlugin({
		// 	mangle: false,
		// 	compress: {
		// 		warnings: false
		// 	}
		// }),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: PATHS.templateurl,
			inject: true
		})
	],
	devtool: 'sourcemap',
	babel:{
		presets:['es2015','stage-0'],
		// plugins:['transform-runtime']
	}
	// devServer: {
	// 	historyApiFallback: true,
	// 	stats: {
	// 		chunkModules: false,
	// 		colors: true
	// 	},
	// 	contentBase: PATHS.app
	// }
};