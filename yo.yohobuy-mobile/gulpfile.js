/**
 * gulp file 执行compass解析，spm build以及文件合并压缩等
 * author： xuqi(qi.xu@yoho.cn)
 * date； 2015/3/27
 */
var gulp = require('gulp'),
    fs = require('fs'),
    ftp = require('gulp-ftp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    exec = require('child_process').exec,
    server = require('gulp-develop-server');

var config = JSON.parse(fs.readFileSync('./package.json').toString());
var assets_dir = 'dist/' + config.name + '/assets';
var dist_dir = {
    js: 'dist/' + config.name + '/' + config.version,
    css: 'dist/' + config.name + '/' + config.version,
    image: assets_dir + '/images',
    font: assets_dir + '/fonts'
};

var ftpConfig = {
    host: '58.213.133.26',
    user: 'php',
    pass: 'yoho9646'
};

// 本地运行时
// 启动
gulp.task('default', ['server', 'server:restart', 'compass-watch', 'compass']);

// start express server
gulp.task('server', function() {
    server.listen({
        path: 'app.js'
    });
});

// restart server if app.js changed
gulp.task('server:restart', function() {
    gulp.watch([
        'app.js', 'views/**/*.html', 'views/controller/*.js', 
        'layouts/*.html', 'public/css/*.css', 'public/js/data.js'], server.restart);
});

//compass 解析压缩合并
gulp.task('compass-watch', function() {
    gulp.watch('public/sass/**/*.scss', ['compass']);
});

gulp.task('compass', function() {
    gulp.src('public/sass/**/*.scss')
        .pipe(
            compass({
                config_file: 'config.rb',
                css: 'public/css',
                sass: 'public/sass'
            })
        )
});

//发布
//发布到CND
gulp.task('dist', function() {
    var ftpstream = ftp(ftpConfig);
    return gulp.src('dist/**/')
        .pipe(ftpstream)
        .pipe(gutil.noop());
});

//STEP1:拷贝fonts+images到发布目录
gulp.task('assets',function() {
    gulp.src('public/img/**')
        .pipe(gulp.dest(dist_dir.image));
    gulp.src('public/fonts/*')
        .pipe(gulp.dest(dist_dir.font));
});

//STEP2:compass整合所有css到index后发布到发布目录
gulp.task('compass-production', function() {
    gulp.src('public/sass/index.scss')
        .pipe(
            compass({
                css: dist_dir.css,
                sass: 'public/sass',
                image: dist_dir.image,
                font: dist_dir.font,
                http_path: '/',
                style: 'compressed'
            })
        )
        .on('error', function(error) {
            console.log(error);
            this.emit('end');
        });
});

//spm build
gulp.task('build', function() {
    exec('spm build', function() {
        //移动到发布目录
        fs.rename('dist/index-debug.js', dist_dir.js + '/index-debug.js');
        fs.rename('dist/index.js', dist_dir.js + '/index.js');
    });
});