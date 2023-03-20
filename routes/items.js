/* Routes for sample app. */

const express = require("express");
const ExpressError = require("../expressError");
const router = new express.Router();
const items = require("../fakeDb");

router.get("/items", function (req, res) {
  return res.json(items);
});

router.post("/items", function (req, res) {
  items.push(req.body);
  return res.status(201).json({ added: req.body });
});

router.get("/items/:name", function (req, res) {
  const item = items.find((element) => element["name"] === req.params.name);
  if (item === undefined) {
    throw new ExpressError("Error: Couldn't not find", 404);
  }
  return res.json(item);
});

router.patch("/items/:name", function (req, res) {
  const idx = items.findIndex((element) => element["name"] === req.params.name);
  if (idx === -1) {
    throw new ExpressError("Error: Couldn't not find", 404);
  }
  items[idx] = req.body;
  return res.status(200).json({ updated: items[idx] });
});

router.delete("/items/:name", function (req, res) {
  const idx = items.findIndex((element) => element["name"] === req.params.name);
  items.splice(idx, 1);
  return res.json({ message: "Deleted" });
});

module.exports = router;
