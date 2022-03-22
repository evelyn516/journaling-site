const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const port = process.env.port || 3000;
const fs = require('fs');
const { request } = require('http');



app.get('/', (req, res) => {
    res.send(`Welcome to our server! - From Nowshad, Sami and Evie`)
});



const storyData = require('./input.json');

app.get('/entries', (req, res) => {
    res.json(storyData)
})

app.post('/entries', (req,res) => {
    storyData.push(req.body)
    console.log(storyData)

    fs.writeFile("input.json", JSON.stringify(storyData, null, 2), function(err) {
        if (err) throw err;
        console.log('completed!');
        }
    )
    res.json({success: true})
})

app.put('/emojiUpdate', (req, res)=>{
    console.log(req.body.title)
    console.log(req.body.emoji)
 //    console.log(formData[0])
    const title = req.body.title;
    const matchingPost = storyData.find(post=> post.storyTitle ===title )
    console.log(matchingPost)
    if (req.body.emoji === 'like'){
         matchingPost.emojiCount[0]++
    } else if(req.body.emoji === 'dislike'){
         matchingPost.emojiCount[1]++
    } else if(req.body.emoji === 'love'){
         matchingPost.emojiCount[2]++
    }
 })






app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
});

