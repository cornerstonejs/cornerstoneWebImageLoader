/*! cornerstoneWebImageLoader - v0.7.0 - 2016-07-14 | (c) 2015 Chris Hafey | https://github.com/chafey/cornerstoneWebImageLoader */
cornerstoneWebImageLoader = {};

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


(function ($, cornerstone, cornerstoneWebImageLoader) {

  "use strict";

  var canvas = document.createElement('canvas');
  var lastImageIdDrawn = "";

  /**
   * creates a cornerstone Image object for the specified Image and imageId
   *
   * @param image - An Image
   * @param imageId - the imageId for this image
   * @returns Cornerstone Image Object
   */
  function createImage(image, imageId)
  {
    // extract the attributes we need
    var rows = image.naturalHeight;
    var columns = image.naturalWidth;

    function getPixelData()
    {
      var imageData = getImageData();
      var imageDataData = imageData.data;
      var numPixels = image.naturalHeight * image.naturalWidth;
      var storedPixelData = new Uint8Array(numPixels * 4);
      var imageDataIndex = 0;
      var storedPixelDataIndex = 0;
      for(var i=0; i < numPixels; i++) {
        storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
        storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
        storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
        storedPixelData[storedPixelDataIndex++] = 255; // alpha
        imageDataIndex++;
      }
      return storedPixelData;
    }

    function getImageData()
    {
      var context;
      if(lastImageIdDrawn !== imageId) {
        canvas.height = image.naturalHeight;
        canvas.width = image.naturalWidth;
        context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        lastImageIdDrawn = imageId;
      }
      else {
        context = canvas.getContext('2d');
      }
      return context.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
    }

    function getCanvas()
    {
      if(lastImageIdDrawn === imageId) {
        return canvas;
      }

      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      lastImageIdDrawn = imageId;
      return canvas;
    }

    function getImage()
    {
      return image;
    }

    // Extract the various attributes we need
    return {
      imageId : imageId,
      minPixelValue : 0, // calculated below
      maxPixelValue : 255, // calculated below
      slope: 1.0,
      intercept: 0,
      windowCenter : 128,
      windowWidth : 255,
      render: cornerstone.renderWebImage,
      getPixelData: getPixelData,
      getImageData: getImageData,
      getCanvas: getCanvas,
      getImage: getImage,
      //storedPixelData: extractStoredPixels(image),
      rows: rows,
      columns: columns,
      height: rows,
      width: columns,
      color: true,
      columnPixelSpacing: undefined,
      rowPixelSpacing: undefined,
      invert: false,
      sizeInBytes : rows * columns * 4 // we don't know for sure so we over estimate to be safe
    };
  }

  // steam the http and https prefixes so we can use standard web urls directly
  cornerstoneWebImageLoader.createImage = createImage;
  return cornerstoneWebImageLoader;
}($, cornerstone, cornerstoneWebImageLoader));

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
