// start unknow data type it is different from any data type.
    let inputData: unknown;

    inputData = "Brajesh";
    inputData = 27;

    let inputCheck: string;
    if(typeof inputData === 'string') {
        inputCheck = inputData; // in case of unknown it wil give error but in case of any it will not give any error 
    }
// end unknown


// function add(n1: number, n2: number): number {
//     return n1 + n2;
// }
// Function Data Type

// First Case
// let combinedValues = add;
// console.log(combinedValues(8,10));

// Second Case
// let combinedValues: Function;
// combinedValues = add;
// console.log(combinedValues(5,10));

// Third Case
// let combinedValues : () => number;
// that mmeans combinedValues is a function with no argument with return type is number.


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