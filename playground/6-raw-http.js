const https = require('https');
const latitude = '23.8103';
const longitute = '90.4125';
const url = 'https://api.darksky.net/forecast/95004c552f0ead05b2c79ea8d2e7de64/' + latitude + ',' + longitute + '?units=si'; // Dhaka

const request = https.request(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data = data + chunk.toString(); // convert a string
    });
    res.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on('error', (error) => {
    console.log('An error: ', error);
});

request.end();