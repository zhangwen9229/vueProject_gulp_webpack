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

var appList = ['./src/app.js'];

gulp.task('default', ["webpack-dev-server", 'uri'], function() {

});

gulp.task("webpack-dev-server", function(callback) {
	// modify some webpack config options
	// var myConfig = Object.create(getConfig());
	// myConfig.devtool = "eval";
	// myConfig.debug = true;
	appList.unshift("webpack-dev-server/client?http://localhost:9000/", "webpack/hot/dev-server");
	var compiler = webpack(getConfig({
		// cache: true,
		// debug: true,
		//         lazy: false,
		watch: true,
		entry: {
			app: appList,
			vendors: [
				'vue-router'
			]
		},
		output: {
			path: publicPath,
			filename: '[name].js',
		},
		devServer: {
			historyApiFallback: true,
			stats: {
				chunkModules: false,
				colors: true
			},
			contentBase: publicPath,
			open: true
		}
	}, true));
	// var hotMiddleware = require('webpack-hot-middleware')(compiler);
	// Start a webpack-dev-server
	new WebpackDevServer(compiler, {
		hot: true,
		inline: true,
		publicPath: "/",
		stats: {
			colors: true
		}
	}).listen(9000, "localhost", function(err) {
		if (err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:9000/webpack-dev-server/index.html");
		// compiler.plugin('compilation',function(compilation){
		// 	compilation.plugin('html-webpack-plugin-after-emit'),function(data,cb){
		// 		hotMiddleware.publish({action:"reload"});
		// 	}
		// })
		callback();
	});
});

gulp.task('webpack', function(cb) {
	return gulp.src(appList)
		.pipe(named())
		.pipe(wstream(getConfig({
			// watch: true,
			devtool: 'source-map',
			entry: {
				app: appList,
				vendors: [
					'vue-router',
					'vue'
				]
			},
		})))
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
		config['plugins'].push(new webpack.optimize.DedupePlugin());
		config['plugins'].push(new webpack.HotModuleReplacementPlugin());
		config['plugins'].push(new webpack.NoErrorsPlugin());
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