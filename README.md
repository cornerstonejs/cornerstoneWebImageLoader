cornerstone Web Image Loader
=============================

A [cornerstone](https://github.com/cornerstonejs/cornerstone) Image Loader for web images (PNG, JPEG).

Live Examples
---------------

[Click here for a live example of this library in use!](http://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/index.html)

View the [simple image viewer](http://viewer.ohif.org/) built on cornerstone.

Install
-------

Get a packaged source file:

* [cornerstoneWebImageLoader.js](https://raw.githubusercontent.com/cornerstonejs/cornerstoneWebImageLoader/master/dist/cornerstoneWebImageLoader.js)
* [cornerstoneWebImageLoader.min.js](https://raw.githubusercontent.com/cornerstonejs/cornerstoneWebImageLoader/master/dist/cornerstoneWebImageLoader.min.js)

Or install via [NPM](https://www.npmjs.com/):

> npm install cornerstone-web-image-loader

Usage
-------

Simply include the cornerstoneWebImageLoader.js in your HTML file after you load cornerstone.js and then set the cornerstone instance as an external module for cornerstoneWebImageLoader:

````javascript
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
````

This will let cornerstoneWebImageLoader register itself with cornerstone to load imageId's that have the http or https url schemes. To display an image, pass the url to the image as the imageId parameter to a cornerstone API function loadImage().

Key Features
------------

* Provides a bridge between the cornerstone library and standard web images
* Allows XHR to be hooked so custom http headers can be added (e.g. for authentication).  View the source of the
  [example](http://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/index.html) to see how this is done.

Contributors
------------
@onluiz for fixing a bug with images not being properly invalidated
@leonardorame for adding support for CornerstoneImageLoadProgress

Build System
============

This project uses webpack to build the software.

Pre-requisites:
---------------

NodeJs - [click to visit web site for installation instructions](http://nodejs.org).

Common Tasks
------------

Update dependencies (after each pull):
> npm install

Running the build:
> npm start

Automatically running the build and unit tests after each source change:
> npm run watch

Why is this a separate library from cornerstone?
================================================

Cornerstone was designed to support loading of any kind of image regardless of its container,
compression algorithm, encoding or transport.  This is one of many possible image loaders
that can provide the image pixel data to cornerstone to display

Copyright
============
Copyright 2017 Chris Hafey [chafey@gmail.com](mailto:chafey@gmail.com)