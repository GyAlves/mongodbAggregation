const { MongoClient } = require("mongodb");


class MongodbConnection {

    constructor() {
        this.MONGODB_URI = "mongodb+srv://gyasmin:nodejsprojects@nodejsprojects.cyoc4.mongodb.net/test";
    }

    async connect() {
        this.client = new MongoClient(this.MONGODB_URI, {
            useUnifiedTopology: false,
            useNewUrlParser: true
        })

        await this.client.connect(function (err, client) {
            client.db("admin").command({ ping: 1 });
            console.log("Connected successfully to server");
        });

    }

    async disconnect() {
        await this.client.close();
    }
}

module.exports = new MongodbConnection();