var express = require('express');
var app = express();
var db = require('./database'); //ถ้าดึงเป็นไฟล์ต้องใส่ path ให้ด้วย
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));

// index page
app.get('/', function (req, res) {
res.send('Express is running');
});

app.get('/api/products',db.getAllProducts); //เร้าติ้ง

app.get('/api/json',function(req,res){ 
    res.status(200).json({
        status: 'success',
        message: 'REST API is working'
    });
});

//set port
var port = process.env.PORT || 8080;
app.listen(port, function () {
console.log('App is running on http://localhost:' + port);
});