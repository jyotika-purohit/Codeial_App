// ------------<<< INSTALLING GULP & various libraries required >>>----------------------
//  npm install gulp-cli -g
//  npm install gulp -D    
//  npm install gulp-sass    -----> this converts the sass to CSS
//  npm install gulp-cssnano -----> compresses CSS to 1 line
//  npm insatll gul-rev      -----> renames files with "#xyz123" (#randomstring) along with them so that whenever it's sent again to browser, it'll have new random string attached to it and then browser accepts it as a NEW ASSET 

//--------- for minfying JS files ------
//  npm install gulp-uglify-es  -----> for minfying JS 

// ---------for compressing images ----------
//  npm install gulp-imagemin

//   ---  empty a file/directory ----
//  npm install del

const gulp = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;  ///// NOTE!
const imagemin = require('gulp-imagemin');
const del = require('del');
const GulpClient = require('gulp');

// gulp contains tasks which needs to be created so we'll create tasks

gulp.task('css',function(done){
    console.log('minifying CSS...');
    gulp.src('./assets/sass/**/*.scss')  // ** means- any and everyfolder and *.css means - all files with .css need to be compressed
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));    //yes,again

    done();

})   //task named as 'css' minifies CSS


gulp.task('js',function(done){
    console.log('minifying JS...');
    gulp.src('./assets/**/*.js')  // ** means- any and everyfolder and *.js means - all files with .css need to be compressed
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));    //yes,again

    done();
})   //task named as 'js' minifies JS


gulp.task('images',function(done){
    console.log('compressing images .. ');
    gulp.src('./assets/**/*.+(png|.pg|gif|svg|jpeg)')  // ** means- any and everyfolder and *.js means - all files with .css need to be compressed
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));    //yes,again

    done();
})   //task named as 'images' ,compresses images



// empty the public/assets directory because whenever we are building the project , we need to clear the prev build and build it from scratch
gulp.task('clean:assets',function(done){
    
    del.sync('./public/assets');
    done();
})

gulp.task('build',gulp.series('clean:assets','css','js','images'),function(done){
    console.log("Building assets");
    done();
})