const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const PORT = 3000;

app.get("/api/notes", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db/db.json"));
  console.log(data);
  res.json(data);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

app
  .listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))
  .on("error", function (err) {
    console.log("err", err);
  });
