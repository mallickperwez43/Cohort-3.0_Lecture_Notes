// interfaces can be implemented via class while types cant
// types lets us do union and intersection

interface User {
    name: string,
    age: number,
    role: string
};

type userType = {
    name: string,
    age: number,
    role: string
};

const user1: User = {
    name: "Me",
    age: 20,
    role: "Student"
};

const user2: userType = {
    name: "Me",
    age: 20,
    role: "Student"
};

console.log(typeof user1);
console.log(typeof user2);