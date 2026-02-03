const express = require('express');
const cors = require('cors');

const app = express();

const port = 3000;

app.use(express.json()); // middleware
app.use(cors());

app.post('/sum', (req, res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        result: a + b
    })
});

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
});