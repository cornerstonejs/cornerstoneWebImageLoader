cornerstone Web Image Loader
=============================

A [cornerstone](https://github.com/chafey/cornerstone) Image Loader for web images (PNG, JPEG).

View the [live examples](https://rawgit.com/chafey/cornerstoneWebImageLoader/master/examples/index.html) to see this
library in action!

View the [simple image viewer](http://chafey.github.io/cornerstoneDemo/) built on cornerstone.


Project Status
---------------
Beta

Live Examples
---------------

[Click here for a live example of this library in use!](https://rawgit.com/chafey/cornerstoneWebImageLoader/master/examples/index.html)

Install
-------

Get a packaged source file:

* [cornerstoneWebImageLoader.js](https://raw.githubusercontent.com/chafey/cornerstoneWebImageLoader/master/dist/cornerstoneWebImageLoader.js)
* [cornerstoneWebImageLoader.min.js](https://raw.githubusercontent.com/chafey/cornerstoneWebImageLoader/master/dist/cornerstoneWebImageLoader.min.js)

Usage
-------

Simply include the cornerstoneWebImageLoader.js in your HTML file after you load cornerstone.js and
it will automatically register itself with cornerstone to load imageId's that have the http or https
url schemes.  To display an image, pass the url to the image as the imageId parameter to a cornerstone
API function loadImage().

Key Features
------------

* Provides a bridge between the cornerstone library and standard web images
* Allows XHR to be hooked so custom http headers can be added (e.g. for authentication).  View the source of the
  [example](https://rawgit.com/chafey/cornerstoneWebImageLoader/master/examples/index.html) to see how this is done.

Contributors
------------
@onluiz for fixing a bug with images not being properly invalidated
@leonardorame for adding support for CornerstoneImageLoadProgress

Build System
============

This project uses grunt to build the software.

Pre-requisites:
---------------

NodeJs - [click to visit web site for installation instructions](http://nodejs.org).

grunt-cli

> npm install -g grunt-cli

bower

> npm install -g bower

Common Tasks
------------

Update dependencies (after each pull):
> npm install

> bower install

Running the build:
> grunt

Automatically running the build and unit tests after each source change:
> grunt watch

Backlog
------------


Why is this a separate library from cornerstone?
================================================

Cornerstone was designed to support loading of any kind of image regardless of its container,
compression algorithm, encoding or transport.  This is one of many possible image loaders
that can provide the image pixel data to cornerstone to display


Copyright
============
Copyright 2014 Chris Hafey [chafey@gmail.com](mailto:chafey@gmail.com)