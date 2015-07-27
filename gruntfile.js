module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            default: {
                src: [
                    'dist',
                    'build'
                ]
            }
        },
        copy : {
            bowercss: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'bower_components/cornerstone/dist/cornerstone.min.css',
                ],
                dest: 'examples/bower/css',
                expand: true,
                flatten: true
            },
            bowerjs: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery/dist/jquery.min.map',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/cornerstone/dist/cornerstone.min.js',
                    'bower_components/cornerstoneTools/dist/cornerstoneTools.min.js',
                    'bower_components/cornerstoneMath/dist/cornerstoneMath.min.js',
                ],
                dest: 'examples/bower/js',
                expand: true,
                flatten: true
            },
            bowerfonts: {
                src: [
                    'bower_components/bootstrap/dist/fonts/*',
                ],
                dest: 'examples/bower/fonts',
                expand: true,
                flatten: true
            }
        },
        concat: {
            build: {
                src : ['src/header.js', 'src/*.js'],
                dest: 'build/built.js'
            },
            dist: {
                options: {
                    stripBanners: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> ' +
                        '| (c) 2015 Chris Hafey | https://github.com/chafey/cornerstoneWebImageLoader */\n'
                },
                src : ['build/built.js'],
                dest: 'dist/cornerstoneWebImageLoader.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/cornerstoneWebImageLoader.min.js': ['dist/cornerstoneWebImageLoader.js']
                }
            },
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> ' +
                    '| (c) 2015 Chris Hafey | https://github.com/chafey/cornerstoneWebImageLoader */\n'
            }
        },
        jshint: {
            files: [
                'src/*.js'
            ]
        },
        qunit: {
            all: ['test/*.html']
        },
        watch: {
            scripts: {
                files: ['src/*.js', 'test/*.js', 'examples/*'],
                tasks: ['buildAll']
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('buildAll',  ['jshint', 'concat', 'uglify', 'copy']);
    grunt.registerTask('default', ['clean', 'buildAll']);
};

// Release process:
//  1) Update version numbers
//  2) do a build (needed to update dist versions with correct build number)
//  3) commit changes
//      git commit -am "Changes...."
//  4) tag the commit
//      git tag -a 0.1.0 -m "Version 0.1.0"
//  5) push to github
//      git push origin master --tags