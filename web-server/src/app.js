const path = require('path');
const express = require('express');  // for path/rout
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebares engine and view location
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath))); // defult view

app.get('/', (req, res) => {  // overright the url using "defult view"
    res.render('index', {
        title: 'Weather APP',
        name: 'Abu bakker'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abu bakker'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Welcome for help',
        name: 'Abu bakker',
        helpText: 'This is some helpful text.'
    });
});
app.get('/help/*', (req, res) => {
    res.send('Help article not found.');
});

// app.com
// app.com/about
// app.com/contact

//app.get('', (req, res) => {  // overright the url using "defult view" 
//    res.send('<h1>Weather!</h1>');
//});

//app.get('/help', (req, res) => {
//    res.send([{
//            name: 'Abu bakker',
//            age: 27
//        }, {
//            name: 'Siddique',
//            age: 25
//        }]);
//});

//app.get('/about', (req, res) => {
//    res.send('<h1>About page</h1>');
//});

app.get('/contact', (req, res) => {
    res.send('Contact page');
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address like "?address=Asia/Dhaka"'
        });
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({
                    error: error
                });
            } else {
                forecast(latitude, longitude, (error, forecastResponseData) => {
                    if (error) {
                        return res.send({error: error});
                    }
                    res.send({
                        forcast: forecastResponseData,
                        location,
                        address: req.query.address
                    });
                });
        }
        });
    }
//    res.send({
//        forcast: 'It is comming',
//        location: 'Asia/Dhaka',
//        address: req.query.address
//    });
});
app.get('/product', (req, res) => {
    if (!req.query.search) {
        res.send({
            result: 'Please provide a search get query.'
        });
    } else {

        res.send({
            product: req.query
        });
    }
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page'
    });
});

app.listen(4000, () => {
    console.log('Server is up on port 4000.');
});