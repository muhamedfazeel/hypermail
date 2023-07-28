require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const config = require("./config/config");
const logger = require("./utils/logger");
const routers = require("./routes/routes");
const imageService = require("./app/image/image.service");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/images", routers.imageRouter);

const PORT = config.app.port;
app.listen(PORT, () => {
  logger.info(`server started listening on port ${PORT}`);
});
