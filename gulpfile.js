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
gulp.task("browser-sync" , function() { 
	browserSync.init({
       proxy: "localhost"
    });
});

gulp.task("reload" , function() {
	browserSync.reload();
});

gulp.task("html", function() {
	gulp.src(["./htdocs/tab/**/*html"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("sass" , function() {
	gulp.src(["./htdocs/tab/**/*scss"])
		.pipe(plumber())
		.pipe(sass({
			outputStyle: "expanded"
		}))
		.pipe(gulp.dest("./htdocs/tab/"))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("php" , function() {
	gulp.src(["./htdocs/tab/**/*php"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("javascript" , function() {
	gulp.src(["./htdocs/tab/**/*js"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("watch" , function() {
	gulp.watch(["./htdocs/tab/**/*html"] , ["html"]);
	gulp.watch(["./htdocs/tab/**/*php"] , ["php"]);
	gulp.watch(["./htdocs/tab/**/*scss"] , ["sass"]);
	gulp.watch(["./htdocs/tab/**/*js"] , ["javascript"]);
});

gulp.task("default" , ["browser-sync" , "watch"]); 