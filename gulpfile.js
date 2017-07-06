const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');

gulp.task('clean', () => {
    return del(['./src/js']);
});

gulp.task('build', () => {
    return gulp.src('./src/ts/**/*.ts')
        .pipe(ts.createProject('tsconfig.json')())
        .pipe(gulp.dest('./src/js'));
});

gulp.task('default', ['clean', 'build']);
