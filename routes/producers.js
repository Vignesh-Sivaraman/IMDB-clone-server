const express = require("express");
const router = express.Router();
const producersController = require("../controllers/producersController");

router.route("/addproducer").post(producersController.addProducer);

// get producer
router.route("/getproducer").get(producersController.getProducer);

// get all producers
router.route("/getallproducers").get(producersController.getAllProducers);

// get producer
router.route("/getproducer").get(producersController.getProducer);
// edit producer

router.route("/updateproducer").post(producersController.updateProducer);

module.exports = router;
