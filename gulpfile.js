var gulp = require('gulp');
var args = require('yargs').argv;
var browserify = require('browserify');
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('test-js', function() {
	log('Testing js files with JSHint and JSCS');

	return gulp.src(config.everyjs)
			.pipe($.if(args.show, $.print()))
			.pipe($.jscs())
			.pipe($.jshint())
			.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
			.pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function() {
	log('Compiling ' + config.styleCompiler + ' --> CSS'); //todo

	return gulp.src(config.style)
			.pipe($.plumber())
			.pipe($.sass()) //todo
			.pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
			.pipe(gulp.dest(config.buildStyle));
});

gulp.task('fonts', ['clean-fonts'], function() {
	log('Copying fonts');

	return gulp.src(config.fonts)
			.pipe(gulp.dest(config.buildFonts));
});

gulp.task('images', ['clean-images'], function() {
	log('Copying and compressing the images');

	return gulp.src(config.images)
			.pipe($.imagemin({optimizationLevel: 4}))
			.pipe(gulp.dest(config.buildImages));
});

gulp.task('clean', function() {
	var delAll = [].concat(config.build, config.tmpFiles);
	clean(delAll);
});

gulp.task('clean-images', function() {
	clean(config.buildImages);
});

gulp.task('clean-fonts', function() {
	clean(config.buildFonts);
});

gulp.task('clean-styles', function() {
	clean(config.buildStyle);
});

gulp.task('clean-code', function() {
	var files = [].concat(
		config.cleanjs,
		config.htmlBuild
	);
	clean(files);
});

// Run wiredep first, then inject
gulp.task('wiredep', ['styles'], function() {
	log('Injecting the bower components into html');
	var options = config.wiredepOptions();
	var wiredep = require('wiredep').stream;

	return gulp.src(config.htmlForInject)
			.pipe(wiredep(options))
			.pipe(gulp.dest(config.srcTemp));
});

gulp.task('inject', ['wiredep'], function() {
	log('Injecting all the needed components');
	var headFilter = $.filter('head.html'),
		defaultFilter = $.filter('default.html');

	return gulp.src(config.srcTempFiles)
		.pipe($.inject(gulp.src(config.buildCss)))
		.pipe($.inject(gulp.src(config.everyjs)))	// serve!!!
		.pipe(gulp.dest(config.tmp))	// $.filter()
		.pipe($.callback(tempFolder));
});

// hbs-tmpl
gulp.task('tmpl', function() {
	log('Rendering templates to a js file');

	gulp.src(config.templates)
		.pipe($.handlebars())
		.pipe($.wrap('Handlebars.template(<%= contents %>)'))
		.pipe($.declare({
			root: 'module.exports',
			noRedeclare: true
		}))
		.pipe($.concat('templates.js'))
		.pipe(gulp.dest(config.jsClasses));
});

// browser-sync


// watch
gulp.task('watch', function() {
	gulp.watch([
		config.htmlSrc,
		config.templates,
		config.cleanjs,
		config.allFiles
	], ['wiredep', 'inject'], browserSync.reload);
});

// test -> testing the code

// jekyll
gulp.task('jekyll:dev', $.shell.task('jekyll build'));

// build-dev -> build for development

// build-prod -> build for production

// serve -> set up local server from serve folder

//////////////////////////////////

function clean(path) {
	log('Cleaning out: ' + $.util.colors.blue(path));
	del(path);
}

function log(msg) {
	if(typeof(msg) === 'object') {
		for (var prop in msg) {
			if (msg.hasOwnProperty(prop)) {
				$.util.log($.util.colors.yellow(msg[prop]));
			}
		}
	} else {
		$.util.log($.util.colors.yellow(msg));
	}
}

function tempFolder() {
	clean(config.index);
	gulp.src(config.tmpIndex)
		.pipe(gulp.dest(config.build));
	clean(config.tmpIndex);
}