'use strict';

import React from 'react';
// Note that Highcharts has to be required separately
import ReactHighcharts from 'react-highcharts';
// import Highlight from 'react-highlight';
// import ReactDOM from 'react-dom';
// import { relativeTimeRounding } from 'moment';

const TestChart = () => {
    let config = {
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
    }]
    };

    return <>
    <ReactHighcharts config ={config }/>

    </>

};


// ReactDOM.render(React.createElement(ReactHighcharts, { config: config }), document.getElementById('test'));
// ReactDOM.render(React.createElement(
//   Highlight,
//   { className: 'jsx' },
//   require("raw-loader!./index.jsx")
// ), document.getElementById('code-js'));
// ReactDOM.render(React.createElement(
//   Highlight,
//   { className: 'html' },
//   require("raw-loader!./index.html")
// ), document.getElementById('code-html'));

// require("file?name=[name].[ext]!./index.html");
// require("file?name=[name].[ext]!./more.html");
// require("file?name=[name].[ext]!./style.css");
// require("file?name=[name].[ext]!./tomorrow.css");

export default TestChart;