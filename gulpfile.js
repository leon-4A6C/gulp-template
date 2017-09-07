const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const browserSync = require('browser-sync').create();

const browserSupport = ["last 2 versions"];

gulp.task("sass", () => {
    gulp.src("./src/style/main.sass")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: browserSupport,
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest("./dist/style/"))
        .pipe(browserSync.stream())
});

gulp.task("js", () => {
    gulp.src("./src/js/main.js")
        .pipe(babel({
            "presets": [
                ["env", {
                    "targets": {
                      "browsers": browserSupport
                    }
                }]
            ]
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js/"))
        .pipe(browserSync.stream())
});

gulp.task("image", () => {
    gulp.src("./src/image/**/*.*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/image/"))
        .pipe(browserSync.stream())
})

gulp.task("html", () => {
    gulp.src("./src/**/*.html")
        .pipe(gulp.dest("./dist/"))
        .pipe(browserSync.stream())
})

gulp.task("build", ["html", "sass", "js", "image"], () => {

})

gulp.task("watch", ["html", "sass", "js", "image"], () => {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch("./src/**/*.html", ["html"]);
    gulp.watch("./src/style/**/*.*", ["sass"]);
    gulp.watch("./src/js/**/*.js", ["js"]);
    gulp.watch("./src/image/**/*.*", ["image"]);

});