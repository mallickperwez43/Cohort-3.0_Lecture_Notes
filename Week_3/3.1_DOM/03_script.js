function addTodo() {
    // getting the reference of the input
    const inputEL = document.querySelector("input")
    console.log(inputEL.value)
}

let counter = 0;

function callback(){
    const el = document.querySelectorAll("h1")[1];
    counter++;
}
setInterval(callback(), 1000);