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
        .pipe(gulp.dest("./dist/style/"))
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
});

gulp.task("image", () => {
    gulp.src("./src/image/**/*.*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/image/"))
})

gulp.task("watch", ["sass", "js", "image"], () => {
    browserSync.init({
        server: "./dist"
    });
});