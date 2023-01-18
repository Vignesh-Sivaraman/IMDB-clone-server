const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

// add movie
router.route("/addmovie").post(moviesController.addMovie);

// get movie
router.route("/getmovie").get(moviesController.getMovie);

// get all movies
router.route("/getallmovies").get(moviesController.getAllMovies);

// edit movie

router.route("/updatemovie").post(moviesController.updateMovie);

module.exports = router;
