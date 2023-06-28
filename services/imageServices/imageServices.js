const Jimp = require("jimp");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;
const { ApiError } = require("../../utils");
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

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



  static async uploadImage(imagePath, width, height) {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      const image = await Jimp.read(imagePath);
      image.resize(width, height).write(imagePath);

      const result = await cloudinary.uploader.upload(imagePath, options);

      return result.secure_url;
    } catch (error) {
      throw ApiError(500, error.message);
    }
  }
}

module.exports = { ImageService };
