const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//const url = 'https://api.darksky.net/forecast/95004c552f0ead05b2c79ea8d2e7de64/37.8267,-122.4233';
//const url = 'https://api.darksky.net/forecast/95004c552f0ead05b2c79ea8d2e7de64/23.8103,90.4125'; // Dhaka
//const url = 'https://api.darksky.net/forecast/95004c552f0ead05b2c79ea8d2e7de64/24.3745,88.6042?units=si&lang=bn'; // Rajshahi

//request(({url: url}), (error, response) => {
//    const data = JSON.parse(response.body);
//    console.log(data.currently);
//});
//request(({url: url, json: true}), (error, response) => { // json: true = JSON.parse()
//    // console.log(response.body.currently);
//    //if (response.body.currently.temperature > 0) {
//    console.log(response.body.currently.temperature);
//    console.log(response.body.daily.data[0].summary);
//    console.log(response.body.timezone + ' is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + ' % chance of rain.');
//    //}
//});

//const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYmFra2VyNDIiLCJhIjoiY2sxaXc2b2U4MGN5ZzNjbnc3enM4dDlkYyJ9.sfPTyIpR1jJyqpB7FIc2NA&limit=1';
//
//request(({url: geocodeUrl, json: true}), (error, response) => { // json: true = JSON.parse()
//    if (error) {
//        console.log('Unable to connet to location service');
//    } else if (response.body.features.length === 0) {
//        console.log('Unable to find location. Try another search.');
//    } else {
//        const latitude = response.body.features[0].center[1];
//        const longitude = response.body.features[0].center[0];
//        console.log(latitude, longitude);
//
//        const url = 'https://api.darksky.net/forecast/95004c552f0ead05b2c79ea8d2e7de64/23.8103,90.4125'; // Dhaka
//        request(({url: url, json: true}), (error, response) => { // json: true = JSON.parse()
//            if (error) {
//                console.log('Unable to connet to weather service');
//            } else if (response.body.error) {
//                console.log('Unable to find location.');
//            } else {
//                console.log(response.body.currently.temperature);
//                console.log(response.body.daily.data[0].summary);
//                console.log(response.body.timezone + ' is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + ' % chance of rain.');
//            }
//        });
//    }
//});

const address = process.argv[2];
//console.log(process.argv);
//console.log(address);

//if (!address) {
//    console.log('Please provaite a right address.');
//} else {
//    const data = geocode(address, (error, responseData) => {
//        if (error) {
//            return console.log(error);
//        } else {
//            forecast(responseData.latitude, responseData.longitude, (error, forecastResponseData) => {
//                if (error) {
//                    return console.log(error);
//                }
//                console.log(responseData.location);
//                console.log(forecastResponseData);
//                // console.log('Error : ', error);
//                // console.log('Data : ', forecastResponseData);
//            });
//        }
//    });
//}


if (!address) {
    console.log('Please provaite a right address.');
} else {
    const data = geocode(address, (error, {latitude, longitude, location}) => {
        if (error) {
            return console.log(error);
        } else {
            forecast(latitude, longitude, (error, forecastResponseData) => {
                if (error) {
                    return console.log(error);
                }
                console.log(location);
                console.log(forecastResponseData);
                // console.log('Error : ', error);
                // console.log('Data : ', forecastResponseData);
            });
        }
    });
}

