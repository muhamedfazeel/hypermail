const path = require("path");
const logger = require("./logger");
const fs = require("fs");

const clearUploads = (dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => fs.unlinkSync(path.join(dirPath, file)));
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

module.exports = {
  clearUploads,
};
