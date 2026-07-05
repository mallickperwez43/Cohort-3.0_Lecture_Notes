// creating a memmber of interface as readOnly

interface User {
    name: string;
    age: number;
    readonly isLegal: boolean;
};

const user: User = {
    name: "Alex",
    age: 21,
    isLegal: true
};

console.log(user);

user.age = 23; // can update age 

console.log(user);

// user.isLegal = false; // gives error because isLegal is readOnly property


// 2] Whole object as readOnly

interface Shape {
    sides: number;
    area: string
};

const square: Readonly<Shape> = {
    sides: 4,
    area: "side * side"
}

console.log(square);