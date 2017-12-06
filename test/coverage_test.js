/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import * as cornerstoneWebImageLoader from '../src/index.js';

describe('A test that pulls in all modules', function () {
  it('pulls in all modules', function () {
    expect(cornerstoneWebImageLoader).to.exist;
  });
});
