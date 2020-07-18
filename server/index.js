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

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
const server = http.createServer(app);

app.use(mainRoutes)

app.listen(5000, () => {
  console.log('Node.js listening on port ' + 5000)
})
