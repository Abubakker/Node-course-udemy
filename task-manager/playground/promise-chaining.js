require('../src/db/mongoose');
const User = require('../src/models/user');

//User.findByIdAndUpdate('5dcd29f0d3cff51c68389235', {age: 25}).then((user) => {
//    console.log(user);
//    return User.countDocuments({age: 25});
//}).then((result) => {
//    console.log(result);
//}).catch((error) => {
//    console.log(error);
//});

const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return count;
};

updateAgeAndCount('5dcd29f0d3cff51c68389235', 28).then((count) => {
    console.log('Find users: ', count);
}).catch((error) => {
    console.log(error);
});