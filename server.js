const express = require('express')
const app = express()
const cors = require('cors')

var mysql = require('mysql')

var con = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "quantum_pearl"
});

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(8000, () => {
    console.log('Server Started')
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to Database!")
});

app.route('/api/register').post((req, res) => {
    const postBody = req.body;
    var passHash = password_hash(postBody.password, PASSWORD_DEFAULT);
    var time = Date.now();
    var sql = 'INSERT INTO Users VALUES ? ';
    let data = [NULL, postBody.depId, postBody.name, postBody.surname, postBody.email, 'user', '', time, time, time, passHash, 'pending', 0]
    con.query(sql, [data], function (err, result) {
        if (err) throw err;
        res.send(result);
    })
})

app.route('/api/getRecords').get((req, res) => {
    var sql = "SELECT * FROM records"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
})