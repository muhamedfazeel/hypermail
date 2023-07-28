const imageRouter = require("express").Router();
const imageController = require("./image.controller");
const { clearUploads } = require("../../utils/utils");
const uploadHandler = require("../../handler/upload.handler");

imageRouter.post(
  "/generate",
  (req, res, next) => {
    clearUploads("uploads/base");
    clearUploads("uploads/fonts");
    next();
  },
  uploadHandler,
  imageController.GenerateImage
);

module.exports = imageRouter;
