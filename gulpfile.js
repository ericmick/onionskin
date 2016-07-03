const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack-stream');

gulp.task('assets', function() {
	return gulp.src('public/*')
		.pipe(gulp.dest('dist/'));
});

gulp.task('javascript', function() {
	return gulp.src('src/index.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('dist/'));
});

gulp.task('dev', function(done) {
	gulp.watch('public/*', ['assets']);
	const WebpackDevServer = require("webpack-dev-server");
	webpack(require('./webpack.dev.config.js')).run(function(err, stats) {
		if (err) {
			throw new gutil.PluginError("dev", err);
		}
		gutil.log("[dev]", stats.toString({colors: true}));
		done();
	});
});

gulp.task('default', ['assets', 'javascript']);