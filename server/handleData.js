const { getAllComments } = require("./handleComments");

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbName = "stockForum";

const addData = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {

        // connect dataBase
        await client.connect();
    
        const checkData = null;
        if (checkData===null ) {
            const result = await db.collection("stockData").insertOne(req.body);
            res.status(200).json({
                status: 200,
                data: result,
                message: "no message"
            })
        } else {
            res.status(400).json({
                status: "this data is existed!",
                data: "",
                message: "this data is existed!"
            })
        }  
    } catch (error) {
        console.log(error);   
    } finally {
        // close and disconnect database
        client.close();
    };
};

const getData = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {
        const symbol = req.params.symbol;
        await client.connect();
        const checkData = await db.collection("stockData").findOne({"symbol": `${symbol}`});
        if (checkData !==null || checkData !== undefined ) {
            res.status(200).json({
                status: "success",
                data: checkData,
                message: "success"
            })
        } else {
            res.status(400).json({
                status: "not found!",
                data: "",
                message: "not found!"
            })
        }  
    } catch (error) {
        console.log("error:", error)
    } finally {
        // close and disconnect database
        client.close();
    };
};

const getComments = async (req, res) => {
    let page = parseInt(req.query.page);
    let size = parseInt(req.query.size);

    let filterable = true;
    if (isNaN(page) || isNaN(size)) {
        page = size = NaN;
        filterable = false;
    };

    const result = filterable
        ? await getAllComments(page, size)
        : await getAllComments();
    return filterable
        ? res
            .status(200)
            .json({ status: 200, data: result.comments, hasNext: result.hasNext })
        : res.status(200).json({ status: 200, data: result.comments });
    
};

const postComment = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {
        const symbol = req.body;
        req.body["_id"] = uuidv4();
        // connect dataBase
        await client.connect();
        const result = await db.collection("comments").insertOne(req.body);
        res.status(200).json({
            status: 200,
            data: result,
            message: "no message"
        })
    } catch (error) {
        console.log(error);   
        res.status(400).json({
            status: "failure",
            data: "",
            message: "no message"
        })
    } finally {
        // close and disconnect database
        client.close();
    };
};

const addWatchList = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {
        const symbol = req.body;
        req.body["_id"] = uuidv4();
        // connect dataBase
        await client.connect();
        let query = {}
        query[symbol] = req.body[symbol];
        const checkData = await db.collection("stockData").findOne(query);
        if (checkData !== undefined) {
            const result = await db.collection("watchlist").insertOne(req.body);
            res.status(200).json({
                status: 200,
                data: result,
                message: "no message"
            })
        } else {
            result ="";
            res.status(400).json({
                status: 400,
                data: result,
                message: "no message"
            })
        };
    } catch (error) {
        console.log(error);   
        res.status(400).json({
            status: "failure",
            data: "",
            message: "no message"
        })
    } finally {
        // close and disconnect database
        client.close();
    };
};

const getwatchList = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {
        
        await client.connect();
        // connect dataBase
        const checkData = await db.collection("watchlist").find().toArray();
        if (checkData !==null || checkData !== undefined ) {
            res.status(200).json({
                status: "success",
                data: checkData,
                message: "success"
            })
        } else {
            res.status(400).json({
                status: "not found!",
                data: "",
                message: "not found!"
            })
        }  
    } catch (error) {
        console.log("error:", error)
    } finally {
        // close and disconnect database
        client.close();
    };
};



module.exports = { addData, getData, postComment, getComments, addWatchList, getwatchList };