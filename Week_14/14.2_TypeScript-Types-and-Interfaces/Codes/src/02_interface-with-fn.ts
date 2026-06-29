interface People {
    name: string,
    age: number,
    greet: () => string
};

const person: People = {
    name: "Abcd",
    age: 20,
    greet: () => {
        return "Hello"
    }
}

console.log(person.greet());