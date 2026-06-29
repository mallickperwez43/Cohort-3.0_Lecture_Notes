interface People {
    name: string,
    age: number,
    isLegal: () => boolean
};

class Manager implements People {
    constructor(public name: string, public age: number) {

    }

    isLegal = (): boolean => {
        return this.age >= 18;
    }
};

const user = new Manager("John", 21);
console.log(user.name, user.age);
console.log(user.isLegal());


// Another way

/*
interface People {
    name: string,
    age: number,
    isLegal: () => boolean
};

class Manager implements People {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    isLegal = (): boolean => {
        return this.age >= 18;
    }
};

const user = new Manager("John", 21);
console.log(user.name, user.age);
console.log(user.isLegal());

*/