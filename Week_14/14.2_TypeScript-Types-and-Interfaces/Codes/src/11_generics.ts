// Given an array of type number or a string and return the first element of that array

type Input = number | string | undefined;

const firstEl = (arr: Input[]): Input => {
    if (arr.length >= 1) {
        return arr[0]!; // The '!' tells TS: "I promise this isn't undefined"
    }

    return "Doesnt exist"
}

console.log(firstEl([1, 2, 3]));          // 1
console.log(firstEl(["Apple", "Banana"])); // "Apple"
console.log(firstEl([]));                 // "Doesnt exist"


// Problems
// 1] User can send anytype of data to the array, even mixed data[1, 2, "asda"]
// 2] The return type isnt inferred by ts


// Solution (Use Generics)

const getFirstEl = <T>(arr: T[]): T | undefined => {
    if (arr.length >= 1) {
        return arr[0]; // The '!' tells TS: "I promise this isn't undefined"
    }

    return undefined;
}

const val1 = getFirstEl<number>([1, 2, 3]);       // TS knows val1 is a number
const val2 = getFirstEl<string>(["a", "b", "c"])?.toUpperCase(); // TS knows val2 is a string
const val3 = getFirstEl([]);

console.log(val1);
console.log(val2);
console.log(val3);