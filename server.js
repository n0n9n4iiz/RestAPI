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
app.get('/api/products/:id',db.getProductByID);
app.post('/api/products/insert',db.insertProduct);
app.put('/api/products/update/:id', db.updateProduct);
app.delete('/api/products/delete/:id', db.deleteProduct);

app.get('/api/purchase_item', db.getPurchase_item);
app.get('/api/purchase_item/:id', db.getPurchase_itemByID);
app.post('/api/purchase_item/insert', db.insertPurchase_item);
app.post('/api/purchase_item/update/:id', db.updatePurchase_item);
app.post('/api/purchase_item/delete/:id', db.DeletePurchase_item);

app.get('/api/purchase', db.getPurchase);
app.get('/api/purchase/:id', db.getPurchaseByID);
app.post('/api/purchase/insert', db.insertPurchase);
app.post('/api/purchase/update/:id', db.updatePurchase);
app.post('/api/purchase/delete/:id', db.DeletePurchase);

app.get('/api/User', db.getUser);
app.get('/api/User/:id', db.getUserByID);
app.post('/api/User/insert', db.insertUser);
app.post('/api/User/update/:id', db.updateUser);
app.post('/api/User/delete/:id', db.DeleteUser);


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