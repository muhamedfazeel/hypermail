const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = "uploads";
    if (file.fieldname == "font") {
    } else if (file.fieldname == "font") {
    }
    switch (file.fieldname) {
      case "image":
        dir += "/base";
        break;
      case "font":
        dir += "/fonts";
        break;
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.toLowerCase().replaceAll(" ", "-"));
  },
});

const upload = multer({ storage });
const uploadHandler = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "font" },
]);

module.exports = uploadHandler;
