let ans = 0;

for(let i = 0; i < 10000000; i++){
    ans += i;
}

console.log(ans);

// loop would run for "10000000" times which would take time so basically engaged CPU for that much iteration

// CALL STACK would work on every iteration (heavy task)