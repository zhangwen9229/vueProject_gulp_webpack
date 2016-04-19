var gulp = require('gulp');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');

var appList = ['app'];

gulp.task('default', function() {
	return gulp.src(mapFiles(appList, 'js'))
		.pipe(named())
		.pipe(webpack(getConfig({
			watch: true
		})))
		.pipe(gulp.dest('dist/'));
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
	var config = {
		module: {
			loaders: [{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}, {
				test: /\.styl$/,
				loader: 'style-loader!css-loader!stylus-loader'
			}, {
				//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192!file-loader?name=img/[hash].[ext]'
			}, {
				test: /\.vue$/,
				loader: 'vue-loader'
			}]
		}
	}

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