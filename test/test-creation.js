/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var temp = require('temp');
var testDirectory = temp.mkdirSync();
var assert = require('assert');
var exec = require('child_process').exec;

console.log('Test directory: ', testDirectory);


describe('playground generator', function () {

  before(function (done) {

    helpers.testDirectory(testDirectory, function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('playground:app', [
        path.resolve(__dirname, '../app')
      ]);
      done();

    }.bind(this));
  });

  after(function () {
    temp.cleanup();
  });

  describe('Default scaffolding', function () {

    before(function (done) {

      this.app.options['skip-install'] = true;
      this.app.run({}, function () {
        done();
      });
    });

    it('creates expected files', function () {
      var expected = [
        'index.html',
        'js/app.js',
        'css/style.css',
        'Gruntfile.js',
        'package.json'
      ];

      helpers.assertFiles(expected);
    });

    it('links the JS and CSS file in the HTML', function () {

      fs.readFile(path.join(testDirectory, 'index.html'), {
        encoding: 'utf8'
      }, function (err, html) {

        if (err) {
          assert.fail();
        }

        var containsCSSLink = html.indexOf('<link rel="stylesheet" href="css/style.css">') !== -1;
        var containsJSLink = html.indexOf('<script src="js/app.js"></script>') !== -1;

        assert.ok(containsCSSLink, 'Missing link to CSS file');
        assert.ok(containsJSLink, 'Missing link to JS file');
      });
    });

    it('initialises a Git repository', function (done) {

      exec('git log -1 --pretty=%s', {cwd: testDirectory}, function (err, stdout, stderr) {

        if (err) {
          console.log(err);
          assert.fail('An error occured when checking git logs');
        }

        assert.equal(stdout.trim(), 'Created playground'.trim());

        done();
      });
    });
  });

});