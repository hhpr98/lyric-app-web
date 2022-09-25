// libs
const express = require("express");
const path = require("path");
// create server
const app = express();
// config vars
const PORT = 3000;
const BUILD_FOLDER = "build";

app.use(express.static(path.join(__dirname, BUILD_FOLDER)));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, BUILD_FOLDER, "index.html"));
});

app.listen(PORT, () => {
  console.log(`[server] app is running at port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});