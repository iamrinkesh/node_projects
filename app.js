// const http = require('http'); //don't require here as we are using the express listen function
const express = require('express'); //get the express dependencies
const path = require('path');
const app = express(); //is the function from express dependencies
//app contains many useful functions
const bodyParser = require('body-parser');

const {adminRoutes, products} = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./helper/path');

app.use(bodyParser.urlencoded({extended: false})); //to parse the body passing json or through form etc.

app.use(shopRoutes);
app.use('/admin',adminRoutes); //filtering that the routes with /admin can entertain

app.use(express.static(path.join(__dirname,'/public'))); //to define the public folder as static and readable

app.use((req, res, next) => { //if path not found then need to through page not found 404 error
    // res.status(404).send('<h1>404 Not Found</h1>');
    res.status(404).sendFile(path.join(rootDir,'views', '404.html'));
})


// const server = http.createServer(app); 

app.listen(3000); //create the server and also listen the port the function in app