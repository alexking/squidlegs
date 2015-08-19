var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("js", function() {
    gulp.src([
			"library/Sprite.js", "library/Canvas.js", "library/Keyboard.js", "library/**",
			"game/**", "game/main.js"
		])
        .pipe(babel())
        .pipe(concat("all.js"))
        .pipe(gulp.dest("compiled"));
});

gulp.task("watch", function() {
    gulp.watch(["library/**", "game/**"], ["js"]);
});

gulp.task("default", ["js", "watch"]);