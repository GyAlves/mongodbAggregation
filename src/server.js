
const express = require('express');

const routes = require('./routes/accommodations.routes');
const mongoClient = require("./database/mongoDB");

const server = express();
server.use(express.json());
server.use("/api/v1/accommodations", routes);


const port = 5005;

const start = async () => {
    try {

        await mongoClient.connect();
        console.log("Connected to mongodb");

        server.listen(port, () => {
            console.log(`Connected to port ${port}`)
        });

    } catch (err) {
        console.error(err)
    } finally {
        mongoClient.disconnect()
    }
}

start(mongoClient)