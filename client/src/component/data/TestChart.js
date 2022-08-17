import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';
import moment from 'moment';
import { timeParse } from 'd3-time-format';

const TestChart = ({data, timePeriod}) => {

    const symbol=data;
    const [stock, setStock] = useState(null);
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
        })
    },[]);
    let stockCategories = new Array();
    let stockData = new Array();
    
    if (stock !== null & stock !== undefined) {
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
            // dateTimeLabelFormats:{
                // day: '%Y-%m-%d'
            //     millisecond:"%H:%M:%S.%L",
            //     second: '%H:%M:%S',
            //     minute: "%H:%M",
            //     hour:'%H:%M',
            //     day: '%m-%d',
            //     week: '%m-%d',
            //     month: '%y-%m',
            //     year: '%Y'
            // },
            // tickInterval: 24 * 3600 *1000,
            // events: {
            //     setExtremes: function(e) {
            //         console.log(this);
            //         if(typeof(e.rangeSelectorButton)!== 'undefined')
            //         {
            //             alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
            //         }
            //     }
            // }

        }, 
        // rangeSelector: {
        //     enabled: true,
        //     allButtonsEnabled: true,
        //     inputEnabled: true,
        //     buttons: [{
        //       type: 'month',
        //       count: 1,
        //       text: '1m'
        //     }, {
        //       type: 'month',
        //       count: 3,
        //       text: '3m'
        //     }, {
        //       type: 'all',
        //       text: 'All'
        //     }],
        //     selected: 2
        //   },   

    };

    // Highcharts.stockChart('container',{
        // xAxis: {
        //     categories: ["1660159800000","1660159860000", "1660159920000"]
        // },
    //     title: {
    //         text: 'Highcharts Annotations'
    //     },
    //     series: [
    //         {
    //             name: 'SPX',
    //             data: [[4,{y:1, id: "min"}], [6,34], [8,{y:6, id:"max"}]],
    //             tooltip: {
    //                 valueDecimals: 2
    //             }
    //         }
    //     ],
    //     annotations: [{
    //         labels: [{
    //             point: "max",
    //             text: "Max"
    //         },{
    //             point: "min",
    //             text: "Min",
    //             backgroundColor: "white"
    //         }]
    //     }]

    // });


    return <Wrapper >
        {/* <script src="https://code.highcharts.com/stock/highstock.js"></script> */}
        {/* <Ddiv id="container"> </Ddiv> */}
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
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
background-color: rgba(243,243,263, 0.1);
border: 2px solid grey;
`;


export default TestChart;