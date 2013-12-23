/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var temp = require('temp');
var assert = require('assert');
var exec = require('child_process').exec;
var async = require('async');

// # TESTS
describe('playground generator', function () {

  after(function () {
    temp.cleanup();
  });

  describe('Default scaffolding', function () {

    before(function (done) {

      runGenerator(this, {
        includeNormalize: true,
        includeJQuery: true
      }, done);
    });

    it('creates expected files', function () {
      var expected = [
        'index.html',
        'js/app.js',
        'css/style.css',
        'Gruntfile.js',
        'package.json',
        'bower.json'
      ];

      helpers.assertFiles(expected);
    });

    it('links the JS and CSS file in the HTML', function (done) {

      fs.readFile(path.join(this.workspace, 'index.html'), {
        encoding: 'utf8'
      }, function (err, html) {

        if (err) {
          assert.fail();
        }

        var containsCSSLink = html.indexOf('<link rel="stylesheet" href="css/style.css">') !== -1;
        var containsJSLink = html.indexOf('<script src="js/app.js"></script>') !== -1;

        assert.ok(containsCSSLink, 'Missing link to CSS file');
        assert.ok(containsJSLink, 'Missing link to JS file');
        done();
      });
    });

    it('initialises a Git repository', function (done) {

      exec('git status', {cwd: this.workspace}, function (err, stdout) {
        console.log(err);
        console.log(stdout);
      });

      exec('git log -1 --pretty=%s', {cwd: this.workspace}, function (err, stdout) {

        if (err) {
          console.log(err);
          assert.fail('An error occured when checking git logs');
        }

        assert.equal(stdout.trim(), 'Created playground'.trim());

        done();
      });
    });
  });

  describe('Normalize.css', function () {

    it('includes normalize.css when accepting prompt', function (done) {

      runGenerator(this, {
        includeNormalize: true,
        includeJQuery: true
      }, function () {

        async.parallel([
          assertHTMLHasStylesheet(path.join(this.workspace, 'index.html'), 
                                  'bower_components/normalize-css/normalize.css'),
          assertBowerDependencyIsPresent(path.join(this.workspace, 'bower.json'), 'normalize-css')
        ], function () {
          done();
        });
      }.bind(this));
    });

    it('does not include normalize.css when declined prompt', function (done) {

      runGenerator(this, {
        includeNormalize: false,
        includeJQuery: true
      }, function () {

        async.parallel([
          assertHTMLHasStylesheet(path.join(this.workspace, 'index.html'), 
                                  'bower_components/normalize-css/normalize.css', true),
          assertBowerDependencyIsPresent(path.join(this.workspace, 'bower.json'), 'normalize-css', true)
        ], function () {
          done();
        });
      }.bind(this));
    });
  });

  describe('jQuery', function () {

    it('includes jQuery when accepting prompt', function (done) {

      runGenerator(this, {
        includeNormalize: true,
        includeJQuery: true
      }, function () {

        async.parallel([
          assertHTMLHasScript(path.join(this.workspace, 'index.html'), 
                                  'bower_components/jquery/jquery.js'),
          assertBowerDependencyIsPresent(path.join(this.workspace, 'bower.json'), 'jquery')
        ], function () {
          done();
        });
      }.bind(this));
    });

    it('includes jQuery when accepting prompt', function (done) {

      runGenerator(this, {
        includeNormalize: true,
        includeJQuery: false
      }, function () {

        async.parallel([
          assertHTMLHasScript(path.join(this.workspace, 'index.html'), 
                                  'bower_components/jquery/jquery.js', true),
          assertBowerDependencyIsPresent(path.join(this.workspace, 'bower.json'), 'jquery', true)
        ], function () {
          done();
        });
      }.bind(this));
    });
  });
});

// # HELPER FUNCTIONS
function runGenerator(context, promptAnswers, done) {
  
  var workspace = context.workspace = temp.mkdirSync();
  helpers.testDirectory(workspace, function (err) {

    if (err) {
      return done(err);
    }

    this.app = helpers.createGenerator('playground:app', [
      path.resolve(__dirname, '../app')
    ]);

    helpers.mockPrompt(this.app, promptAnswers);

    this.app.options['skip-install'] = true;

    console.log('Default run');
    this.app.run({}, function () {
      done();
    });

  }.bind(context));
}

function assertHTMLHasStylesheet(htmlFile, stylesheetURL, not) {

  return function (done) {
    fs.readFile(htmlFile, {encoding: 'utf8'}, function (err, html) {

      if (err) {
        assert.fail(err);
      }

      var linkHTML = '<link rel="stylesheet" href="' + stylesheetURL + '">';
      var containsLink = html.indexOf(linkHTML) !== -1;

      if (not) {
        containsLink = !containsLink;
      }

      assert.ok(containsLink);
      done();
    });
  };
}

function assertHTMLHasScript(htmlFile, scriptURL, not) {

  return function (done) {
    fs.readFile(htmlFile, {encoding: 'utf8'}, function (err, html) {

      if (err) {
        assert.fail(err);
      }

      var scriptHTML = '<script src="' + scriptURL + '">';
      var containsLink = html.indexOf(scriptHTML) !== -1;

      if (not) {
        containsLink = !containsLink;
      }

      assert.ok(containsLink);
      done();
    });
  }; 
}

function assertBowerDependencyIsPresent(bowerJson, dependencyName, not) {

  return function (done) {

    fs.readFile(bowerJson, {encoding: 'utf8'}, function (err, json) {

      if (err) {
        assert.fail(err);
      }

      var contents = JSON.parse(json);

      var hasDependency = contents.dependencies[dependencyName];

      if (not) {
        hasDependency = !hasDependency;
      }

      assert.ok(hasDependency);

      done();
    });
  };
}