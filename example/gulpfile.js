const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', () => {
    return del(['./src/js']);
});

gulp.task('build', () => {
    return gulp.src('./src/ts/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts.createProject('tsconfig.json')())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/js'));
});

gulp.task('default', ['clean', 'build']);
