const AccommodationRepository = require("../repositories/accommodation.repository");

class AccommodationService {

    async createMultipleListings(accommodations) {

        const accommodationRepository = new AccommodationRepository();

        const accommodation = await accommodationRepository.insertManyAccommodations(accommodations);

        return accommodation

    }


    async getSpecificAccommodation(accommodationName) {

        const accommodationRepository = new AccommodationRepository();

        const accommodation = await accommodationRepository.getAccommodationByName(accommodationName);

        return accommodation

    }

    async findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(minimumNumberOfBedrooms, minimumNumberOfBathrooms) {

        const accommodationRepository = new AccommodationRepository();

        const results = await accommodationRepository.findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(minimumNumberOfBedrooms, minimumNumberOfBathrooms);

        let summary;

        if (results.length > 0) {

            summary = `Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`;

        } else {

            summary = `No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`;

        }

        return ({ summary, results });

    }

    async getCheapestSuburbs(country, market, maxNumberToPrint) {

        const accommodationRepository = new AccommodationRepository();

        const results = await accommodationRepository.printCheapestSuburbs(country, market, maxNumberToPrint);

        return results;

    }

}

module.exports = AccommodationService;