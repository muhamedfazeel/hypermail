require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const config = require("./config/config");
const logger = require("./utils/logger");
const routers = require("./routes/routes");
const imageService = require("./services/image.service");

const app = express();
app.use(bodyParser.json());

try {
} catch (error) {
  logger.error(error);
}

const PORT = config.app.port;
app.listen(PORT, () => {
  logger.info(`server started listening on port ${PORT}`);
});
