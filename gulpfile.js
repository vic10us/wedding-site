const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

function imgSquash() {
    return gulp .src("./images/**")
    .pipe(imagemin([
        imageminJpegRecompress(),
        imagemin.gifsicle({interlaced: true}),
        //imagemin.jpegtran({progressive: true, arithmetic: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ],{
        verbose: true
    })) 
    .pipe(gulp.dest("./minified/images"));
}

gulp.task("imgSquash", imgSquash);

gulp.task("watch", () => { 
    gulp.watch("./images/**", imgSquash);
});

gulp.task("default",gulp.series("imgSquash","watch"));
