// interfaces vs types
// create two types called User and Admin
// create a function that takes either a user or an admin as an input and returns a string saying "Welcome [name]".

interface Admin {
    name: string;
    role: string;
    permissions: string;
};

interface User {
    name: string;
    age: number;
    entry: Date;
};

type UserOrAdmin = User | Admin; // Union
type UserAndAdmin = User & Admin; // Intersection

const greet = (user: UserOrAdmin): string => {
    return `Welcome ${user.name}`;
};

const roleAbout = (user: UserAndAdmin): string => {
    return `Welcome ${user.name} & your role is ${user.role}`;
};

const userUnion: UserOrAdmin = {
    name: "Alex",
    role: "Admin",
    age: 21,
    permissions: "canFire, canEmployee",
    entry: new Date()
}

const userIntersection: UserAndAdmin = {
    name: "Mercer",
    role: "User",
    age: 21,
    permissions: "isEmployee",
    entry: new Date()
}

const welcomeGreet: string = greet(userUnion);
const roleInfo: string = roleAbout(userIntersection);

console.log(welcomeGreet);
console.log(roleInfo);