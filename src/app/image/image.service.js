const fs = require("fs");
const { createCanvas, loadImage, registerFont } = require("canvas");

let i = 1;
function addTextsOnImage(data, baseImage, options) {
  loadImage(baseImage).then((image) => {
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0);

    options.texts.forEach((t) => {
      const text = data[t.key];
      if (text) {
        if (options.font.external) {
          options.font.fonts.forEach((fontData) => {
            registerFont(fontData.path, { family: fontData.family });
          });
        }

        const font = `${t.font.size} ${t.font.family || "sans-serif"}`;
        ctx.font = font;
        ctx.fillStyle = t.font.color;

        const textDimen = ctx.measureText(text);
        let xPos = t.position.x;
        switch (t.font.align) {
          case "center":
            xPos = t.position.x + (t.position.max - textDimen.width) / 2;
            break;
          case "left":
            xPos = t.position.x;
            break;
          case "right":
            xPos = t.position.x + (t.position.max - textDimen.width);
            break;
          default:
            xPos = t.position.x;
            break;
        }

        ctx.fillText(text, xPos, t.position.y, t.position.max);
      }
    });
    const fileName = `data/${data[options.file.nameKey]
      .toLowerCase()
      .replace(" ", "-")}${options.file.index ? i++ : ""}.jpg`;

    fs.writeFileSync(fileName, canvas.toBuffer());
  });
  i = 0;
}

const generateImage = (datas, baseImage, options) => {
  datas.forEach((data) => {
    addTextsOnImage(data, baseImage, options);
  });
};

module.exports = { generateImage };
