// express is a chain of middlewear

const express = require("express");

const app = express();

let requestCount = 0;

// middlewear
function requestIncreaser(req, res, next) {
    requestCount = requestCount + 1;
    console.log("Total number of request count = " + requestCount);
    next(); // giving the flow back
}

function realSumHandler(req, res) {
    // main logic
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
}

// route handler
app.get("/sum", requestIncreaser, realSumHandler);

app.listen(3000);