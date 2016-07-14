
(function ($, cornerstone, cornerstoneWebImageLoader) {

  "use strict";

  /**
   * returns a promise that resolves to an Image object for the bytes in arrayBuffer
   *
   * @param arrayBuffer - arrayBuffer with bytes for a web image (e.g. JPEG, PNG, etc)
   * @returns {*} Promise that resolves to an Image object
   */
  function arrayBufferToImage(arrayBuffer) {

    // create a deferred object
    var deferred = $.Deferred();

    var image = new Image();

    var arrayBufferView = new Uint8Array(arrayBuffer);
    var blob = new Blob([arrayBufferView]);
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(blob);
    image.src = imageUrl;
    image.onload = function() {
      deferred.resolve(image);
      urlCreator.revokeObjectURL(imageUrl);
    };
    image.onerror = function(err) {
      urlCreator.revokeObjectURL(imageUrl);
      deferred.reject(err);
    };

    return deferred.promise();
  }

  cornerstoneWebImageLoader.arrayBufferToImage = arrayBufferToImage;

  return cornerstoneWebImageLoader;
}($, cornerstone, cornerstoneWebImageLoader));
