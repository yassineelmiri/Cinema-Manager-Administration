const express = require("express");
const router = express.Router();
const FilmController = require("../controllers/FilmController");

router.post("/", FilmController.addFilm);
router.get("/", FilmController.getFilms);
router.put("/:id", FilmController.updateFilm);
router.delete("/:id", FilmController.deleteFilm);

module.exports = router;
