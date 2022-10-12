
const express = require('express');
const {addNews, lastNewsUpdatedNews, addApiNews} = require('./handleNews');
const {addData, getData, postComment, getComments, addWatchList, getwatchList} = require("./handleData");
const PORT = 8000

express()
    .use(express.json())

    .get('/', (req, res) => {
        res.status(200).json({
            status: "success",
            data: "here is server get",
            message: "success"
        })
    })

    .get("/api/lastUpdatednews", lastNewsUpdatedNews)

    .get("/api/stockData/:symbol", getData)

    .get("/api/comments", getComments)


    .get("/api/watchlist", getwatchList)

    .post("/api/news", addNews)

    .post("/api/apinews", addApiNews)

    .post("/api/stockData", addData)

    .post("/api/comment", postComment)

    .post("/api/watchlist", addWatchList)


    .listen(PORT, () => {
        console.log(`Example app listening on PORT ${PORT}`)
    });