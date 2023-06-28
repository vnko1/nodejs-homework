const Jimp = require("jimp");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

const { ApiError } = require("../../utils");

class ImageService {
  static upload(name) {
    const dirName = path.join(__dirname, "../../", "temp");
    const multerConfig = multer.diskStorage({
      destination: dirName,
      filename: (req, file, cb) => {
        const { id } = req.user;
        const { mimetype } = file;
        const ext = mimetype.split("/")[1];
        const filename = "avatar_" + id + "." + ext;
        cb(null, filename);
      },
    });

    const multerFilter = (req, file, cb) => {
      const { mimetype } = file;
      if (mimetype.startsWith("image/")) cb(null, true);
      else cb(ApiError(400, "Bad request"), false);
    };
    return multer({ storage: multerConfig, fileFilter: multerFilter }).single(
      name
    );
  }

  static async save(imagePath, filename, width, height) {
    const avatarsPath = path.join(__dirname, "../../", "public", "avatars");
    const image = await Jimp.read(imagePath);
    image.resize(width, height).write(imagePath);
    const publicPath = path.join(avatarsPath, filename);
    await fs.rename(imagePath, publicPath);
    return path.join("avatars", filename);
  }
}

module.exports = { ImageService };
