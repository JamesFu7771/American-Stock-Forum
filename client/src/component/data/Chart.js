import { useEffect, useState, useContext } from "react";

import { timeParse } from 'd3-time-format';
import { json } from 'd3-request';
// import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import React from "react";
import styled from "styled-components";
import { MemberContext } from "../members/MemberContext";

const Chart = () => {

    const parseTime =timeParse("%Y-%m-%d %H:%M:%S");
    const [priceData, setPriceData] = useState({config:{}});

    console.log("here is chart...........................");

    let ohlc = new Array();
    let volume = new Array();
    useEffect(() => {
        fetch(`/api/stockData/SPX`)
        .then(res => res.json())
        .then((result) => {
            console.log(result.data.values);
            const data = result.data.values.map((item) => {
                const date = parseTime(item.datetime).getTime();
                console.log("item:---",item,date,"over");
                ohlc.unshift([
                    date,
                    +item.open,
                    +item.high,
                    +item.low,
                    +item.close,
                ]); 
                volume.unshift({
                    x: date,
                    y: +item.volume,
                    color: (+item.open-(+item.close)) >0 ? "red" : "green"
                });             
            });
            // ohlc=[
            //     [1660159800000, 4203.58984, 4203.58984, 4201.97021, 4202.97021],
            //     [1660159860000, 4202.77002, 4202.97998, 4201.75977, 4202.97998],
            //     [1660159920000, 4202.99023, 4203.00498, 4202.16016, 4202.6499]
            // ];
            // volume=[
            //     {x:1660159800000,y:14048196,color:"red"},
            //     {x:1660159860000,y:14249271,color:"red"},
            //     {x:1660159920000,y:14249271,color:"red"}
            // ];
            console.log("ohlc-----:",ohlc);
            setPriceData({
                config:{
                    rangeSelector:{
                        selected:1,
                        inputDateFormat: "%Y-%m-%d %H:%M:%S"
                    },
                    title:{
                        text: 'Stock Chart'
                    },
                    xAxis: {
                        dateTimeLabelFormats:{
                            millisecond:"%H:%M:%S.%L",
                            second: '%H:%M:%S',
                            minute: "%H:%M",
                            hour:'%H:%M',
                            day: '%m-%d',
                            week: '%m-%d',
                            month: '%y-%m',
                            year: '%Y'
                        }
                    },
                    yAxis: [{
                        labels: {
                            align: 'right',
                            x:-3
                        },
                        title: {
                            text: 'price'
                        },
                        height: '60%',
                        lineWidth: 2
                    }, {
                        labels:{
                            align:'right',
                            x:-3
                        },
                        title: {
                            text: "volume"
                        },
                        top: "65%",
                        height:'35%',
                        offset: 0,
                        lineWidth: 2
                    }],
                    series: [{
                        type: 'candlestick',
                        name: "AAPL",
                        color: 'red',
                        lineColor: "red",
                        upColor: "green",
                        upLineColor: "green",
                        tooltip: {
                        },
                        data: ohlc,
                    }, {
                        type: 'column',
                        name: 'Volume',
                        data: volume,
                        yAix: 1
                    }]
                }
            });
        });
    },[]);
    console.log("priceData:", priceData.config);

    console.log("priceData:===", priceData.config,"ok",Object.keys(priceData.config).length,"over");


    return (
        <Wrapper >
            <h1>AAPL PRICE CHART</h1>
            <ChartContainer>
                {/* { Object.keys(priceData.config).length > 0 && <ReactHighstock config={priceData.config} />} */}
            </ChartContainer>
            {/* <PriceChart
            data={ priceData}/> */}
        </Wrapper>
    );
};

const Wrapper =styled.div`
border: 22px solid red;
`;

const ChartContainer =styled.div`
height : 500px;
width: 500px;
`;

export default Chart;