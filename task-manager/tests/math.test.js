const {calculateTip, fahrenheightToCelsius, celsiusToFahrenheight} = require('../src/math');

test('Should calculate total with tip.', () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
//    expect(total).toBe(13);

//    if (total !== 13) {
//        throw new Error('Total tip should be 13. Got ' + total);
//    }
});
test('Should calculate total with defult tip.', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
});

test('Should convert 32 F to 0 C', () => {
    const temp = fahrenheightToCelsius(32);
    expect(temp).toBe(0);
});
test('Should convert 0 C 32 F', () => {
    const temp = celsiusToFahrenheight(0);
    expect(temp).toBe(32);
});

//test('Hello tester!', () => {
//
//});
//
//test('This should fail', () => {
//    throw new Error('Failure!');
//});