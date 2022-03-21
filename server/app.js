const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send(`Welcome to our server! - From Nowshad, Sami and Evie`)
});



module.exports = app;
