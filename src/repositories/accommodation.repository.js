const Accommodation = require("../model/Accommodation");
const mongodbConnection = require('../database/mongoDB');

class AccommodationRepository {

    constructor() {
        this._mongodbConnection = mongodbConnection;
        this.databaseName = 'airbnb';
        this.collection = 'listingsAndReviews';
    }

    async insertManyAccommodations(newListings) {

        const result = await this._mongodbConnection.client.db(this.databaseName).collection(this.collection).insertMany(newListings);

        console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
        console.log(result.insertedIds);

        return result;
    }

}

module.exports = AccommodationRepository;
