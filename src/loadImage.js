//
// This is a cornerstone image loader for web images such as PNG and JPEG
//

(function ($, cornerstone, cornerstoneWebImageLoader) {

    "use strict";

  var options = {
    // callback allowing customization of the xhr (e.g. adding custom auth headers, cors, etc)
    beforeSend : function(xhr) {}
  };


  // Loads an image given a url to an image
    function loadImage(imageId) {

      // create a deferred object
      var deferred = $.Deferred();

      var xhr = new XMLHttpRequest();
      xhr.open("GET", imageId, true);
      xhr.responseType = "arraybuffer";
      options.beforeSend(xhr);
      xhr.onload = function() {
        var imagePromise =  cornerstoneWebImageLoader.arrayBufferToImage(this.response);
        imagePromise.then(function(image) {
          var imageObject = cornerstoneWebImageLoader.createImage(image, imageId);
          deferred.resolve(imageObject);
        }, function(error) {
          deferred.reject(error);
        });
      };
      xhr.onprogress = function(oProgress) {

        if (oProgress.lengthComputable) {  //evt.loaded the bytes browser receive
            //evt.total the total bytes seted by the header
            //
            var loaded = oProgress.loaded;
            var total = oProgress.total;
            var percentComplete = Math.round((loaded / total)*100);

            $(cornerstone).trigger('CornerstoneImageLoadProgress', {
                imageId: imageId,
                loaded: loaded,
                total: total,
                percentComplete: percentComplete
            });
        }
      };   
      xhr.send();
      return deferred.promise();
    }

    function configure(opts) {
      options = opts;
    }

    // steam the http and https prefixes so we can use standard web urls directly
    cornerstone.registerImageLoader('http', loadImage);
    cornerstone.registerImageLoader('https', loadImage);
  
    cornerstoneWebImageLoader.configure = configure;
  
    return cornerstoneWebImageLoader;
}($, cornerstone, cornerstoneWebImageLoader));
