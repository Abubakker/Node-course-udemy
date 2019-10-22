/* 
 * Object property shorthand
 */
const name = 'Abu bakker';
const userAge = 27;

const userInfo = {
    name,
    //age: userAge, // Object property shorthand
    userAge,
    location: 'Dhaka'
};

// console.log(userInfo);

/* 
 * Object destructuring
 */

const product = {
    lable: 'Red notebook',
    weight: '100gm',
    price: 30,
    stock: 200,
    salePrice: undefined,
    rating: 4.2
};

//const lable = product.lable;
//const price = product.price;
//console.log(product);
//console.log(lable);
//console.log(price);

//const {lable:productLabel, price, stock, rating=5}= product;
//console.log(productLabel);
//console.log(price);
//console.log(rating);

const transaction = (type, {label, price = 0} = {}) => {
    console.log(type, label, price);
};

transaction('Order', product);
transaction('Order');