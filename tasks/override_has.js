/*
 * grunt-override-has
 * https://github.com/fberrios/grunt-override-has
 *
 * Copyright (c) 2013 Fernando Berrios
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('override_has', 'Overrides has.js test output. Useful for optimizing unused code paths that can be trimmed via dead code removal.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      tests: {}
    });

    if (grunt.util._.isEmpty(options.tests)) {
      grunt.log.writeln('No has.js tests to override. Bye!');
      return false;
    }

    if (grunt.util._.isEmpty(this.files)) {
      grunt.log.writeln('No files defined. I\'ve got nowhere else to go!');
      return false;
    }

    var hasRegExp = /has\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var src = grunt.file.read(filepath);

        // Get the tests configured...
        var hasTests = options.tests;

        // ...and replace any occurrence in src with the value.
        src = src.replace(hasRegExp, function (match, test) {
          if(grunt.util._.str.include(test, '-')) {
            test = grunt.util._.underscored(test);
          }

          if (hasTests.hasOwnProperty(test)) {
            return !!hasTests[test];
          }

          return match;
        });

        return src;
      }).join(grunt.util.normalizelf(''));

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};
