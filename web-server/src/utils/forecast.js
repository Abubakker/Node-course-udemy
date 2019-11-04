const request = require('request');



const forecast = (latitude, longitute, callback) => {
    const url = 'https://api.darksky.net/forecast/95004c552f0ead05b2c79ea8d2e7de64/' + latitude + ',' + longitute + '?units=si'; // Dhaka

    request(({url, json: true}), (error, {body}) => { // json: true = JSON.parse()
        if (error) {
            callback('Unable to connet to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
//            console.log(body.daily.data[0]);
            callback(undefined, body.daily.data[0].summary + ' ' + body.timezone + ' is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + ' . There is a ' + body.currently.precipProbability + ' % chance of rain.');
    }
    });
};

module.exports = forecast;

//const request = require('request');
//const forecast = (latitude, longitute, callback) => {
//    const url = 'https://api.darksky.net/forecast/95004c552f0ead05b2c79ea8d2e7de64/' + latitude + ',' + longitute + '?units=si'; // Dhaka
//
//    request(({url: url, json: true}), (error, response) => { // json: true = JSON.parse()
//        if (error) {
//            callback('Unable to connet to weather service.', undefined);
//        } else if (response.body.error) {
//            callback('Unable to find location.', undefined);
//        } else {
//            callback(undefined, response.body.daily.data[0].summary + ' ' + response.body.timezone + ' is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + ' % chance of rain.');
//        }
//    });
//};
//
//module.exports = forecast;