import { loadImage } from './loadImage.js';

export default function (cornerstone) {
  // Register the http and https prefixes so we can use standard web urls directly
  cornerstone.registerImageLoader('http', loadImage);
  cornerstone.registerImageLoader('https', loadImage);
}
