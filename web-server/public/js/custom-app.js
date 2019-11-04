console.log('Coustom-app.js loaded');

//fetch('http://puzzle.mead.io/puzzle').then((res) => {
//    res.json().then((data) => {
//        console.log(data);
//    });
//});


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Wait...';
    messageTwo.textContent = '';
    e.preventDefault();
    const location = search.value;
    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forcast;
//                console.log(data);
//                console.log(data.forcast);
            }
        });
    });
});