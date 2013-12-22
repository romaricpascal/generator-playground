// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function (grunt) {

  'use strict';

  // Load Grunt tasks declared in the package.json file
  require('load-grunt-tasks')(grunt);

  // Configure Grunt 
  grunt.initConfig({

    // grunt-express serves the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          bases: [__dirname],
          livereload: true
        }
      }
    },

    // grunt-watch monitors the projects files
    watch: {
      all: {
        
        files: ['index.html', 'css/**/*.css', 'js/**/*.js'],
        options: {
          livereload: true
        }
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }
  });

  // Creates the `server` task
  grunt.registerTask('server', [
    'express',
    'open',
    'watch'
  ]);
};