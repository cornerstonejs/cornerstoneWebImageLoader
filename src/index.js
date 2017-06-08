import arrayBufferToImage from './arrayBufferToImage';
import createImage from './createImage';
import { loadImage, configure } from './loadImage';
import * as cornerstone from 'cornerstone-core';

export {
    arrayBufferToImage,
    createImage,
    loadImage,
    configure
};

// Register the http and https prefixes so we can use standard web urls directly
cornerstone.registerImageLoader('http', loadImage);
cornerstone.registerImageLoader('https', loadImage);
