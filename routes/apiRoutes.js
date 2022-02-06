const router = require("express").Router();
const db = require("../db/db.json");
const fs = require("fs");

router.get("/notes", (req, res) => {
  const notes = JSON.parse(fs.readFile(db, "utf8"));
  res.json(notes);
});

router.post("/notes", (req, res) => {
  const notes = fs.readFile(db, "utf8");
  const updatedNotes = [...notes, req.body];
  fs.writeFile(db, updatedNotes);
  res.json(updatedNotes);
});

module.exports = router;
