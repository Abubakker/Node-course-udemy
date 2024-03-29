//const square = function(x){
//    return x * x;
//};

//const square = (x) => {
//    return x * x;
//};

//const square = (x) => x * x;
//
//console.log(square(3));

//const event = {
//    name: 'Birthday Party',
//    printGuestList: function () {
//        console.log('Guest list for ' + this.name);
//    }
//};

//const event = {
//    name: 'Birthday Party',
//    printGuestList: () => {
//        console.log('Guest list for your ' + this.name);
//    }
//};


//const event = {
//    name: 'Birthday Party',
//    guestList: ['Abu', 'bakker', 'siddique', 'Rana'],
//    printGuestList() {
//        const that = this;
//        console.log('Guest list for your ' + that.name);
//        this.guestList.forEach(function (guest) {
//            console.log(guest + ' is attending ' + that.name);
//        });
//    }
//};

const event = {
    name: 'Birthday Party',
    guestList: ['Abu', 'bakker', 'siddique', 'Rana'],
    printGuestList() {
        //const that = this;
        console.log('Guest list for your ' + this.name);
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name);
        });
    }
};


event.printGuestList();