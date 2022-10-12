import { useEffect, useState } from "react";

import { timeParse } from 'd3-time-format';
import React from "react";
import styled from "styled-components";

const Chart = () => {

    const parseTime =timeParse("%Y-%m-%d %H:%M:%S");
    const [priceData, setPriceData] = useState({config:{}});

    let ohlc = new Array();
    let volume = new Array();
    useEffect(() => {
        fetch(`/api/stockData/SPX`)
        .then(res => res.json())
        .then((result) => {
            const data = result.data.values.map((item) => {
                const date = parseTime(item.datetime).getTime();
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


    return (
        <Wrapper >
            <h1>AAPL PRICE CHART</h1>
            <ChartContainer>
                { Object.keys(priceData.config).length > 0 && <ReactHighstock config={priceData.config} />}
            </ChartContainer>
            <PriceChart
            data={ priceData}/>
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