// setTimeOut -> takes a callback function and a time in milliseconds(optional)
// sets the timer in web api -> and some other task is executed until then 
// then it comes to the callback queue and goes to the call stack when its free

console.log("Hello!"); // prints first

const timeOut = () => {
    console.log("I will run after 1s"); // when came back to callback queue amd entered into call stack this would run
}

setTimeout(timeOut, 1000); // waits for 1 second until came back from api 

console.log("I will run now"); // prints second 