import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';
import moment from 'moment';
import { timeParse } from 'd3-time-format';
import defaultAvatar from "../../FP_20220818184520.jpg";

const TestChart = ({data, timePeriod}) => {

    const symbol=data;
    const [stock, setStock] = useState(null);
    const [apiNoCredit, setApiNoCredit] = useState(false);
    const parseTime =timeParse("%Y-%m-%d %H:%M:%S");
    console.log("000000000000000000000000000000000000",symbol,timePeriod);

    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${timePeriod}&apikey=${process.env.REACT_APP_APIDATA}`;

    console.log("12data:==================", process.env.REACT_APP_APIDATA, process.env.REACT_APP_APINEWS);

    useEffect(() => {
        console.log("fetch-------------------------");
        fetch(url)
        .then(data => data.json())
        .then(res =>{
            setStock(res);
            console.log("res:", res);
            res.code === 429 && setApiNoCredit(true);
        })
    },[]);
    let stockCategories = new Array();
    let stockData = new Array();
    
    if (stock !== null & stock !== undefined & apiNoCredit === false) {
        Object.values(stock.values).map((item) => {
            let x;
            if (item["datetime"].length <11) {
                const temp= new Date(item["datetime"]);
                x=temp.getTime();   //  2022-08-16
            } else {
                x=parseTime(item["datetime"]).getTime();   //  2022-08-16
            };
            const y=parseFloat(item["open"]);
            console.log("here is TestChart-----------------------------",x,y,"over");
            stockData.push({x,y});
            stockCategories.push(x);
        });

    };

    const options = {
        title: {
            text: `${symbol} chart`
        },
        subtitle : {
            Date: moment().format("LLLL")
        },
        series: [
            {
                data: stockData
            }
        ],
        xAxis: {
            type:'datetime',
            categories: stockCategories,
            labels: {
                // enable: true
                format: '{values:%y-%m-%d %H:%M:%S}'
            },
        }, 

    };


    return <Wrapper >
        {/* <script src="https://code.highcharts.com/stock/highstock.js"></script> */}
        {/* <Ddiv id="container"> </Ddiv> */}
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
            opacity={0.1}
            plotBackgroundImage={`url(${defaultAvatar})`}
        />
    </Wrapper>
};

const Ddiv = styled.div`
    /* height: 300px; */
    min-width: 310px;
`;

const Wrapper = styled.div`
height: 100%;
width: 500px;
padding-top: 90px;
/* background-color: rgba(243,243,263, 0.1); */
/* border: 2px solid grey; */
/* background-image: url(${defaultAvatar}); */
`;


export default TestChart;