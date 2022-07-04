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

    async printCheapestSuburbs(country, market, maxNumberToPrint) {

        const pipeline = [
            {
                '$match': {
                    'bedrooms': 1,
                    'address.country': country,
                    'address.market': market,
                    'address.suburb': {
                        '$exists': 1,
                        '$ne': ''
                    },
                    'room_type': 'Entire home/apt'
                }
            }, {
                '$group': {
                    '_id': '$address.suburb',
                    'averagePrice': {
                        '$avg': '$price'
                    }
                }
            }, {
                '$sort': {
                    'averagePrice': 1
                }
            }, {
                '$limit': maxNumberToPrint
            }
        ];

        const aggCursor = this._mongodbConnection.client.db(this.databaseName).collection(this.collection).aggregate(pipeline);

        return aggCursor;

    }

}

module.exports = AccommodationRepository;
