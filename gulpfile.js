var gulp = require('gulp');
var wstream = require('webpack-stream');
var path = require("path");
var named = require('vinyl-named');
var clean = require('gulp-clean');
var gutil = require("gulp-util");
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack"),
  HtmlWebpackPlugin = require('html-webpack-plugin');
var templateurl = "./src/index.html";
var publicPath =  path.resolve(__dirname, '/dist/');

var appList = ['./src/app.js'];

gulp.task('default', [ "webpack-dev-server"], function() {

});

gulp.task("webpack-dev-server", function(callback) {
  // modify some webpack config options
  // var myConfig = Object.create(getConfig());
  // myConfig.devtool = "eval";
  // myConfig.debug = true;
  appList.unshift("webpack-dev-server/client?http://localhost:9000/", "webpack/hot/only-dev-server");
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(getConfig({
    // cache: true,
    // debug: true,
  //         lazy: false,
           // hot: true,
    entry: {
      app: appList,
      vendors:[
        'vue-router'
      ]
    },
    output: {
      path: publicPath,
      filename: '[name].js',
    },
    // plugins: [
    //  new webpack.optimize.DedupePlugin(),
    //  new webpack.HotModuleReplacementPlugin(),
    //  new webpack.NoErrorsPlugin(),
    //  // uncomment for production. comment out during dev
    //  // new webpack.optimize.UglifyJsPlugin({
    //  //  mangle: false,
    //  //  compress: {
    //  //    warnings: false
    //  //  }
    //  // }),
    //  // https://github.com/ampedandwired/html-webpack-plugin
    //  new HtmlWebpackPlugin({
    //    filename: 'index.html',
    //    template: templateurl,
    //    inject: true
    //  })
    // ],
    devServer: {
      historyApiFallback: true,
      stats: {
        chunkModules: false,
        colors: true
      },
      contentBase: "/"
    }
  })), {
    publicPath:"/" ,
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
      // watch: true,
      devtool: 'source-map',
        entry: {
          app:appList,
          vendors:[
          'vue-router'
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

gulp.task('clean-scripts', function() {
  return gulp.src('dist/*.*', {
      read: false
    })
    .pipe(clean());
});


gulp.task('init', ['clean-scripts','webpack'],function() {
  
})

/**
 * @private
 *  获取配置文件
 */
function getConfig(opt) {

  var config = require("./webpack.config.js");
  // console.log(JSON.stringify(config));
  // var config = {
  //  module: {
  //    loaders: [{
  //      test: /\.css$/,
  //      loader: 'style-loader!css-loader'
  //    }, {
  //      test: /\.styl$/,
  //      loader: 'style-loader!css-loader!stylus-loader'
  //    }, {
  //      //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
  //      test: /\.(png|jpg)$/,
  //      loader: 'url-loader?limit=8192!file-loader?name=img/[hash].[ext]'
  //    }, {
  //      test: /\.vue$/,
  //      loader: 'vue-loader'
  //    }, {
  //      test: /\.js$/,
  //      loader: 'babel'
  //    }]
  //  }
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