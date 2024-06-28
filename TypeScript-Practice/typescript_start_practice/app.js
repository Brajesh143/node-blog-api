function add(n1, n2) {
    return n1 + n2;
}
// Function Data Type
// First Case
// let combinedValues = add;
// console.log(combinedValues(8,10));
// Second Case
var combinedValues;
combinedValues = add;
console.log(combinedValues(5, 10));
// const printAdd = add(10, 15);
// console.log(printAdd);
// function combinedType(n1: number | string, n2: number | string) {
//     let result;
//     if(typeof n1 === 'number' && typeof n2 === 'number') {
//         result = n1 + n2;
//     } else {
//         result = n1.toString() + n2.toString();
//     }
//     return result;
// }
// const combinedNumber = combinedType(10, 20);
// console.log(combinedNumber);
// const combineString = combinedType("Max", "Haircut");
// console.log(combineString);
