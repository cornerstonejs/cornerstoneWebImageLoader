# Version 0.8.6

- Added native CustomEvents that are triggered parallel to the jQuery events. This is part of a transition to drop the jQuery dependency entirely.
- *Note:* This version requires Cornerstone Core 0.13.2 or above, where cornerstone.events has the EventTarget interface!

e.g. CornerstoneImageLoadProgress has a native CustomEvent name 'cornerstoneimageloadprogress'

# Version 0.8.5

- Add Jquery and Cornerstone as injection dependencies