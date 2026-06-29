// A game where we pressed keys,Up, down, right, left

// type KeyInput = "up" | "down" | "left" | "right";

enum Direction {
    Up,
    Down,
    Left,
    Right
}

const doSomething = (keyPressed: Direction): string => {
    if (keyPressed === Direction.Up) {
        return "Up key pressed";
    }
    else if (keyPressed === Direction.Down) {
        return "Down key pressed";
    }
    else if (keyPressed === Direction.Left) {
        return "Left key pressed";
    }
    else if (keyPressed === Direction.Right) {
        return "Right key pressed";
    }

    return "Wrong key";
};

console.log(doSomething(Direction.Up));
console.log(doSomething(Direction.Down));
console.log(doSomething(Direction.Left));
console.log(doSomething(Direction.Right));