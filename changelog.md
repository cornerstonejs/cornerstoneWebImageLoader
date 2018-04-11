# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2018-04-11
### Changed
- Updated Webpack to version 4
- DIST folder is now removed from the repository


## [2.0.0] - 2017-12-08
### Changed

- *Breaking Change!!!* Switches image loader return values to support the breaking change in Cornerstone Master (https://github.com/cornerstonejs/cornerstone/commit/9448755397da10a6de6f694d83123274cbd4b38e) which requires image loaders to return an object of the form { promise, cancelFn }.
- *Breaking Change!!!* Removed jQuery events from triggerEvent, lower-cased all the event names (i.e. 'cornerstoneimageloadprogress').
- *Breaking Change!!!* Switched all Deferred usage to use Promises
- Performance: Switch getPixelData to just return the canvas imageData.data. The previous loop to set alpha channel to 255 is unnecessary since we can now just set image.rgba = false.
- Set image.rgba to false by default. Users can change this to have the image rendered with the alpha channel intact.
- Switch event triggering to use cornerstone.triggerEvent
- Switched this changelog to try to follow http://keepachangelog.com/en/1.0.0/

## [1.0.0]

- Updated to 1.0.0 because 0.8.5 introduced a breaking change with Cornerstone / jQuery injection. This doesn't break usage if you are using HTML script tags, but if you are using a module system, Cornerstone Web Image Loader may not properly find its dependencies.

The solution for this is to inject your Cornerstone instance into Cornerstone Tools as follows:

````javascript
cornerstoneWebImageLoader.external.$ = $;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
````

An example commit doing something similar in the OHIF Viewer Meteor application is here: https://github.com/OHIF/Viewers/commit/012bba44806d0fb9bb60af329c4875e7f6b751e0#diff-d9ccd906dfc48b4589d720766fe14715R25

We apologize for any headaches that the breaking change in 0.8.5 may have caused for those using module systems.
- Note: the dependencies have been updated to require Cornerstone Core 1.0.0 or above

## [0.8.6] (deprecated due to breaking change)

- Added native CustomEvents that are triggered parallel to the jQuery events. This is part of a transition to drop the jQuery dependency entirely.
- *Note:* This version requires Cornerstone Core 0.13.2 or above, where cornerstone.events has the EventTarget interface!

e.g. CornerstoneImageLoadProgress has a native CustomEvent name 'cornerstoneimageloadprogress'

## [0.8.5] (deprecated due to breaking change)

- Add Jquery and Cornerstone as injection dependencies