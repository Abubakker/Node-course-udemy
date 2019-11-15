const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a<0||b<0){
                return reject('Please provide a positive number for add.');
            }
            resolve(a + b);
        }, 2000);
    });
};

const doWork = async () => {
    const sum = await add(1, -99);
    const sum2 = await add(sum, 50);
    const sum3 = await add(sum2, -50);
    return sum3;
};

doWork('asd').then((result) => {
    console.log('Result: ', result);
}).catch((error) => {
    console.log('Error: ', error);
});