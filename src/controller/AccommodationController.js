const AccommodationService = require("../services/AccommodationService");

const createAccommodations = async (req, res) => {
    try {

        const accommodations = req.body;

        const accommodationService = new AccommodationService();
        const accommodation = await accommodationService.createMultipleListings(accommodations);

        res.status(200).json({ accommodation })

    } catch (error) {
        res.status(400).json({ message: "Error on creating accommodations", error: error.message })
    }
}

const getAccommodationByName = async (req, res) => {
    try {

        const { accommodation_name } = req.params;

        const accommodationService = new AccommodationService();
        const accommodation = await accommodationService.getSpecificAccommodation(accommodation_name);

        res.status(200).json({ accommodation })

    } catch (error) {
        res.status(400).json({ message: "Error on retrieving accommodation", error: error.message })
    }
}

const getTopAccommodationsByNumberOfBedroomsAndBathrooms = async (req, res) => {

    try {

        const { minimumNumberOfBedrooms, minimumNumberOfBathrooms } = req.body;

        const accommodationService = new AccommodationService();
        const response = await accommodationService.findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(minimumNumberOfBedrooms, minimumNumberOfBathrooms);

        res.status(200).json(response)

    } catch (error) {
        res.status(400).json({ message: "Error on retrieving accommodation", error: error.message })
    }
}

const getCheapestSuburbs = async (req, res) => {
    try {

        const { country, market, maxNumberToPrint } = req.body;

        const accommodationService = new AccommodationService();

        const response = accommodationService.getCheapestSuburbs(country, market, maxNumberToPrint);

        res.status(200).json(response);


    } catch (error) {
        res.status(400).json({ message: "Error on retrieving accommodations", error: error.message })

    }
}


module.exports = { createAccommodations, getAccommodationByName, getTopAccommodationsByNumberOfBedroomsAndBathrooms, getCheapestSuburbs }