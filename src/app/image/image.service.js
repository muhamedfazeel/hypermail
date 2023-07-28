const fs = require("fs");
const { createCanvas, loadImage, registerFont } = require("canvas");

let i = 1;
async function addTextsOnImage(data, baseImage, options) {
  const fileExtension = baseImage.split(".").pop().toLowerCase();
  let fileName;
  const image = await loadImage(baseImage);
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
  const dir = "uploads/generated";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fileName = `${data[options.file.nameKey].toLowerCase().replace(" ", "-")}${
    options.file.index ? i++ : ""
  }.${fileExtension}`;
  const fileDir = `${dir}/${fileName}`;
  fs.writeFileSync(fileDir, canvas.toBuffer());
  i = 0;
  return fileName;
}

const generateImage = async (datas, baseImage, options, req) => {
  const generatedImages = datas.map((data) => {
    return addTextsOnImage(data, baseImage, options).then((file) => {
      const fileLink = `${req.protocol}://${req.get("host")}/generated/${file}`;
      return fileLink;
    });
  });
  const links = await Promise.all(generatedImages);
  return links;
};

module.exports = { generateImage };
