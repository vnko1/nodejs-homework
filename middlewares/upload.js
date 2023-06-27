const multer = require("multer");
const path = require("path");
const { ApiError } = require("../utils");

const dirName = path.join(__dirname, "../", "temp");

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

const upload = multer({ storage: multerConfig, fileFilter: multerFilter });

const checkFile = (req, res, next) => {
  if (!req.file) next(ApiError(400, "Bad request"));
  next();
};

module.exports = { upload, checkFile };
