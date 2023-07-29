const httpStatus = require("http-status");
const logger = require("../../utils/logger");
const imageService = require("./image.service");
const Response = require("../../common/dto/response.dto");

const UploadFiles = (req, res) => {
  const response = new Response(httpStatus.OK, "Successfully uploaded files");
  res.send(response.code).send(response);
};

const GenerateImage = async (req, res) => {
  const options = req.body;

  try {
    const generatedImages = await imageService.generateImage(options, req);
    const response = new Response(
      httpStatus.CREATED,
      "images generated successfully",
      { links: generatedImages }
    );
    res.status(response.code).send(response);
  } catch (error) {
    logger.error(error);
    res.status(500).send({});
  }
};

module.exports = {
  GenerateImage,
  UploadFiles,
};
