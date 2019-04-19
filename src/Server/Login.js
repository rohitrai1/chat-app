exports.login = function(req, res) {
  const { body } = req;
  console.log("req===>", body);
  var email = req.body.username;
  var password = req.body.password;
  const dbName = "web_auth";
  const MongoClient = require("mongodb").MongoClient;
  const url = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(url);
  const db = client.db(dbName);
  db.collection("Users").findOne({ email: [email] }, function(err, result) {
    if (err) {
      res.send({ code: 400, failed: "error ocurred" });
    } else {
      if (results.length > 0) {
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
};
