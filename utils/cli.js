"use strict";

const getArg = (tag) => {
  let aIndex = process.argv.indexOf("--" + tag);

  if (aIndex > 0 && aIndex + 1 < process.argv.length)
    return process.argv[aIndex + 1];
  else throw `Could not find --${tag}`;
};

module.exports = {
  getArg,
};
