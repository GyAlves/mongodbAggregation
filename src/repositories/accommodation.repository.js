const Accommodation = require("../model/Accommodation");
const mongodbConnection = require('../database/mongoDB');

class AccommodationRepository {

    constructor() {
        this._mongodbConnection = mongodbConnection;
        this.databaseName = 'airbnb';
        this.collection = 'listingsAndReviews';
    }

    async insertManyAccommodations(newListings) {

        const result = await this._mongodbConnection.client.db(this.databaseName).collection(this.collection).insertMany(newListings.accommodations);

        console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
        console.log(result.insertedIds);

        return result;
    }

    async getAccommodationByName(accommodationName) {

        const accommodation = await this._mongodbConnection.client.db(this.databaseName).collection(this.collection).findOne({ name: accommodationName });

        return accommodation
    }

    async findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(minimumNumberOfBedrooms = 0, minimumNumberOfBathrooms = 0, maximumNumberOfResults = Number.MAX_SAFE_INTEGER) {

        const cursor = this._mongodbConnection.client.db(this.databaseName).collection(this.collection).find(
            {
                bedrooms: { $gte: minimumNumberOfBedrooms },
                bathrooms: { $gte: minimumNumberOfBathrooms },
            }
        ).sort({ last_review: -1 }).limit(maximumNumberOfResults);

        const results = await cursor.toArray();

        return results;
    }

}

module.exports = AccommodationRepository;
