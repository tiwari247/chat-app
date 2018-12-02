const express = require("express");
const path = require('path');

const app = express();
const port = process.env.PORT;

var finalPath = path.join(__dirname + "/../public");
console.log(finalPath);

app.use(express.static(finalPath));

app.listen(port,()=>{
    console.log(`Started at ${port}`);
});