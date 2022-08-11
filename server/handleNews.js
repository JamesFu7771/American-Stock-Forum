'use strict';

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;
// const _id = uuidv4();

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
        console.log("connected!",req.email);
    
        const checktitle = await db.collection("news").find().limit(3).toArray();
        console.log("checktitle:", checktitle, req.body);
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
        // close and disconnected database
        client.close();
        console.log("disconnected!");
    };
};

const addNews = async (req, res) => {

    console.log("hi here is addNews ");
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {
        const title = req.body.title;

        // connect dataBase
        await client.connect();
        console.log("connected!",req.email);
    
        // check if already a member ,if not ,add it
        const checktitle = await db.collection("news").findOne({"title":title});
        console.log("checktitle:", checktitle, req.body);
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
        // close and disconnected database
        client.close();
        console.log("disconnected!");
    };
};

const addApiNews = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    console.log("addApiNews:",req.body);
    try {
        const update_at = req.body.update_at;
        const title = req.body.title;

        // connect dataBase
        await client.connect();
        console.log("connected!", update_at);
    
        const checktitle = await db.collection("news").findOne({"from":"apinews", "articles":[{"title":title}]});
        console.log("checktitle:", checktitle);
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
        // close and disconnected database
        client.close();
        console.log("disconnected!");
    };
};

module.exports = { addNews, lastNewsUpdatedNews, addApiNews };