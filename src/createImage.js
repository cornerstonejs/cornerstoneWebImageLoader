import * as cornerstone from 'cornerstone-core';

const canvas = document.createElement('canvas');
let lastImageIdDrawn = '';

/**
 * creates a cornerstone Image object for the specified Image and imageId
 *
 * @param image - An Image
 * @param imageId - the imageId for this image
 * @returns Cornerstone Image Object
 */
export default function (image, imageId) {
  // extract the attributes we need
  const rows = image.naturalHeight;
  const columns = image.naturalWidth;

  function getPixelData () {
    const imageData = getImageData();
    const imageDataData = imageData.data;
    const numPixels = image.naturalHeight * image.naturalWidth;
    const storedPixelData = new Uint8Array(numPixels * 4);
    let imageDataIndex = 0;
    let storedPixelDataIndex = 0;

    for (let i = 0; i < numPixels; i++) {
      storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
      storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
      storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
      storedPixelData[storedPixelDataIndex++] = 255; // alpha
      imageDataIndex++;
    }

    return storedPixelData;
  }

  function getImageData () {
    let context;

    if (lastImageIdDrawn === imageId) {
      context = canvas.getContext('2d');
    } else {
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      lastImageIdDrawn = imageId;
    }

    return context.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
  }

  function getCanvas () {
    if (lastImageIdDrawn === imageId) {
      return canvas;
    }

    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    const context = canvas.getContext('2d');

    context.drawImage(image, 0, 0);
    lastImageIdDrawn = imageId;

    return canvas;
  }

  function getImage () {
    return image;
  }

  // Extract the various attributes we need
  return {
    imageId,
    minPixelValue: 0, // calculated below
    maxPixelValue: 255, // calculated below
    slope: 1.0,
    intercept: 0,
    windowCenter: 128,
    windowWidth: 255,
    render: cornerstone.renderWebImage,
    getPixelData,
    getImageData,
    getCanvas,
    getImage,
    // storedPixelData: extractStoredPixels(image),
    rows,
    columns,
    height: rows,
    width: columns,
    color: true,
    columnPixelSpacing: undefined,
    rowPixelSpacing: undefined,
    invert: false,
    sizeInBytes: rows * columns * 4 // we don't know for sure so we over estimate to be safe
  };
}
