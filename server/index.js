const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const port = process.env.port || 3000;
const fs = require('fs');
const { request } = require('http');

function updateJson() {
    fs.writeFile("input.json", JSON.stringify(storyData, null, 2), function(err) {
        if (err) throw err;
        console.log('Added story data to the array!');
        }
    )
};



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

    updateJson();
    res.json({success: true})
})

app.put('/emojiUpdate', (req, res)=>{
    console.log(req.body)
    // console.log(req.body.emoji)
    const idx = req.body.id;
    const matchingPost = storyData.find(post=> post.id.toString() === idx )
    console.log(matchingPost)
    if (req.body.emoji === 'like'){
         matchingPost.emojiCount[0]++
    } else if(req.body.emoji === 'dislike'){
         matchingPost.emojiCount[1]++
    } else if(req.body.emoji === 'love'){
         matchingPost.emojiCount[2]++
    }
    updateJson();
 })


 app.put('/comments', (req, res)=>{
    console.log(req.body)
    const idx = req.body.id;
    const matchingPost = storyData.find(post=> post.id === idx)
    console.log(matchingPost);
    matchingPost.comments.push(req.body.comment)
    updateJson();
})




app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
});


