const fs = require("fs");

const { createCanvas, loadImage, registerFont } = require("canvas");
const datas = [
  { name: "John Doe", email: "john.doe@qburst.com" },
  { name: "Peter Parker", email: "peter.parker@qburst.com" },
];
const config = {
  file: {
    nameKey: "name",
    index: false,
  },
  font: {
    external: false,
    fonts: [{ family: "", path: "" }],
  },
  texts: [
    {
      key: "name",
      position: {
        x: 110,
        y: 710,
        max: 480,
      },
      font: {
        family: "",
        size: "60px",
        align: "center",
        color: "#FFF",
        lineWidth: 10,
      },
    },
    {
      key: "email",
      position: {
        x: 110,
        y: 790,
        max: 480,
      },
      font: {
        family: "arial",
        size: "24px",
        align: "center",
        color: "#FFF666",
        lineWidth: 10,
      },
    },
  ],
};
let i = 1;
function generateImage(data) {
  loadImage("src/assets/Welcome Poster.jpg").then((image) => {
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0);

    config.texts.forEach((t) => {
      const text = data[t.key];
      if (text) {
        if (config.font.external) {
          config.font.fonts.forEach((fontData) => {
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
    const fileName = `data/${data[config.file.nameKey]
      .toLowerCase()
      .replace(" ", "-")}${config.file.index ? i++ : ""}.jpg`;

    fs.writeFileSync(fileName, canvas.toBuffer());
  });
}

datas.forEach((data) => {
  generateImage(data);
});
