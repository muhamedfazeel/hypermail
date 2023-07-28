const config = require("../../config/config");
const logger = require("../../utils/logger");
const { clearUploads } = require("../../utils/utils");
const { datas } = require("./data");
const imageService = require("./image.service");

const GenerateImage = (req, res) => {
  const body = req.body;
  const files = req.files;
  console.log(body);
  console.log(files);
  try {
    imageService.generateImage(datas, "", config);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  GenerateImage,
};
