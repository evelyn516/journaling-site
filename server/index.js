const app = require('./app');
const port = process.env.port || 3000;

let allPosts = loadJSON('datafiles.json')

app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
});
