const fs = require("fs");

// first do this 
const contents = fs.readFileSync("a.txt", "utf-8");
console.log(contents);

// second
const contents2 = fs.readFileSync("b.txt", "utf-8");
console.log(contents2);

// third
const contents3 = fs.readFileSync("b.txt", "utf-8");
console.log(contents3);

// the contents2 and contents3 task have to wait until contents is fully executed 
// this nature is synchronous nature of JS