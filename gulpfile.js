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
	gulp.src(["./skew-image/**/*html"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("sass" , function() {
	gulp.src(["./skew-image/**/*scss"])
		.pipe(plumber())
		.pipe(sass({
			outputStyle: "expanded"
		}))
		.pipe(gulp.dest("./skew-image/"))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("php" , function() {
	gulp.src(["./skew-image/**/*php"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("javascript" , function() {
	gulp.src(["./skew-image/**/*js"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("watch" , function() {
	gulp.watch(["./skew-image/**/*html"] , ["html"]);
	gulp.watch(["./skew-image/**/*php"] , ["php"]);
	gulp.watch(["./skew-image/**/*scss"] , ["sass"]);
	gulp.watch(["./skew-image/**/*js"] , ["javascript"]);
});

gulp.task("default" , ["browser-sync" , "watch"]); 