var gulp = require("gulp");
var browserSync = require("browser-sync");
var plumber = require("gulp-plumber");
var autoPrefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");
var connect = require("gulp-connect-php");
//------------------------------------------------------------
//
// DEFAULT TASK
//
//------------------------------------------------------------
const task_browser_sync = function() { 
	browserSync.init({
       proxy: "localhost"
    });
};

const task_reload = function() {
	browserSync.reload();
};

const task_html = function() {
	gulp.src(["./htdocs/**/*html"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
};

const task_sass = function() {
	gulp.src(["./htdocs/**/*scss"])
		.pipe(plumber())
		.pipe(sass({
			outputStyle: "expanded"
		}))
		.pipe(gulp.dest("./htdocs/"))
		.pipe(browserSync.reload({stream:true}));
};

const task_php = function() {
	gulp.src(["./htdocs/**/*php"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
};

const task_javascript = function() {
	gulp.src(["./htdocs/**/*js"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
};

const task_watch = function() {
	//html
	gulp.watch("./htdocs/**/*html").on("change", task_html);
	gulp.watch("./htdocs/**/*html").on("add", task_html);
	gulp.watch("./htdocs/**/*html").on("unlink", task_html);

	//php
	gulp.watch("./htdocs/**/*php").on("change", task_php);
	gulp.watch("./htdocs/**/*php").on("add", task_php);
	gulp.watch("./htdocs/**/*php").on("unlink", task_php);

	//sass
	gulp.watch("./htdocs/**/*scss").on("change", task_sass);
	gulp.watch("./htdocs/**/*scss").on("add", task_sass);
	gulp.watch("./htdocs/**/*scss").on("unlink", task_sass);

	//javascript
	gulp.watch("./htdocs/**/*js").on("change", task_javascript);
	gulp.watch("./htdocs/**/*js").on("add", task_javascript);
	gulp.watch("./htdocs/**/*js").on("unlink", task_javascript);
};

gulp.task("default", gulp.parallel(task_browser_sync, task_watch));