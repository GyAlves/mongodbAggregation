const express = require('express');

const accommodationsRouter = express.Router();

const { createAccommodations, getAccommodationByName, getTopAccommodationsByNumberOfBedroomsAndBathrooms, getCheapestSuburbs } = require("../controller/AccommodationController");

accommodationsRouter.route("/").post(createAccommodations);
accommodationsRouter.route("/:accommodation_name").get(getAccommodationByName);
accommodationsRouter.route("/top/accommodations").get(getTopAccommodationsByNumberOfBedroomsAndBathrooms);
accommodationsRouter.route("/cheapest/accommodations").get(getCheapestSuburbs);




module.exports = accommodationsRouter;