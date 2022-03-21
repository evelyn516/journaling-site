
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
