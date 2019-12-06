const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent); // here .25 defult value
//const calculateTip = (total, tipPercent) => {
////    const tip = total * tipPercent+ total; // Wrong
//    const tip = total * tipPercent; //done
//    return total + tip
//}

const fahrenheightToCelsius = (temp) => (temp - 32) / 1.8;
const celsiusToFahrenheight = (temp) => (temp * 1.8) + 32;

module.exports = {
    calculateTip,
    fahrenheightToCelsius,
    celsiusToFahrenheight
};