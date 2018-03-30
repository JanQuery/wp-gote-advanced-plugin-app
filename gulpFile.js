/*global require, concat */

var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

var vendorFileList = [
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.min.js',    
    'bower_components/angular-resource/angular-resource.js',    
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/angular-filter/dist/angular-filter.min.js',
    'bower_components/angular-sanitize/angular-sanitize.min.js',
    'bower_components/angular-ui-tinymce/src/tinymce.js',
    'bower_components/angular-ui-tree/dist/angular-ui-tree.js'
];

var cssFileList = [
    'bower_components/angular-ui-tree/dist/angular-ui-tree.min.css',
    'app/css/styles.css'
];

var appFileList = [
    'app/js/app.js',
    'app/js/services/BlogInfoSrvc.js',
    'app/js/services/UserSrvc.js',
    'app/js/services/MediaSrvc.js',
    'app/js/services/TagsSrvc.js',
    'app/js/services/CategoriesSrvc.js',
    'app/js/services/PagesSrvc.js',
    'app/js/services/PostsSrvc.js',
    'app/js/services/CategoriesToJsonSrvc.js',
    'app/js/services/TagsToJsonSrvc.js',
    'app/js/services/SearchFilterSrvc.js',
    'app/js/services/wpTranslationSrvc.js',
    'app/js/filter/removePrivatStringFromTitleFltr.js',
    'app/js/directives/componets/search-section/search-section.js',
    'app/js/directives/componets/navbar/navbar.js',
    'app/js/directives/componets/pagination/pagination.js',
    'app/js/directives/componets/main-content/main-content.js',
    'app/js/directives/componets/main-content-pages/main-content-pages.js',
    'app/js/directives/componets/edit-post/edit-post.js',
    'app/js/directives/componets/edit-page/edit-page.js',
    'app/js/directives/componets/create-post/create-post.js',
    'app/js/directives/componets/create-page/create-page.js',
    'app/js/directives/removePrivatStringFromInput.js',
    'app/js/directives/featuredMedia.js',
    'app/js/directives/author.js',
    'app/js/directives/staticPostCategories.js',
    'app/js/directives/dynamicPostCategories.js',
    'app/js/directives/postTags.js',
    'app/js/directives/repeatDone.js',
    'app/js/directives/fullscreenTinyMceBugFix.js',
    'app/js/directives/modalHandler.js',
    'app/js/directives/revealHandler.js',
    'app/js/directives/staticInclude.js'
];

gulp.task( 'css', function() {
    gulp.src(cssFileList)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./build/css'));
});

gulp.task( 'vendor', function(){
    gulp.src(vendorFileList)
        .pipe(concat('vendor-scripts.js'))
        .pipe(gulp.dest('build/js/'));
});

gulp.task( 'app', function(){
    gulp.src(appFileList)
        .pipe(concat('wp-gote-advanced-plugin-app.js'))
        .pipe(gulp.dest('build/js/'));
});


gulp.task( 'watch', function(){
    gulp.watch(cssFileList, ['css'] );
    gulp.watch(vendorFileList, ['vendor'] );
    gulp.watch(appFileList, ['app']);
})

gulp.task( 'default', ['css', 'vendor', 'app', 'watch'] );