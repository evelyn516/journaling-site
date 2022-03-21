const app = require('./app');
const port = process.env.port || 3000;


const fs = require('fs');
const { request } = require('http');
let posts = fs.readFileSync('datafiles.json');
let allposts = JSON.parse(posts);
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

app.get('/data', (req, res) => {
    res.json(allposts)
  })




app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
});

