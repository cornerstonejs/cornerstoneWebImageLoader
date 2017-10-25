import registerLoaders from './registerLoaders.js';

let cornerstone;
let $ = window.$;

const external = {
  set cornerstone (cs) {
    cornerstone = cs;

    registerLoaders(cornerstone);
  },
  get cornerstone () {
    return cornerstone;
  },
  set $ (module) {
    $ = module;
  },
  get $ () {
    return $;
  }
};

export { external };
