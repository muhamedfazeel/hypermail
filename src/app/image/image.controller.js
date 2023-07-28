const logger = require("../../utils/logger");
const { clearUploads } = require("../../utils/utils");
const { datas, options } = require("./data");
const imageService = require("./image.service");

const GenerateImage = async (req, res) => {
  const body = req.body;
  const files = req.files;
  const baseImage = files.image[0];
  try {
    const generatedImages = await imageService.generateImage(
      datas,
      baseImage.path,
      options,
      req
    );
    res.status(200).send(generatedImages);
  } catch (error) {
    logger.error(error);
    res.status(500).send({});
  }
};

module.exports = {
  GenerateImage,
};
