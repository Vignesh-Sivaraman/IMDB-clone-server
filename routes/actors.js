const express = require("express");
const router = express.Router();
const actorsController = require("../controllers/actorsController");

// add actor
router.route("/addactor").post(actorsController.addActor);

// get actor
router.route("/getactor").get(actorsController.getActor);

// get all actors
router.route("/getallactors").get(actorsController.getAllActors);

// edit actor

router.route("/updateactor").post(actorsController.updateActor);

module.exports = router;
