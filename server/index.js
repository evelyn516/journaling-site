const app = require('./app');
const port = process.env.port || 3000;


const fs = require('fs');
const { request } = require('http');
let posts = fs.readFileSync('datafiles.json');
let allposts = JSON.parse(posts);


app.get('/data', (req, res) => {
    res.json(allposts)
  })


app.post('/data', (req, res) => {
    const newPost = req.body;
/*     let newPost = {
        id: Date.now(),
        title: document.getElementById('story-title'),
        story: document.getElementById('story-entry'),
        comments: []
    } */
    allposts.push({newPost});
    res.send({message: `${newPost.title} successfully added to our collection.`})
})
/* fs.writeFile('datafiles.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
}); */









app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
});

