
const getMax = (nums: number[]): number => {
    let maxVal: number = -Infinity;

    for (let num of nums) {
        if (num > maxVal) {
            maxVal = num;
        }
    }

    return maxVal === -Infinity ? -1 : maxVal;
};

const arr: number[] = [1, 2, 4, 8900, 13900, 2488, 21111];
const arr2: number[] = [];

const maxi: number = getMax(arr);
const maxi2: number = getMax(arr2);

console.log(maxi);
console.log(maxi2);

// Interface 

interface User {
    name: string;
    age: number;
    role: string;
};


const arr3: User[] = [{
    name: "Alex",
    age: 18,
    role: "Student"
}, {
    name: "Mercer",
    age: 21,
    role: "Student",
}, {
    name: "Ram",
    age: 35,
    role: "Professor"
}, {
    name: "Shyam",
    age: 40,
    role: "Principal"
}];

const studentList: string[] = arr3.filter((user) => user.role === "Student").map((user) => user.name);
console.log(studentList);