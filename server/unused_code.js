
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
