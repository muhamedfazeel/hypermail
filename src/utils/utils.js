const path = require("path");
const logger = require("./logger");
const fs = require("fs");

const clearUploads = (generated = false) => {
  try {
    const dirPath =
      generated && generated === true ? "uploads/generated" : "uploads/base";
    const files = fs.readdirSync(dirPath);
    console.log(files);

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
