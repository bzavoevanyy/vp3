/* --------- plugins --------- */

var
	gulp        = require('gulp'),
	compass     = require('gulp-compass'),
	jade        = require('gulp-jade'),
	browserSync = require('browser-sync').create(),
	uglify      = require('gulp-uglify'),
	rename      = require("gulp-rename"),
	plumber     = require('gulp-plumber'),
	concat      = require('gulp-concat'),
	order 		= require('gulp-order');

/* --------- paths --------- */

var
	paths = {
		jade : {
			location    : '- dev/markups/**/*.jade',
			compiled    : '- dev/markups/_pages/*.jade',
			destination : 'dist/.'
		},

		images : {
			location    : '- dev/img/**/*.{jpeg,jpg,png,gif,svg}',
			destination : 'dist/img/.'
		},

		fonts : {
			location    : '- dev/fonts/**/*.{eot,svg,ttf,woff,woff2}',
			destination : 'dist/fonts/.'
		},

		favicon : {
			location    : '- dev/favicon/**/*.{png,xml,json,svg,ico}',
			destination : 'dist/favicon/.'
		},

		scss : {
			location    : '- dev/styles/**/*.scss',
			entryPoint  : 'dist/css/main.css'
		},

		compass : {
			configFile  : 'config.rb',
			cssFolder   : 'dist/css',
			scssFolder  : '- dev/styles',
			imgFolder   : '- dev/img'
		},

		js : {
			location    	: '- dev/scripts/*.js',
			plugins     	: '- dev/scripts/_plugins/*.js',
			pluginsDest		: '- dev/scripts/_plugins/',
			destination 	: 'dist/js',
			dest_vendors	: 'dist/js/_vendors',
			jqueryFile		: 'bower_components/jquery/dist/jquery.js',
			jqueryUIFile	: 'bower_components/jquery-ui/jquery-ui.js',
			jqueryFileUp	: 'bower_components/blueimp-file-upload/js/jquery.fileupload.js',
			order			: ['jquery.js', 'jquery-ui.js', 'jquery.fileupload.js']
		},

		browserSync : {
			baseDir : './dist',
			watchPaths : [
				'dist/*.html',
				'dist/css/*.css',
				'dist/js/**/*.js',
				'dist/img/**/*.{jpg,jpeg,gif,png,svg}',
				'dist/fonts/**/*.{eot,svg,ttf,woff,woff2}',
				'dist/favicon/**/*.{png,xml,json,svg,ico}'
			]
		}
	};

/* --------- jade --------- */

gulp.task('jade', function() {
	gulp.src(paths.jade.compiled)
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t'
		}))
		.pipe(gulp.dest(paths.jade.destination));
});

/* --------- images copy --------- */

gulp.task('images', function() {
	gulp.src(paths.images.location)
			.pipe(plumber())
			.pipe(gulp.dest(paths.images.destination));
});

/* --------- fonts copy --------- */

gulp.task('fonts', function() {
	gulp.src(paths.fonts.location)
			.pipe(plumber())
			.pipe(gulp.dest(paths.fonts.destination));
});

/* --------- favicon copy --------- */

gulp.task('favicon', function() {
	gulp.src(paths.favicon.location)
			.pipe(plumber())
			.pipe(gulp.dest(paths.favicon.destination));
});

/* --------- scss-compass --------- */

gulp.task('compass', function() {
	gulp.src(paths.scss.location)
		.pipe(plumber())
		.pipe(compass({
			config_file: paths.compass.configFile,
			css: paths.compass.cssFolder,
			sass: paths.compass.scssFolder,
			image: paths.compass.imgFolder
		}));
});

/* --------- browser sync --------- */

gulp.task('sync', function() {
	browserSync.init({
		port: 9000,
		server: {
			baseDir: paths.browserSync.baseDir
		}
	});
});

/* --------- JQuery --------- */

gulp.task('jquery', function() {
	return gulp.src(paths.js.jqueryFile)
			.pipe(gulp.dest(paths.js.pluginsDest));
});
/* --------- JQueryUI --------- */

gulp.task('jqueryUI', function() {
	return gulp.src(paths.js.jqueryUIFile)
		.pipe(gulp.dest(paths.js.pluginsDest));
});

/* --------- JQuery-file-upload --------- */

gulp.task('jquery-file-upload', function() {
	return gulp.src(paths.js.jqueryFileUp)
		.pipe(gulp.dest(paths.js.pluginsDest));
});
/* --------- plugins --------- */

gulp.task('plugins', ['jquery', 'jqueryUI','jquery-file-upload'], function() {
	return gulp.src(paths.js.plugins)
		.pipe(plumber())
		.pipe(order(paths.js.order))
		.pipe(concat('plugins.min.js'))
		.pipe(gulp.dest(paths.js.destination));
});

/* --------- My scripts --------- */

gulp.task('scripts', function() {
	return gulp.src(paths.js.location)
		.pipe(plumber())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.destination));
});

/* --------- watch --------- */

gulp.task('watch', function(){
	gulp.watch(paths.jade.location, ['jade']);
	gulp.watch(paths.scss.location, ['compass']);
	gulp.watch(paths.js.location, ['scripts']);
	gulp.watch(paths.js.plugins, ['plugins']);
	gulp.watch(paths.images.location, ['images']);
	gulp.watch(paths.favicon.location, ['favicon']);
	gulp.watch(paths.fonts.location, ['fonts']);
	gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
});

/* --------- build --------- */
gulp.task('build', ['jade', 'compass', 'plugins', 'scripts', 'images', 'favicon', 'fonts']);

/* --------- default --------- */
gulp.task('default', ['build', 'sync', 'watch']);


/* ------ Pretty error view ------ */
var log = function (error) {
	console.log([
		'',
		"----------ERROR MESSAGE START----------",
		("[" + error.name + " in " + error.plugin + "]"),
		error.message,
		"----------ERROR MESSAGE END----------",
		''
	].join('\n'));
	this.end();
};