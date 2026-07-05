interface User {
    id: string;
    name: string;
    age: number;
    email: string;
    password: string;
}

type UpdateProps = Pick<User, "name" | "age" | "password">;


const updateUser = (user: User, updatedProps: UpdateProps): User => {
    // simulate DB update
    const newUser: User = {
        ...user,
        ...updatedProps
    };

    return newUser;
};

const userOne: User = {
    id: "1021",
    name: "Alex",
    age: 21,
    email: "alex@1.com",
    password: "1212412"
};

const userDetails: UpdateProps = {
    name: "Alex Mercer",
    age: 22,
    password: "12140281"
};

console.log("Before Update details: ");
console.log(userOne);

const updatedUser = updateUser(userOne, userDetails);

console.log("After Update details: ");
console.log(updatedUser);