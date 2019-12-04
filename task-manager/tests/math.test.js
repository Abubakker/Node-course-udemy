const {calculateTip} = require('../src/math');

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

//test('Hello tester!', () => {
//
//});
//
//test('This should fail', () => {
//    throw new Error('Failure!');
//});