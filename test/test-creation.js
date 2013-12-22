/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var testDirectory = path.join(__dirname, 'temp');
var assert = require('assert');


describe('playground generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(testDirectory, function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('playground:app', [
        '../../app'
      ]);
      done();

    }.bind(this));
  });

  describe('Default scaffolding', function () {

    beforeEach(function (done) {

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
  });

});