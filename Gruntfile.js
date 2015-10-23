module.exports = function (grunt) {
	'use strict';

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//Process CSS (sass and autoprefixer)
		sass: {
			dev: {
				options: {
					style: 'expanded',
                    lineNumbers: true
				},
				files: {
					'src/styles/main.css': 'src/sass/main.scss'
				}
			},
            dist: {
				options: {
					style: 'expanded',
                    lineNumbers: true
				},
				files: {
					'dist/temp/main.css': 'src/sass/main.scss'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			dev: {
				files: [
					{ src: ['src/styles/main.css'], dest: 'src/styles/main.css' }
				]
			},
			dist: {
				files: [
					{ src: ['dist/temp/main.css'], dest: 'src/temp/main.css' }
				]
			},
		},

		//Process Javascript
		uglify: {
			dist: {
				files:
				[
					{
						src: ['dist/temp/main.js'],
						dest: 'dist/js/main.min.js'
					}
				]
			},
		},
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/temp',
                    src: ['main.css'],
                    dest: 'dist/styles',
                    ext: '.min.css'
                }]
            }
        },

		concat : {
			dist : {
                files : {
                    'dist/temp/main.js' : ['src/components/jquery/dist/jquery.min.js', 'src/components/chico-ui/ui/chico.min.js', 'src/js/main.js'],
                    'dist/temp/main.css' : ['src/components/mesh/mesh.css', 'src/components/chico-ui/ui/chico.min.css', 'src/styles/main.css'],
                }
			}
		},

		//Process html
		useminPrepare: {
		  html: 'dist/index.html',
		  options: {
		  	uglify: 'uglify'
		  },
		},

		//clean dist folders
		clean: {
			dist: ['dist/js/*', 'dist/images/*', 'dist/styles/*', 'dist/index.html'],
            afterDist: ['dist/temp']
		},

		usemin: {
		  html: 'dist/index.html'
		},

		htmlmin: {
		        dist: {
		            options: {
		                removeComments: true,
		                collapseWhitespace: true,
		                removeEmptyAttributes: true,
		                removeCommentsFromCDATA: true,
		                removeRedundantAttributes: true,
		                collapseBooleanAttributes: true
		            },
		            files: {
		                // Destination : Source
		                'dist/index.html': 'dist/index.html'
		            }
		        }
		    },

		//Process images
		imagemin: {
		    png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/images/',
                        src: ['**/*.png'],
                        dest: 'dist/images/',
                        ext: '.png'
                    }
                ]
		    },
		    jpg: {
		      options: {
		        progressive: true
		      },
		      files: [
		        {
		          expand: true,
		          cwd: 'src/images/',
		          src: ['**/*.jpg'],
		          dest: 'dist/images/',
		          ext: '.jpg'
		        }
		      ]
		    }
		  },

		//copy files from components to js
		copy: {
			dist: {
				files:
				[
					{
						expand: true,
						cwd: 'src',
						src: ['index.html'],
						dest: 'dist/'
					}
				]
			},
		},
		watch: {
				/* watch to see if the sass files are changed, compile and add prefixes */
				styles: {
					files: ['src/sass/**/*.{scss,sass}'],
					tasks: ['sass:dev', 'autoprefixer:dev']
				},

				/* watch our files for change, reload */
				livereload: {
					files: ['src/*.html', 'src/*.php', 'src/styles/*.css', 'src/images/**/*.{png,jpg,jpeg,gif,webp,svg}', 'src/*.js'],
					options: {
						livereload: true
					}
				},
			},
		});

	//Task list
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('build', ['clean:dist','copy:dist', 'sass:dist', 'autoprefixer:dist', 'concat:dist', 'uglify:dist', 'cssmin', 'useminPrepare', 'usemin', 'htmlmin:dist', 'imagemin', 'clean:afterDist']);
	grunt.registerTask('default', ['watch']);
};