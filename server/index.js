const express = require('express');
const http = require("http");
const app = express();
const mongoose = require('mongoose');
const router = require("./router.js");
const keys = require("./config/keys");
const Trash = require("./models/TrashSchema");
const bodyParser = require('body-parser');
const cors = require('cors');
const mainRoutes = require('./router.js');

mongoose.connect(keys.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//using cors for server to server request
app.use(cors());

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

router(app);

const port = process.env.PORT || 5000;
const server = http.createServer(app);

app.use(mainRoutes)

app.listen(5000, () => {
  console.log('Node.js listening on port ' + 5000)
})
