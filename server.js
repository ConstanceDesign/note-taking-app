// route that the front-end can request data from
const { notes } = require("./db/db.json");

// require express
const express = require("express");

const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

// instantiate the server
const app = express();

// routes
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

// add the port
const PORT = 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

// saves notes into db.json
app.get("/api/notes", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db/db.json"));
  console.log(data);
  res.json(data);
});

// adds new notes
app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNote = req.body;
  newNote.id = uuid.v4();
  notes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

// deletes notes
app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
  res.json(delNote);
});

// html home request
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//html notes request
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// listen for requests
app
  .listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))
  .on("error", function (err) {
    console.log("err", err);
  });
