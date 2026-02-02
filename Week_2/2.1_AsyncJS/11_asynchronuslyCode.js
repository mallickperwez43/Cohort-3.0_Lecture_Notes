const fs = require("fs");

fs.readFile("a.txt", "utf-8", function(err, contents){
    console.log(contents);
});
// asynchronus method 

// made an external function
const print = (err, contents) => {
    console.log(contents);
}

fs.readFile("b.txt", "utf-8", print);

console.log("DONE!") 

// Flow 
// readFile -> a.txt -> API -> IOboundTask
// readFile -> b.txt -> API -> IOboundTask
// console.log("DONE!") -> CPUboundTask

// CPUboundtask is in the callstack so it gets executed first