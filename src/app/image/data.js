const datas = [
  { name: "John Doe", email: "john.doe@qburst.com" },
  { name: "Peter Parker", email: "peter.parker@qburst.com" },
];
const options = {
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

module.exports = {
  options,
  datas,
};
