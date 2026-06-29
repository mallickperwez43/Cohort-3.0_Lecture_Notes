abstract class User {
    name: string

    constructor(name: string) {
        this.name = name;
    }

    abstract greet: () => string

    hello = (): void => {
        console.log("Hi There")
    }
};

class Employee extends User {
    name: string

    constructor(name: string) {
        super(name)
        this.name = name;
    }

    greet = (): string => {
        return `Hello ${this.name}`
    }
}

const mukesh = new Employee("Mukesh");

mukesh.hello();
const saluate: string = mukesh.greet();
console.log(saluate);