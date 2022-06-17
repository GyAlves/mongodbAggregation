const AccommodationService = require("../services/AccommodationService");

const createAccommodations = async (req, res) => {
    try {

        const { name, summary, property_type, bedrooms, bathrooms, beds } = req.body;
        const accommodationService = new AccommodationService();
        const accommodation = await accommodationService.createMultipleListings(name, summary, property_type, bedrooms, bathrooms, beds);

        res.status(200).json({ accommodation })

    } catch (error) {
        res.status(400).json({ message: "Error on creating accommodations", error: error.message })
    }
}


module.exports = { createAccommodations }