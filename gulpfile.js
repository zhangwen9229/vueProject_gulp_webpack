var gulp = require('gulp');
var wstream = require('webpack-stream');
var path = require("path");
var named = require('vinyl-named');
var clean = require('gulp-clean');
var gutil = require("gulp-util");
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack"),
	HtmlWebpackPlugin = require('html-webpack-plugin');
var templateurl = path.join(__dirname, 'index.html');

var appList = ['./src/app.js'];

gulp.task('default', ['clean-scripts', 'webpack', "webpack-dev-server"], function() {

});

gulp.task("webpack-dev-server", function(callback) {
	// modify some webpack config options
	// var myConfig = Object.create(getConfig());
	// myConfig.devtool = "eval";
	// myConfig.debug = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(getConfig({
		cache: false,
		debug: true,
		entry: {
			app: appList
		},
		output: {
			path: path.join(__dirname, "/dist"),
			filename: '[name].js',
		},
		plugins: [
			new webpack.optimize.DedupePlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
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
				template: templateurl,
				inject: true
			})
		],
	})), {
		publicPath: path.join(__dirname, "/dist"),
		stats: {
			colors: true
		}
	}).listen(9000, "localhost", function(err) {
		if (err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:9000/webpack-dev-server/index.html");
		callback();
	});
});

gulp.task('webpack', function(cb) {
	return gulp.src(appList)
		.pipe(named())
		.pipe(wstream(getConfig({
			watch: true,
			devtool: 'source-map'
		})))
		.pipe(gulp.dest('dist'));
	// return gulp.src('src/app.js')
	// 	.pipe(webpack({
	// 		watch: true,
	// 		module: {
	// 			loaders: [{
	// 				test: /\.css$/,
	// 				loader: 'style!css'
	// 			}, ],
	// 		},
	// 	}))
	// 	.pipe(gulp.dest('dist/'));
})

gulp.task('clean-scripts', function() {
	return gulp.src('dist/*.*', {
			read: false
		})
		.pipe(clean());
});


gulp.task('init', function() {
	return gulp.src(mapFiles(appList, 'js'))
		.pipe(named())
		.pipe(webpack(getConfig()))
		.pipe(gulp.dest('dist/'));
})

/**
 * @private
 *  获取配置文件
 */
function getConfig(opt) {

	var config = require("./webpack.config.js");
	// console.log(JSON.stringify(config));
	// var config = {
	// 	module: {
	// 		loaders: [{
	// 			test: /\.css$/,
	// 			loader: 'style-loader!css-loader'
	// 		}, {
	// 			test: /\.styl$/,
	// 			loader: 'style-loader!css-loader!stylus-loader'
	// 		}, {
	// 			//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
	// 			test: /\.(png|jpg)$/,
	// 			loader: 'url-loader?limit=8192!file-loader?name=img/[hash].[ext]'
	// 		}, {
	// 			test: /\.vue$/,
	// 			loader: 'vue-loader'
	// 		}, {
	// 			test: /\.js$/,
	// 			loader: 'babel'
	// 		}]
	// 	}
	// }

	if (!opt) {
		return config;
	}
	for (var i in opt) {
		config[i] = opt[i];
	}
	return config;
}

/**
 * @private
 */
function mapFiles(list, extname) {
	return list.map(function(app) {
		return 'src/' + app + '.' + extname;
	})
}