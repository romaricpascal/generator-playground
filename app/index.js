'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var PlaygroundGenerator = module.exports = function PlaygroundGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(PlaygroundGenerator, yeoman.generators.Base);

PlaygroundGenerator.prototype.createProjectFiles = function createProjectFiles() {

  this.copy('index.html');
  this.copy('js/app.js');
  this.copy('css/style.css');
}