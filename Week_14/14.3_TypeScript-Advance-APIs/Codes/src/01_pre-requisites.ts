interface User {
    name: string;
    age: number;
}

const sumOfAge = (a: User, b: User): number => {
    return a.age + b.age;
};

const usersArr: User[] = [
    {
        name: "alex",
        age: 20
    },
    {
        name: "mercer",
        age: 22
    }
];

const result: number = sumOfAge(usersArr[0]!, usersArr[1]!);
console.log(`Sum of age is ${result}`);