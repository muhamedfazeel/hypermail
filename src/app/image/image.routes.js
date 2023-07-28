const multer = require("multer");
const upload = multer({ dest: "uploads/base", preservePath: true });

const imageRouter = require("express").Router();
const imageController = require("./image.controller");
const { clearUploads } = require("../../utils/utils");

const generateImageUploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "font" },
]);
imageRouter.post(
  "/generate",
  (req, res, next) => {
    clearUploads();
    next();
  },
  generateImageUploadFields,
  imageController.GenerateImage
);

module.exports = imageRouter;
