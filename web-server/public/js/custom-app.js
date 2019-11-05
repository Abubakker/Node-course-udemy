//console.log('Coustom-app.js loaded');

//fetch('http://puzzle.mead.io/puzzle').then((res) => {
//    res.json().then((data) => {
//        console.log(data);
//    });
//});


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const errorMsg = document.querySelector('.error-msg');


weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Wait...';
    messageTwo.textContent = '';
    e.preventDefault();
    const location = search.value;
    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = '';
                errorMsg.textContent = data.error;
            } else {
                errorMsg.textContent = '';
                messageOne.textContent = data.location;

                var sunriseTime = new Date(data.forcast.body.daily.data[0].sunriseTime * 1000); //sunriseTime
                var sunriseTimeH = sunriseTime.getHours();
                var sunriseTimem = "0" + sunriseTime.getMinutes();
                var sunriseTimes = "0" + sunriseTime.getSeconds();
                var ampmR = "am";
                if (sunriseTimeH > 12) {
                    sunriseTimeH -= 12;
                    ampmR = "pm";
                }
                var formattedsunriseTime = sunriseTimeH + ':' + sunriseTimem.substr(-2) + ':' + sunriseTimes.substr(-2) + ampmR;


                var sunsetTime = new Date(data.forcast.body.daily.data[0].sunsetTime * 1000); //sunsetTime
                var sunsetTimeH = sunsetTime.getHours();
                var sunsetTimem = "0" + sunsetTime.getMinutes();
                var sunsetTimes = "0" + sunsetTime.getSeconds();
                var ampm = "am";
                if (sunsetTimeH > 12) {
                    sunsetTimeH -= 12;
                    ampm = "pm";
                }
                var formattedsunsetTime = sunsetTimeH + ':' + sunsetTimem.substr(-2) + ':' + sunsetTimes.substr(-2) + ampm;

                messageTwo.textContent = data.forcast.body.daily.data[0].summary + ' ' + data.forcast.body.timezone + ' is currently ' + data.forcast.body.currently.temperature + ' degress out. This high today is ' + data.forcast.body.daily.data[0].temperatureHigh + ' with a low of ' + data.forcast.body.daily.data[0].temperatureLow + ' . There is a ' + data.forcast.body.currently.precipProbability + ' % chance of rain. Sunrise Time : ' + formattedsunriseTime + '. Sunset Time : ' + formattedsunsetTime + '.'; //sunriseTime, sunsetTime, data.forcast.body.daily.data[0].sunsetTime
                // alert(formattedsunsetTime);
//                console.log(data.forcast);
            }
        });
    });
});