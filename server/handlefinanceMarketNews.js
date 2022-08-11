
// var requestOptions = {
//     method: 'GET'
// };

// var params = {
//     api_token: ,
//     symbols: 'msft,fb',
//     limit: '50'
// };

// var esc = encodeURIComponent;
// var query = Object.keys(params)
//     .map(function(k) {return esc(k) + '=' + esc(params[k]);})
//     .join('&');

const getFinanceMarketNews = () => {
    // fetch("https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token="+REACT_APP_MARKETAUX_TOKEN)

    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

};

module.exports = {getFinanceMarketNews};
