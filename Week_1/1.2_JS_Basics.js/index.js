let firstName = "Harkirat";
const age = 30;
var isStudent = true;

console.log(firstName);
console.log(age);
console.log(isStudent);

isStudent = "Harkirat";
isStudent = 10;
console.log(isStudent);

// var, let, const -> 3 ways to define a variable
let isStud = "Har";
const friend = "Ajay";
// friend = "Anil";
// console.log(friend); -> cannot assign a new value to friend as it was const 

// array
let users = ["harkirat", "raman", "asad"];
console.log(users[1]) // raman

// function
function sum(a, b){
    let totalSum = a + b;
    return totalSum;
}

let ans = sum(1, 2);
let ans1 = sum(3, 4);

console.log(ans);
console.log(ans1);

let ans2 = sum('1', 2);
console.log(ans2);
console.log(typeof ans2);

let a = '1';
console.log(a);
console.log(typeof a);
a = Number.parseInt(a);
console.log(a);

function canVote(n){
    if(n > 18){
        return "can Vote";
    }
    else{
        return "cant Vote";
    }
}

let v1 = 23;
let v2 = 12;

let person1 = canVote(v1);
let person2 = canVote(v2);
console.log(person1); 
console.log(person2); 
// object -> key value pair => collection key -> string , value -> any data type of JS
let user = {
    firstname : "Harkirat",
    age : 19
}

// function to greet
function greet(user){
    console.log("Hi " + user.name + " your age is " + user.age);
} 

const users2 = {
    name: "harkirath",
    age: 21,
    gender: "male"
}