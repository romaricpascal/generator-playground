# generator-playground [![Build Status](https://secure.travis-ci.org/rhumaric/generator-playground.png?branch=master)](https://travis-ci.org/rhumaric/generator-playground)

> A generator for [Yeoman](http://yeoman.io) that scaffolds a simple web project for when you need to
> quickly play with an idea. It will create an HTML, CSS and Javascript file, already linked with each other,
> ready to be edited. It can also add normalize.css or jQuery. 
> It includes a Grunt configuration with an Express server to host the files 
> and livereload to directly see the modifications in your browser when you save. 
> It also initialises a Git repository, so you can version your experiments.

Nice to have features that might land in the future:
 - allow for different features of HTML (HAML, Jade...), CSS (LESS, SASS...), JS (Coffeescript, Typescript...)
 - add CSS and JS linting with desktop notifications.


## Getting Started

First you'll need [Yeoman](http://yeoman.io). 
Yeoman runs using [node.js](http://nodejs.org/), so you'll need this installed on your machine.
Installing node.js also brings in a handy package manager, [npm](https://npmjs.org),
which makes Yeoman's install a one liner:

```
$ npm install -g yo
```

Once you've got Yeoman setup, you'll need to install this generator. 
npm to the rescue again:

```
$ npm install -g generator-playground
```

This generator is now ready to use. Head over to the folder you wish to use it
and type:

```
$ yo playground
```

The generator will work its magic and scaffold the necessary files and folders. You're ready to go!

Start the express and livereload servers using `grunt server`. 
This will also open your default browser to see index.html. 
All that's left is popping up your favourite text editor and edit the `index.html`, `css/style.css` and/or `js/app.js`.

You could even go with a crazy one liner to do all of this at once
(might want to alias this if you plan on using it often):

```
$ yo playground && (sublime-text . index.html css/style.css js/app.js &) && grunt server
```
> Note: Replace the `sublime-text` command with the one corresponding to your editor,
> maybe the one stored in the $EDITOR environment variable.

Have fun coding!

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Release History
 
 - 2013-12-24   v0.1.1   Fix to Travis CI build
 - 2013-12-23   v0.1.0   Initial functionnalities
