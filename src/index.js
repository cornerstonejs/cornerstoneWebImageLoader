import arrayBufferToImage from './arrayBufferToImage.js';
import createImage from './createImage.js';
import { loadImage, configure } from './loadImage.js';
import { external } from './externalModules.js';

const cornerstoneWebImageLoader = {
  arrayBufferToImage,
  createImage,
  loadImage,
  configure,
  external
};

export {
  arrayBufferToImage,
  createImage,
  loadImage,
  configure,
  external
};

export default cornerstoneWebImageLoader;
