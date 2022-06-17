const AccommodationRepository = require("../repositories/accommodation.repository");

class AccommodationService {

    async createMultipleListings(name, summary, property_type, bedrooms, bathrooms, beds) {

        const accommodationRepository = new AccommodationRepository();

        const accommodation = await accommodationRepository.insertManyAccommodations(name, summary, property_type, bedrooms, bathrooms, beds);

        return accommodation

    }
}

module.exports = AccommodationService;