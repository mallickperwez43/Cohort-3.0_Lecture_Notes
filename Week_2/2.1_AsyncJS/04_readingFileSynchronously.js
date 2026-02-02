// importing a library -> fs -> file system
const fs = require("fs");

// synchronous way to read a file 
// readFileSync(path, optional(encoding))


// const content = fs.readFileSync("D:\\Cohort\\Cohort-3.0_Lecture_Notes\\Week2.1_AsyncJS\\a.txt", "utf-8"); // escape sequence
const content = fs.readFileSync("a.txt", "utf-8");
console.log(content);