// ------------<<< INSTALLING GULP >>>----------------------
//  npm install gulp-cli -g
//  npm install gulp -D    
//  npm install gulp-sass    -----> this converts the sass to CSS
//  npm install gulp-cssnano -----> compresses CSS to 1 line
//  npm insatll gul-rev      -----> renames files with "#xyz123" (#randomstring) along with them so that whenever it's sent again to browser, it'll have new random string attached to it and then browser accepts it as a NEW ASSET 
const gulp = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');

// gulp contains tasks which needs to be created so we'll create tasks

gulp.task('css',function(){
    console.log('minifying CSS...');
    gulp.src('./assets/sass/**/*.scss')  // ** means- any and everyfolder and *.css means - all files with .css need to be compressed
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));    //yes,again



})   //task named as 'css' minifies CSS

