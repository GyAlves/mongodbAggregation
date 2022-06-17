const express = require('express');

const accommodationsRouter = express.Router();

const { createAccommodations } = require("../controller/AccommodationController");

accommodationsRouter.route("/").post(createAccommodations);

module.exports = accommodationsRouter;