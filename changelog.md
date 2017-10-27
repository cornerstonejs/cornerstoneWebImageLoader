# Version 1.0.0

- Updated to 1.0.0 because 0.8.5 introduced a breaking change with Cornerstone / jQuery injection. This doesn't break usage if you are using HTML script tags, but if you are using a module system, Cornerstone Web Image Loader may not properly find its dependencies.

The solution for this is to inject your Cornerstone instance into Cornerstone Tools as follows:

````javascript
cornerstoneWebImageLoader.external.$ = $;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
````

An example commit doing something similar in the OHIF Viewer Meteor application is here: https://github.com/OHIF/Viewers/commit/012bba44806d0fb9bb60af329c4875e7f6b751e0#diff-d9ccd906dfc48b4589d720766fe14715R25

We apologize for any headaches that the breaking change in 0.8.5 may have caused for those using module systems.
- Note: the dependencies have been updated to require Cornerstone Core 1.0.0 or above

# Version 0.8.6 (deprecated due to breaking change)

- Added native CustomEvents that are triggered parallel to the jQuery events. This is part of a transition to drop the jQuery dependency entirely.
- *Note:* This version requires Cornerstone Core 0.13.2 or above, where cornerstone.events has the EventTarget interface!

e.g. CornerstoneImageLoadProgress has a native CustomEvent name 'cornerstoneimageloadprogress'

# Version 0.8.5 (deprecated due to breaking change)

- Add Jquery and Cornerstone as injection dependencies