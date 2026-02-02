// Promise class gives us a promise , that I will return you something in the future

// the class
// class Promise {
//   constructor(executor) {
//     this.executor = executor;
//   }
//   then(onFulfilled, onRejected) {
//     return new Promise((resolve, reject) => {
//       this.executor(resolve, reject);
//     });
//   }
// }

// callback based approach
// promise based approach
// both can be used to get the result for async function
/*
function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); // returning an object of Promise
}
  
function callback() {
    console.log("3 seconds have passed");
}
  
setTimeoutPromisified(3000).then(callback);

let p = setTimeoutPromisified(5000);
console.log(p);

setTimeoutPromisified(5000).then(callback);
console.log(p); 

function waitFor3s(resolve){
    setTimeout(resolve, 3000);
}

function main() {
    console.log("main is called");
}

waitFor3s(main);
*/
function random(resolve){ // resolve is also a function
    setTimeout(resolve,3000);
}

let p = new Promise(random);
// console.log(p);  // current state of promise

function callback(){
    console.log("promise succeded");
}
p.then(callback);