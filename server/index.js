const app = require('./app');
const port = process.env.port || 3000;
const Datastore = require('nedb');

const database = new Datastore('database.db');
database.loadDatabase();

const fs = require('fs');
const { request } = require('http');
let posts = fs.readFileSync('datafiles.json');
let allposts = JSON.parse(posts);


app.get('/data', (req, res) => {
    res.json(allposts)
  })



app.post('/data/new', (req, res) => {
    const newPost = req.body;
    console.log('NEW POST TO RANDOM STORIES');
    console.log(newPost);
    database.insert(newPost);
    res.json({
        status: "success",
        timestamp: newPost.timestamp,
        title: newPost.title,
        story: newPost.story
    });
});
/* fs.writeFile('datafiles.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
}); */









app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
});

