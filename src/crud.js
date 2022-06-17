const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://gyasmin:nodejsprojects@nodejsprojects.cyoc4.mongodb.net/test";

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to Mongo")

    } finally {
        await client.close();
    }
}

main().catch(console.error);