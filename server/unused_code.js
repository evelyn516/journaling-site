
//add date and time
console.log(allposts.title);
console.log(allposts.story);

function addPost() {
/*     let title = fetch/request.params
    let story = fetch/request.params */
    //title = JSON.stringify('title')
    fs.writeFile('datafiles.json', title, postNow)
    function postNow() {
        console.log('hello')
    }
}



import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

const db = new JsonDB(new Config("myDataBase", true, false, '/'));


const fs = require('fs');

// create a JSON object
const user = {
    "id": 1,
    "name": "John Doe",
    "age": 22
};

// convert JSON object to string
const data = JSON.stringify(user);

// write JSON string to a file
fs.writeFile('user.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});


/* app.get('/data/new', (req, res) => {
    let db = fs.readFileSync('database.db');
    let helpdb = JSON.parse(db);
    res.json(helpdb);
  }) */


  
//NO LONGER WORKING
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

//const Datastore = require('nedb');

//const database = new Datastore('database.db');
//database.loadDatabase();


/* 
app.get('/data', (req, res) => {
    let posts = fs.readFileSync('datafiles.json');
    let allposts = JSON.parse(posts);
    res.json(allposts)
  })
 */
