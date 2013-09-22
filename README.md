# grunt-override-has

> Overrides has.js test output. Useful for optimizing unused code paths that can be trimmed via dead code removal.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-override-has --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-override-has');
```

## The "override_has" task

### Overview

This simple task was inspired by the [RequireJS](http://requirejs.org/) integration feature for [has.js](https://github.com/phiggins42/has.js) that the [optimizer provides](http://requirejs.org/docs/optimization.html#hasjs). It allows you to override the output of tests defined by the has.js API (custom or not) with your value of choice. Coupled with conditional compilation and dead code removal from your minifier of choice (like [UglifyJS](https://github.com/mishoo/UglifyJS2#conditional-compilation) and [Closure Compiler](https://developers.google.com/closure/)) you can easily remove features branches or debugging statements from your code base.

In your project's Gruntfile, add a section named `override_has` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  override_has: {
    dev: { // Supports multiple targets.
      options: {
        tests: { // Required object with has.js tests to override.
          debug: true
        }
      },
      files: { // Required list of targets. Supports single or multiple files.
        'dist/output': ['lib/input1'],
      },
    }
  },
})
```

### Options

#### options.tests
Type: `Object`
Default value: `{}`

An object that contains the has.js tests that will be overwritten. The keys in the object correspond to the test names.

### Usage Examples

To replace blocks of `has('debug')` and `has('log-warn')` configure the task like this. Note that the keys in the `tests` object correspond to the test names. When the test name contains dashes ('-') the key must be underscored (since objects in JS can't have dashes). Follow the naming convention set by has.js and you'll be fine, alternatively you can use camelCasing (e.g. `has('isDebug')`, `has('logWarn')`).

```js
grunt.initConfig({
  override_has: {
    options: {
      tests: {
        debug: false,
        log_warn: true
      }
    },
    files: {
      'dist/output': ['lib/input1', 'lib/input1'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
