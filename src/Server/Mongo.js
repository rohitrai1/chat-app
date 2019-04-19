const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const express = require("express");
const cors = require("cors");
var login = require("./Login");
var router = express.Router();
const bodyParser = require("body-parser");
let db = "";
// Connection URL
const url = "mongodb://127.0.0.1:27017";

// Database Name
const dbName = "web_auth";

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db = client.db(dbName);
});

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.get("/users", (req, res) => {
  db.collection("Users").findOne({ email: "rohit47099@gmail.com" }, function(
    err,
    result
  ) {
    res.send(result);
    console.log(res);
  });
});

app.post("/login", (req, res) => {
  var email = req.body.username;
  console.log(email);
  var password = req.body.password;
  const db = client.db(dbName);
  db.collection("Users").findOne({ email: email }, function(err, results) {
    if (err) {
      res.send({ code: 400, failed: "error ocurred" });
    } else {
      console.log(results);
      if (results && results.length > 0) {
        if (results[0].password == password) {
          res.send({
            code: 200,
            success: "login sucessfull"
          });
        } else {
          res.send({
            code: 204,
            success: "Email and password does not match"
          });
        }
      } else {
        res.send({
          code: 204,
          success: "Email does not exits"
        });
      }
    }
  });
});

app.listen("2000", () => {
  console.log("Server started n port 2000");
});
