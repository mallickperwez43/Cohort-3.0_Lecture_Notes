function timeout() {
    console.log("Click the button!");
}
  
console.log("Hi!");
  
// IO task 
setTimeout(timeout, 1000);
  
console.log("Welcome to Loupe!");
  
let c = 0;
  
// CPU intensive task
for (let i = 0; i < 10000000000; i++) {
    c = c + 1;
}
  
console.log("Expensive operation done!");

// If cpu is busy on a task while api returned something in callback queue
// because the call stack is already busy
// so it would finish that and then take the callback queue and execute it