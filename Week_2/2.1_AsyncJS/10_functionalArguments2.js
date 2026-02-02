function sum(a, b) {
    return a + b;
}
  
function multiply(a, b) {
    return a * b;
}
  
function subtract(a, b) {
    return a - b;
}
  
function divide(a, b) {
    return a / b;
}


// passing the fucntion itself as an argument is functional argument 
// helps to generic code writing 
function doOperation(a, b, op) {
    return op(a, b)
}
  
console.log(doOperation(1, 2, sum));
console.log(doOperation(1, 2, subtract));
console.log(doOperation(1, 2, divide));
console.log(doOperation(1, 2, multiply));