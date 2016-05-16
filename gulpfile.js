var gulp = require('gulp');
var wstream = require('webpack-stream');
var path = require("path");
var named = require('vinyl-named');
var clean = require('gulp-clean');
var gutil = require("gulp-util");
var open = require('gulp-open');
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack"),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');
var templateurl = "./src/index.html";
var publicPath = path.resolve(__dirname, '/dist/');



gulp.task('default', ["webpack-dev-server", 'uri'], function() {

});

gulp.task("webpack-dev-server", function(callback) {
	var compiler = webpack(getConfig({
		cache: true,
		debug: true,
		lazy: false,
		watch: true,
		devtool: 'source-map',
	}, true));
	// Start a webpack-dev-server
	new WebpackDevServer(compiler, {
		inline: true,
		publicPath: "/",
		// stats: {
		// 	colors: true
		// },
		hot: true,
		historyApiFallback: true,
		progress: true,
		stats: {
			chunkModules: false,
			colors: true
		},
		contentBase: publicPath

	}).listen(9000, "localhost", function(err) {
		if (err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:9000/webpack-dev-server/index.html");
		callback();
	});
});

gulp.task('webpack', function(cb) {
	return gulp.src("./src/app.js")
		.pipe(named())
		.pipe(wstream(getConfig()))
		.pipe(gulp.dest('dist'));
	// return gulp.src('src/app.js')
	//  .pipe(webpack({
	//    watch: true,
	//    module: {
	//      loaders: [{
	//        test: /\.css$/,
	//        loader: 'style!css'
	//      }, ],
	//    },
	//  }))
	//  .pipe(gulp.dest('dist/'));
})

gulp.task('uri', function() {
	gulp.src(__filename)
		.pipe(open({
			uri: 'http://127.0.0.1:9000'
		}));
});

gulp.task('clean-scripts', function() {
	return gulp.src('dist/*.*', {
			read: false
		})
		.pipe(clean());
});


gulp.task('init', ['clean-scripts', 'webpack'], function() {

})

/**
 * @private
 *  获取配置文件
 */
function getConfig(opt, dev) {

	var config = require("./webpack.config.js");

	if (!opt) {
		return config;
	}
	for (var i in opt) {
		config[i] = opt[i];
	}
	if (dev) {
		// config['entry']["app"].unshift("webpack-dev-server/client?http://localhost:9000/", "webpack/hot/dev-server");
		config['plugins'].push(new webpack.optimize.DedupePlugin());
		config['plugins'].push(new webpack.HotModuleReplacementPlugin());
		config['plugins'].push(new webpack.NoErrorsPlugin());
	} else {
		// uncomment for production. comment out during dev
		config['plugins'].push(new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}));
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