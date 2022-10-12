'use strict';

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbName = "stockForum";

const getAllComments = async (page, size) => {

    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {
        const filterable = !isNaN(page) && !isNaN(size);

        // connect dataBase
        await client.connect();

        const cursor = filterable ? await db.collection("comments").find().sort({"timestamp":-1}).skip((page) * size).limit(size)
            : await db.collection("comments").find();

        const hasNext = await cursor.hasNext();
        const ccomments = await cursor.toArray();

        let result = { ok: true, comments: ccomments };
        if (filterable) {
            result["hasNext"] = hasNext;
        };
        return result;

    } catch (err) {
        return {
            ok: false,
            message: err,
        };
    } finally {
        await client.close();
        // disconnected
    };

};


module.exports= {getAllComments};