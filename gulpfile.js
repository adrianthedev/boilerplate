var gulp         = require('gulp'),
    less         = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    clean        = require('gulp-clean'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    cache        = require('gulp-cache'),
    path         = require('path'),
    livereload   = require('gulp-livereload'),
    gutil        = require('gutil'),
    gUtil        = require('gulp-util'),
    cache        = require('gulp-cache'),
    browserSync  = require('browser-sync'),
    combiner     = require('stream-combiner2'),
    fs           = require('fs');


var projectFolder = '';
if (fs.existsSync('../public_html/' + projectFolder)) {
    var publicPath = '../public_html/' + projectFolder;
}else{
    var publicPath = '../public_html';
}

gulp.task('default', function() {
    console.log(1);
    // gulp.start('styles', 'scripts');
});

gulp.task('browser-sync', function() {
    browserSync({
        // proxy: ""
    });
});

gulp.task('watch', ['browser-sync'], function() {

    gulp.watch("style.less", ['styles', function(){
            browserSync.reload(["style.min.css"])
        }
    ]);
    gulp.watch("index.php", [function(){
            browserSync.reload()
        }
    ]);

});

gulp.task('styles', function() {
    var combined = combiner.obj([
        gulp.src( 'style.less'),
        less(),
        minifycss(),
        rename({suffix: '.min'}),
        // gulp.dest('public/admin-assets')
    ]);

    // any errors in the above streams will get caught
    // by this listener, instead of being thrown:
    combined.on('error', console.error.bind(console));

    return combined;
})

gulp.task('old_styles', function() {
    return gulp.src( 'public/style.less')
        .pipe(less())
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public'))
        .pipe(gulp.dest(publicPath))
})

gulp.task('scripts', function() {
  return gulp.src( ['public/js/main.js'] )
    .pipe(concat('mainscript.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest( publicPath + '/js'))
});

gulp.task('adminScripts', function() {
  return gulp.src( ['public/admin-assets/js/main.js'] )
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest( publicPath + '/admin-assets/js'))
});

gulp.task('adminStyles', function() {
    return gulp.src( [
        'public/admin-assets/css/mixins.less',
        'public/admin-assets/css/variables.less',
        'public/admin-assets/css/misc.css',
        'public/admin-assets/css/font-awesome.min.css',
        'public/admin-assets/admin.less',
        ] )
        .pipe(concat('mainless.less'))
        .pipe(gulp.dest('./public/admin-assets/'))
        .pipe(less())
        .pipe(concat('admin.css'))
        .pipe(gulp.dest('./public/admin-assets/'))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/admin-assets/'))
        // .pipe(gulp.dest(publicPath))
})

gulp.task('adminPluginsJs', function() {
    return gulp.src( 'public/admin-assets/js/use/plugins.js')
        // .pipe(gulp.dest('public/admin-assets/js/'))
        .pipe(gulp.dest(publicPath + '/admin-assets/js/'))
})

gulp.task('pluginsJs', function() {
    return gulp.src( 'public/js/use/plugins.js')
        // .pipe(gulp.dest('public/js/'))
        .pipe(gulp.dest(publicPath + '/js/'))
})

// Watch Files For Changes
gulp.task('old_watch', function() {

    // Create LiveReload server
    // var server = livereload();

    gulp.watch( 'public/**/*.less', ['styles']);
    gulp.watch( 'public/js/plugins.js', ['pluginsJs']);
    gulp.watch( 'public/js/main.js', ['scripts']);
    gulp.watch( 'public/js/angular.js', ['scripts']);
    gulp.watch( 'public/admin-assets/js/plugins.js', ['adminPluginsJs']);
    gulp.watch( 'public/admin-assets/js/main.js', ['adminScripts']);
    gulp.watch( 'public/admin-assets/js/angular.js', ['adminScripts']);
});