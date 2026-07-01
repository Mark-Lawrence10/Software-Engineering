const express = require("express");

var app = express();

app.set('view engine', 'pug');
app.set('views', './app/views');

app.use(express.static("static"));

const db = require('./services/db');

app.get("/db_test", function(req, res) {

    let sql = "SELECT * FROM test_table";

    db.query(sql).then(results => {

        console.log(results);

        res.render("db", {
            data: results
        });

    });

});

app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

app.get("/", function(req, res) {

var test_data = ['one', 'two', 'three', 'four'];

res.render("index", {'title':'My index page', 'heading':'My heading', 'data':test_data})
});

app.get("/hello/:name", function(req, res) {
    console.log(req.params);
    res.send("Hello " + req.params.name);
});

app.get("/all-students-formatted", function(req, res) {

    var sql = 'select * from Students';

    db.query(sql).then(results => {
        res.render('all-students', { data: results });

    });

});

app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});