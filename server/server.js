

// const path = require('path');
const express = require('express');
const {addNews, lastNewsUpdatedNews, addApiNews} = require('./handleNews');
const {getFinanceMarketNews} = require("./handlefinanceMarketNews");
const {addData, getData, postComment, getComments, postwatchList, getwatchList} = require("./handleData");
const PORT = 8000

express()
    .use(express.json())

    .get('/', (req, res) => {
        console.log("here is server get");
        res.status(200).json({
            status: "success",
            data: "here is server get",
            message: "success"
        })
    })

    .get("/api/lastUpdatednews", lastNewsUpdatedNews)

    .get("/financeMarketNews", getFinanceMarketNews)

    .get("/api/stockData/:symbol", getData)

    .get("/api/comments", getComments)


    .get("/api/watchlist", getwatchList)

    .post("/api/news", addNews)

    .post("/api/apinews", addApiNews)

    .post("/api/stockData", addData)

    .post("/api/comment", postComment)

    .post("/api/watchlist", postwatchList)


    .listen(PORT, () => {
        console.log(`Example app listening on PORT ${PORT}`)
    });