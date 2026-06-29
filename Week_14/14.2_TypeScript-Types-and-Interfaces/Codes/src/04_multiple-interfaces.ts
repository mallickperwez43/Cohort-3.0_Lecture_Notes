interface Dog {
    name: string,
    bark: () => void
};

interface Moneky {
    name: string,
    climb: () => void
};

interface Horse {
    name: string,
    run: () => void
};

class Animal implements Dog, Moneky, Horse {
    constructor(public name: string) {

    }

    bark = (): void => {
        console.log("Barking")
    }

    climb = (): void => {
        console.log("Climbing")
    }

    run = (): void => {
        console.log("Runing")
    }
};

const newAnimal = new Animal("Rozie");
console.log(newAnimal.name);
newAnimal.bark();
newAnimal.climb();
newAnimal.run();