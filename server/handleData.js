const { getAllComments } = require("./handleComments");

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

require("dotenv").config();
const { MONGO_URI } = process.env;
// const _id = uuidv4();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbName = "stockForum";

const addData = async (req, res) => {

    console.log("hi here is addData ");
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {
        console.log("in add data:", req.body);
        // const symbol = Object.keys(req.body);
        const symbol = req.body;

        // connect dataBase
        await client.connect();
        console.log("connected!",symbol);
    
        // check if already a member ,if not ,add it
        // let query = {}
        // query[symbol] = req.body[symbol];
        // const checkData = await db.collection("stockData").findOne(query);
        const checkData = null;
        // const kk = Object.keys(checkData[symbol])[1];
        // const ll = checkData[symbol][kk].length;
        // const lasttime = checkData[symbol][kk][ll-1]["datetime"];
        // const nowTime = moment().format("YYYY-MM-DD HH:mm:ss");
        // let ms = nowTime.diff(moment(lasttime,"YYYY-MM-DD HH:mm:ss"),"seconds");
        // let ms = nowTime.getTime() - lasttime.getTime();
     
        // console.log("checkData-----:",kk,"ok", checkData[symbol][kk][29],lasttime
        // ,"ok",nowTime,"over");
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
        // close and disconnected database
        client.close();
        console.log("disconnected!");
    };
};

const getData = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {
        const symbol = req.params.symbol;
        await client.connect();
        console.log("connected!",symbol);
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
        // close and disconnected database
        client.close();
        console.log("disconnected!");
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

    console.log("page..4444444444444",page,size);

    const result = filterable
        ? await getAllComments(page, size)
        : await getAllComments();
    console.log("result.Comments.length", result);
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
        console.log("in add data:", req.body);
        // const symbol = Object.keys(req.body);
        const symbol = req.body;
        req.body["_id"] = uuidv4();
        // connect dataBase
        await client.connect();
        console.log("connected!", symbol);
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
        // close and disconnected database
        client.close();
        console.log("disconnected!");
    };
};

const postwatchList = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {
        console.log("in postwatchList:", req.body);
        // const symbol = Object.keys(req.body);
        const symbol = req.body;
        req.body["_id"] = uuidv4();
        // connect dataBase
        await client.connect();
        console.log("connected!", symbol);
        // check if already a member ,if not ,add it
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
                status: 200,
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
        // close and disconnected database
        client.close();
        console.log("disconnected!");
    };
};

const getwatchList = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    try {
        
        await client.connect();
        console.log("connected!");
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
        // close and disconnected database
        client.close();
        console.log("disconnected!");
    };
};



module.exports = { addData, getData, postComment, getComments, postwatchList, getwatchList };