//const doWorkPromise = new Promise((resolve, reject) => {
//    setTimeout(() => {
//        //resolve([7, 4, 1]);
//        reject('Wrong!');
//        resolve([2, 3, 2]);
//    }, 2000);
//});
//
//doWorkPromise.then((result) => {
//    console.log('Success ! ', result);
//}).catch((error) => {
//    console.log('Error ! ', error);
//});



const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
};

//add(2, 2).then((sum) => {
//    console.log('SUM: ', sum);
//    add(sum, 6).then((sum2) => {
//        console.log('SUM2: ', sum2);
//    }).catch((error) => {
//        console.log(error);
//    });
//}).catch((error) => {
//    console.log(error);
//});

// Here used duplicate some code like catch function
// Both are working same

add(2, 2).then((sum) => {
    console.log('Sum: ', sum);
    return add(sum, 6);
}).then((sum2) => {
    console.log('Sum2: ', sum2);
}).catch((error) => {
    console.log('Error: ', error);
});