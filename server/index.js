

const port = process.env.port || 3000;

const app = require('./app')

app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
});

