'use strict';

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbName = "stockForum";

const lastNewsUpdatedNews = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {
        // connect dataBase
        await client.connect();
    
        const checktitle = await db.collection("news").find().limit(3).toArray();
        if (checktitle===null) {
            res.status(404).json({
                status: "not found",
                data: "",
                message: "no message"
            })
        } else {
            res.status(200).json({
                status: "success",
                data: checktitle,
                message: "success"
            })
        }
    } catch (error) {
        console.log(error);
    } finally {
        // close and disconnect database
        client.close();
    };
};

const addNews = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {
        const title = req.body.title;

        // connect dataBase
        await client.connect();
        const checktitle = await db.collection("news").findOne({"title":title});
        if (checktitle===null) {
            const result = await db.collection("news").insertOne(req.body);
            res.status(200).json({
                status: 200,
                data: result,
                message: "no message"
            })
        } else {
            res.status(400).json({
                status: "this news is existed!",
                data: "",
                message: "this news is existed!"
            })
        }
        
    } catch (error) {
        console.log(error);
        
    } finally {
        // close and disconnect database
        client.close();
    };
};

const addApiNews = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {
        const update_at = req.body.update_at;
        const title = req.body.title;

        // connect dataBase
        await client.connect();
    
        const checktitle = await db.collection("news").findOne({"from":"apinews", "articles":[{"title":title}]});
        if (checktitle===null) {
            const result = await db.collection("news").insertOne(req.body);
            res.status(200).json({
                status: 200,
                data: result,
                message: "no message"
            })
        } else {
            res.status(400).json({
                status: "this news is existed!",
                data: "",
                message: "this news is existed!"
            })
        }
        
    } catch (error) {
        console.log(error);
        
    } finally {
        // close and disconnect database
        client.close();
    };
};

module.exports = { addNews, lastNewsUpdatedNews, addApiNews };