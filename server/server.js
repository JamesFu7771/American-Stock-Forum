

// const path = require('path');
const express = require('express');
const {addNews, lastNewsUpdatedNews, addApiNews} = require('./handleNews');
const {getFinanceMarketNews} = require("./handlefinanceMarketNews");
const {addData, getData} = require("./handleData");
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

    .post("/api/news", addNews)

    .post("/api/apinews", addApiNews)

    .post("/api/stockData", addData)


    .listen(PORT, () => {
        console.log(`Example app listening on PORT ${PORT}`)
    });