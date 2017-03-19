module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			build: {
				src: 'src/scripts/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'compressed',
					loadPath: 'src/styles/'
				},
				files: {                         // Dictionary of files
					'build/<%= pkg.name %>.min.css' : 'src/styles/<%= pkg.name %>.scss',       // 'destination': 'source'
				}
			}
		},
		banner:
			'/* jQuery Calendar\n' +
			' * Version: <%= pkg.version %>\n' +
			' * Date: <%= grunt.template.today("mm/dd/yyyy") %>\n' +
			' * <%= pkg.description %>\n'+
			' */\n',
		usebanner: {
			dist: {
				options: {
					position: 'top',
					banner: '<%= banner %>'
				},
				files: {
					src: [ 'build/*.js', 'build/*.css']
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-banner');


	// Default task(s).
	grunt.registerTask('default', ['uglify', 'sass', 'usebanner']);

};