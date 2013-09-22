/*
 * grunt-override-has
 * https://github.com/fberrios/grunt-override-has
 *
 * Copyright (c) 2013 Fernando Berrios
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    override_has: {
      single_override: {
        options: {
          tests: {
            debug: false
          }
        },
        files: {
          'tmp/single_override': ['test/fixtures/single_override'],
        },
      },
      multiple_overrides: {
        options: {
          tests: {
            debug: false,
            test1: true,
            test_2: false,
            test_3: false
          }
        },
        files: {
          'tmp/multiple_overrides': [
            'test/fixtures/single_override',
            'test/fixtures/multiple_overrides'
            ],
        },
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'override_has', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
