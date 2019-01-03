const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const renameGulp = require('gulp-rename');
const lessGulp = require('gulp-less');
const browsersync = require('browser-sync').create();


function gulpRun(done) {
    gulp.src( './less/styles.less' )
        .pipe(lessGulp())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            flexbox: true,
            grid: true
        }))
        .pipe(renameGulp({
            basename: 'style',
        }))
        .pipe(gulp.dest('./'));

    done();
}


function initBrowserSync(done) {
    browsersync.init({
        proxy: 'localhost/genesis-starter/',
        open: false
    });
    done();
}


function reloadBrowser(done) {
    browsersync.reload();
    done();
}


function watchFiles(done) {
    gulp.watch( './less/**/*.less', gulp.series(gulpRun, reloadBrowser) );
    gulp.watch( './**/*.php', reloadBrowser );
    done();
}


gulp.task( 'default', gulp.series(gulpRun, initBrowserSync, watchFiles) );