'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var PlaygroundGenerator = module.exports = function PlaygroundGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
};

util.inherits(PlaygroundGenerator, yeoman.generators.Base);

PlaygroundGenerator.prototype.createProjectFiles = function createProjectFiles() {

  this.copy('index.html');
  this.copy('js/app.js');
  this.copy('css/style.css');
  this.copy('Gruntfile.js');
  this.copy('package.json');
};