var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync"),
    webpack = require("webpack-stream");
var customizeBootstrap = require('gulp-customize-bootstrap');

var bourbon = require('node-bourbon').includePaths,
    neat = require('bourbon-neat').includePaths;

gulp.task("sass", function() {
        return gulp.src("./resource/assets/sass/**/*.scss")
            .pipe(sass({
                //includePaths: require('node-bourbon').includePaths
                includePaths: [].concat(bourbon, neat),

            }))


        .pipe(autoprefixer())
            .pipe(gulp.dest("./public/assets/css"))
    })
    //
    // gulp.task('compileBootstrap', function() {
    //     return gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
    //         .pipe(customizeBootstrap('styles/scss/*.scss'))
    //         .pipe(sass())
    //         .pipe(gulp.dest('styles/'));
    // });
    //

//wepack digabung dengan gulp
gulp.task("script", function() {
    return gulp.src("./resource/assets/js/app.js")
        .pipe(webpack(require("./webpack.config.js")))
        .pipe(gulp.dest("./public/assets/js"))

})

gulp.task("serve", function() {
    browserSync.init({
        server: {
            baseDir: "./public" // server nnya !
        }
    })
    gulp.watch("./resource/assets/sass/**/*.scss", ['sass']);
    gulp.watch("./resource/assets/js/**/*.js", ['script']);

    gulp.watch("./public/assets/css/**/*.css").on("change", browserSync.reload) //stiap ada perubahan reload
    gulp.watch("./public/assets/js/app.js").on("change", browserSync.reload)
    gulp.watch("./public/*.html").on("change", browserSync.reload)
})
