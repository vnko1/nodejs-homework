const Jimp = require("jimp");

const imageService = async (patheName, width, height) => {
  const image = await Jimp.read(patheName);
  image.resize(width, height).write(patheName);
};

module.exports = { imageService };
