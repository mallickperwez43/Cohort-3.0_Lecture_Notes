const fs = require("fs");

// made a promise 
const makePromise = new Promise((resolve, reject) => {
    // what i have to do
    fs.readFile("a.txt", "utf-8", (err, content) => {
        // how i handle the result
        if(err){
            reject("Error reading file");
        }
        else{
            resolve(content);
        }
    });
});

// print the content
makePromise.then(content =>{
    console.log(content);
})

// is this better way to do it?

const setTimeoutPromisified = new Promise((resolve) =>{
    setTimeout((resolve => {
        console.log("Waited for 10 seconds");
    }) , 10000)
    resolve();
})

setTimeoutPromisified.then();