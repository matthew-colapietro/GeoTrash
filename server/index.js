const express = require('express')
const http = require("http");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const mainRoutes = require('./router.js')

mongoose.connect('mongodb://localhost/trash', {useNewUrlParser: true})

const app = express()
//using cors for server to server request
app.use(cors());

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(mainRoutes)

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port);
console.log("Server listening on:", port);
