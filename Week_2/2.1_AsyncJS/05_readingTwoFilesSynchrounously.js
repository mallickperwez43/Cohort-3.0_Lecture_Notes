// importing a library -> fs -> file system
const fs = require("fs");

// synchronous way to read a file 
// readFileSync(path, optional(encoding))
// const content = fs.readFileSync("D:\\Cohort\\Cohort-3.0_Lecture_Notes\\Week2.1_AsyncJS\\a.txt", "utf-8");
const content = fs.readFileSync("a.txt", "utf-8");
console.log(content);

const content2 = fs.readFileSync("D:\\Cohort\\Cohort-3.0_Lecture_Notes\\Week2.1_AsyncJS\\b.txt", "utf-8"); // escape sequence in file
console.log(content2)

// Reads the file at location provided & displayes the content inside 