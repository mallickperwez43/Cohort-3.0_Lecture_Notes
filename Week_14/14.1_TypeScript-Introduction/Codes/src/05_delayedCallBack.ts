const delayedCall = (fn: () => void) => {
    setTimeout(fn, 1000);
};

delayedCall(() => {
    console.log("Hi There")
});