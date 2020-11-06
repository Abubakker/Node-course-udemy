const socket = io();

// Elements
const $messageForm = document.querySelector('#messageForm');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#sendLocation');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#messageTemplate').innerHTML;
const locationTemplate = document.querySelector('#locationTemplate').innerHTML;

// Options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {message: message.text, createdAt: moment(message.createdAt).format('hh:mm a')});
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (url) => {
    console.log(url);
    const html = Mustache.render(locationTemplate, {url: url.url, createdAt: moment(url.createdAt).format('hh:mm a')});
    $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled');

    // disable
    const message = e.target.elements.message.value; // same code :: document.querySelector('input').value;
    // Acknowledgement process
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        // enable
        if (error) {
            return console.log(error);
        }
        console.log('Message delivered!');
    });
    // Normal process
    // socket.emit('sendMessage', message);
});

$sendLocationButton.addEventListener('click', (e) => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.');
    }

    $sendLocationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (error) => {
            $sendLocationButton.removeAttribute('disabled');
            console.log('Location shared!');
        });
    });
//    // Normal process
//    navigator.geolocation.getCurrentPosition((position) => {
//        // console.log(position);
//        socket.emit('sendLocation', {
//            latitude: position.coords.latitude,
//            longitude: position.coords.longitude
//        });
//    });

//    const message = e.target.elements.message.value; // same code :: document.querySelector('input').value;
//    socket.emit('sendMessage', message);
});


//socket.on('countUpdated', (count) => {
//    console.log('The count has been updated!', count);
//});
//
//document.querySelector('#increment').addEventListener('click', () => {
//    console.log('clicked');
//    socket.emit('increment');
//});

socket.emit('join', {username, room}, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});