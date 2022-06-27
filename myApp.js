let express = require('express');
let app = express();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  //res.send("Hello Express");
  console.log(process.env.MESSAGE_STYLE);
  res.sendFile( __dirname + "/views/index.html" );
});

app.get("/json", (req, res) => {
  let msg = process.env.MESSAGE_STYLE === "uppercase" ? {"message": "HELLO JSON"} : {"message": "Hello json"};
  res.json(msg);
})




































 module.exports = app;
