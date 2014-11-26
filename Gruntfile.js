module.exports = function(grunt) {

    /*
        Grunt installation:
        -------------------
            npm install -g grunt-cli
            npm install -g grunt-init
            npm init (creates a `package.json` file)

        Project Dependencies:
        ---------------------
            npm install grunt --save-dev
            npm install grunt-contrib-watch --save-dev
            npm install grunt-contrib-uglify --save-dev
            npm install grunt-contrib-sass --save-dev
            npm install grunt-autoprefixer --save-dev

        Simple Dependency Install:
        --------------------------
            npm install (from the same root directory as the `package.json` file)

    */

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        uglify: {
            dev: {
                files: {
                    'js/production/main.min.js': ['js/libs/plugins/*.js','js/custom/*.js']
                  }
            },
            build: {
                files: {
                    'js/production/main.min.js': ['js/libs/plugins/*.js','js/custom/*.js','!js/custom/dev.js']
                  }
            }
        },
        sass: {
            build: {
                options: {
                    style: 'compressed',
                },
                files: {
                    'css/main.css': 'css/scss/main.scss'
                }
            }, 
            dev: {
                options: {
                    style: 'expanded',
                    debugInfo: true,
                    lineNumbers: true,
                },
                files: {
                    'css/main.css': 'css/scss/main.scss'
                }
            } 
        },
        autoprefixer: {
            options: {
                silent: true
            },
            no_dest: {
                src: 'css/main.css'
            },
        },
        watch: {
            options: {
                livereload: true,
            },
            html: {
                files: ['**/*.html'],
            },
            scripts: {
                files: ['js/libs/**/*','js/custom/**/*'],
                tasks: ['uglify:dev'],
            },
            sass: {
                options: {
                  livereload: false
                },
                files: ['css/scss/**/*.scss'],
                tasks: ['sass'],
            },
            css: {
                files: ['css/main.css'],
                tasks: [],
            }
        }
    });

    // Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['uglify:dev', 'sass:dev', 'autoprefixer']);

    // Simply starts livereload (requires browser plugin: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)
    grunt.registerTask('live', ['watch']);

    grunt.registerTask('release', ['uglify:build', 'sass:build', 'autoprefixer']);
};