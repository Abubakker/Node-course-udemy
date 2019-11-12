//setTimeout(() => {
//    console.log('Two seconds are up');
//}, 2000);
//
//
//
//const names = ['Abu', 'Bakker', 'Siddique'];
//const shortName = names.filter((name) => {
//    return name.length === 6;
//});
//
//const geocode = (address, callback) => {
////    const data = {
////        latitude: 0,
////        longitute: 0
////    };
////    return data;
//    setTimeout(() => {
//        const data = {
//            latitude: 0,
//            longitute: 0
//        };
//        callback(data);
//    }, 2000);
//};
//
////const data = geocode('Bangladesh');
////console.log(data);
//
//geocode('Bangladesh', (data) => {
//    console.log(data);
//});

//const add = (a, b, callback) => {
//    setTimeout(() => {
//        return callback(a + b);
////        const data = a + b;
////        return callback(data);
//    }, 2000);
//};
//add(2, 3, (sum) => {
//
//    console.log(sum);
//});

const doWorkCallback = (callback) => {
    setTimeout(() => {
        //callback('User define error!', undefined);
        callback(undefined, [1, 4, 7]);
    }, 2000);
};

doWorkCallback((error, result) => {
    if (error) {
        return console.log(error);
    }
    console.log(result);
});