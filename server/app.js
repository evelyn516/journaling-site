const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const port = 3000;

app.use(express.json());
app.use(cors());

const storyData = require('./input.json');

app.post('/test', (req,res) => {
    storyData.push(req.body)
    console.log(storyData)

    fs.writeFile("input.json", JSON.stringify(storyData, null, 2), function(err) {
        if (err) throw err;
        console.log('completed!');
        }
    )
    res.json({success: true})
})

app.get('/print', (req, res) => {
    res.json(storyData)
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}!`)
});
