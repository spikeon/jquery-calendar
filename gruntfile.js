module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'compressed',
					loadPath: 'src/styles/'
				},
				files: {                         // Dictionary of files
					'dist/<%= pkg.name %>.min.css' : 'src/styles/<%= pkg.name %>.scss',       // 'destination': 'source'
				}
			}
		},
		babel: {
			options: {
				sourceMap: true,
				presets: ['es2015', 'babili']
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js' : 'src/scripts/<%= pkg.name %>.js'
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
					src: [ 'dist/*.js', 'dist/*.css']
				}
			}
		}
	});



	// Default task(s).
	grunt.registerTask('default', ['babel', 'sass', 'usebanner']);

};