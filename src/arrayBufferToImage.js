
/**
 * Convert array buffer to image. Returns a promise that resolves to an Image object for the bytes in arrayBuffer
 *
 * @param arrayBuffer - arrayBuffer with bytes for a web image (e.g. JPEG, PNG, etc)
 * @returns {Promise} Promise that resolves to an Image object
 */
export default function (arrayBuffer) {
  const deferred = $.Deferred();

  const image = new Image();

  const arrayBufferView = new Uint8Array(arrayBuffer);
  const blob = new Blob([arrayBufferView]);
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);

  image.src = imageUrl;
  image.onload = function () {
    deferred.resolve(image);
    urlCreator.revokeObjectURL(imageUrl);
  };
  image.onerror = function (err) {
    urlCreator.revokeObjectURL(imageUrl);
    deferred.reject(err);
  };

  return deferred.promise();
}
