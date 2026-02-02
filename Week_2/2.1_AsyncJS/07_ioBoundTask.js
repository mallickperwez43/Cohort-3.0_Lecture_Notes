const fs = require("fs");

const contents = fs.readFileSync("a.txt", "utf-8"); // go to file a.txt using WEB API
// obtain the information
// come to callbackqueue and when call stack would be free so we would store it in there 
console.log(contents);