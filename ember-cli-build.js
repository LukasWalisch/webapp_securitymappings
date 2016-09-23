/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  
  const ratingImg = new Funnel('bower_components/five-star-rating', {
    srcDir: 'img', 
    destDir: 'assets/five-star-rating/img',
  });

  const ratingCSS = new Funnel('bower_components/five-star-rating', {
    srcDir: 'css',
    destDir: 'assets/five-star-rating/css'
  });

  const ratingJS = new Funnel('bower_components/five-star-rating/js', {
    srcDir: 'src', 
    destDir: 'assets/five-star-rating/js',
  });

  app.import('bower_components/vis/dist/vis.js');
  app.import('bower_components/vis/dist/vis.css');
  app.import('bower_components/lodash/dist/lodash.js');
  app.import('bower_components/ember/ember-template-compiler.js');


  return new MergeTrees([app.toTree(), ratingImg, ratingJS, ratingCSS]);
};
