'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    //sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    cache = require('gulp-cache'), 
    reload = browserSync.reload;
    // cssmin = require('gulp-minify-css'),
    // uglify = require('gulp-uglify'),

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/less/main.less',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/less/**/*.*',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    host: 'localhost',
    port: 9000,
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    var stream = gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
        
    stream.on('finish', function () {
        gulp.src(path.src.html).pipe(reload({stream: true}));
    });
        // .pipe(reload({stream: true}));
        // .pipe(browserSync.stream())
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        // .pipe(rigger()) 
        //.pipe(sourcemaps.init()) 
        // .pipe(uglify()) 
        //.pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
        // .pipe(browserSync.stream())
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        //.pipe(sourcemaps.init())
        .pipe(less({
            includePaths: ['src/less/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer(['last 15 versions'], { cascade: true }))
        // .pipe(cssmin())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
        // .pipe(browserSync.stream())
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
        // .pipe(browserSync.stream())
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html],{usePolling: true}, function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style],{usePolling: true}, function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js],{usePolling: true}, function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img],{usePolling: true}, function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts],{usePolling: true}, function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['watch', 'build', 'webserver']);