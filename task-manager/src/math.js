const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent); // here .25 defult value
//const calculateTip = (total, tipPercent) => {
////    const tip = total * tipPercent+ total; // Wrong
//    const tip = total * tipPercent; //done
//    return total + tip
//}

module.exports = {
    calculateTip
}