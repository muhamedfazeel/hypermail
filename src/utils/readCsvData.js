const csv = require('csvtojson/v2');
const { createReadStream } = require('fs');
const logger = require('./logger');

module.exports.getCsvData = async (filePath) => {
  try {
    const jsonArr = await csv().fromFile(filePath);
    return jsonArr;
  } catch (err) {
    logger.error(err);
  }
}