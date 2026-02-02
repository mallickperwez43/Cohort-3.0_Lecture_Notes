// function to find sum from 1 to n
const sum1 = (n) => {
    let s = 0;
    for(let i = 1; i <= n; i++){
        s += i;
    }
    return s;
}

let num = 10;
let ans1 = sum1(num);
console.log(ans1);