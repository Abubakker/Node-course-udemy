const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

        if (!user) {
            throw new Error('User not found. or somthing wrong!');
        }

        req.token = token;
        req.user = user;
        next();
    } catch (exception) {
        res.status(401).send({error: 'Authentication error. Please check authentication.'});
    }

};

module.exports = auth;

//const jwt = require('jsonwebtoken');
//
//const myJwtFunction = async () => {
//    const token = jwt.sign({_id: 'bakker123'}, 'thisismynodejscourse', {expiresIn: '7 days'});
//    console.log(token);
//    const data = jwt.verify(token, 'thisismynodejscourse');
//    console.log(data);
//};
//myJwtFunction();