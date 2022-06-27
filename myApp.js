let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use("/public", express.static(__dirname + "/public"));

app.use("/", (req, res, next)=> {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", (req, res) => {
  //res.send("Hello Express");
  console.log(process.env.MESSAGE_STYLE);
  res.sendFile( __dirname + "/views/index.html" );
});

app.get("/json", (req, res) => {
  let msg = process.env.MESSAGE_STYLE === "uppercase" ? {"message": "HELLO JSON"} : {"message": "Hello json"};
  res.json(msg);
});

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({ "time": req.time });
});

app.get('/:word/echo', (req, res) => {
    console.log(req.params.word);
    res.send({ "echo": req.params.word });
});

let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);

app.route('/name')
    .get((req, res) => {
        console.log(req.query);
        let firstName = req.query.first;
        let lastName = req.query.last;
        res.send({ "name": firstName + " " + lastName });
    })
    .post((req, res) => {
        res.send({ "name": req.body.first + " " + req.body.last });
    });


































 module.exports = app;
