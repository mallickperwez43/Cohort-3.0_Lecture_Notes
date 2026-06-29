interface Address {
    city: string,
    country: string,
    pincode: number
}

interface User {
    name: string,
    age: number,
    address?: Address
};

interface Office {
    address: Address
}

// ? marked as optional

const user: User = {
    name: "Alex",
    age: 25,
    address: {
        city: "Mumbai",
        country: "India",
        pincode: 400070
    }
};

const user2: User = {
    name: "Mercer",
    age: 17
}

const isLegal = (user: User): boolean => {
    return user.age >= 18;
};

console.log(`Is Alex eligible for voting: ${isLegal(user)}`);
console.log(`Is Mercer eligible for voting: ${isLegal(user2)}`);