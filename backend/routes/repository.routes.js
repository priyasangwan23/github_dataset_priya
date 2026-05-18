const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require("../controllers/repository.controller");

// GET    /api/repositories       → fetch all
// POST   /api/repositories       → create new
// GET    /api/repositories/:id   → fetch one
// PUT    /api/repositories/:id   → update one
// DELETE /api/repositories/:id   → delete one

router.route("/").get(getAll).post(create);
router.route("/:id").get(getOne).put(update).delete(remove);

module.exports = router;
