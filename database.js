const pgp = require('pg-promise')(); //ใช้ติดต่อ db
var db = pgp('postgres://ngrngfvwmjohqq:53c6e42c6c36a1e55cfd9f56460408fb4582eb4b4bfe6ce9f2f95b86a23d5887@ec2-54-243-61-194.compute-1.amazonaws.com:5432/dbka26q0kvcst3?ssl=true');
// Add queries here

function getAllProducts(req, res) {
    db.any('select * from products')
    .then(function (data) {
    res.status(200) 
    .json({
    status: 'success',
    data: data,
    message: 'Retrieved ALL products'
    });
    })
    .catch(function (error) {
    console.log(error);
    res.status(500) 
    .json({
    status: 'failed',
    data: data,
    message: 'Failed To Retrieved ALL products'
    });
    })
    }
//SELECT BY ID
    function getProductByID(req, res) {
        db.any('select * from products where id =' + req.params.id)
        .then(function (data) {
        res.status(200)
        .json({
        status: 'success',
        data: data,
        message: 'Retrieved products id:' + req.params.id
        });
        })
        .catch(function (error) {
            console.log(error);
            res.status(500)
            .json({
            status: 'Failed',
            data: data,
            message: 'Failed To Retrieved products id:' + req.params.id
            });
        })
        }
//INSERT
        function insertProduct(req, res) { //db none คือไม่ส่งอะไรออกไปให้ client
            db.none('insert into products(id, title, price, created_at, tags)' +
            'values(${id}, ${title}, ${price}, ${created_at}, ${tags})',
            req.body)
            .then(function (data) {
            res.status(200)
            .json({
            status: 'success',
            message: 'Inserted one product'
            });
            })
            .catch(function (error) {
            console.log('ERROR:', error)
            })
            }

            function updateProduct(req, res) { //db none คือไม่ส่งอะไรออกไปให้ client
                db.none('UPDATE products SET price = ${price} where id =' + req.params.id,req.body)
                .then(function (data) {
                res.status(200)
                .json({
                status: 'success',
                message: 'Update one product'
                });
                })
                .catch(function (error) {
                console.log('ERROR:', error)
                })
                }

                function deleteProduct(req, res) { //db none คือไม่ส่งอะไรออกไปให้ client
                    db.none('DELETE FROM products where id =' + req.params.id,req.body)
                    .then(function (data) {
                    res.status(200)
                    .json({
                    status: 'success',
                    message: 'DELETE one product'
                    });
                    })
                    .catch(function (error) {
                    console.log('ERROR:', error)
                    })
                    }

                    function getPurchase_item(req, res) {
                        db.any('select * from purchase_items')
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        status: 'success',
                                        data: data,
                                        message: 'Retrieved ALL Purchase_item'
                                    });
                            })
                            .catch(function (error) {
                                console.log('ERROR:', error)
                            })
                    }
                    
                    function DeletePurchase_item(req, res) {
                        db.any('DELETE from purchase_items where id=' + req.params.id)
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        status: 'success',
                                        message: 'Delete id=' + req.params.id
                                    })
                            })
                            .catch(function (error) {
                                console.log('ERROR:', error)
                            })
                        db.any('select * from purchase_items').then(function (data) {
                            res.status(200)
                                .json({
                                    status: 'success',
                                    data: data,
                                    message: 'Delete id=' + req.params.id
                                });
                        })
                    }
                    
                    
                    function updatePurchase_item(req, res) {
                        db.any('update purchase_items set purchase_id=${purchase_id},product_id=${product_id},price=${price},quantity=${quantity},state=${state} where id =' + req.params.id,
                            req.body)
                            .then(function (data) {
                                res.status(200).json({
                                    status: 'success',
                                    data: data,
                                    message: 'Update Purchase_item id='+req.params.id
                                });
                            })
                            .catch(function (error) {
                                console.log('ERROR:', error)
                            })
                    }
                    
                    function insertPurchase_item(req, res) {
                        db.any('insert into purchase_items(id, purchase_id, product_id,price,quantity,state)' +
                            'values(${id}, ${purchase_id}, ${product_id}, ${price}, ${quantity}, ${state})',
                            req.body)
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        status: 'success',
                                        message: 'Inserted one Purchase_item'
                                    });
                            })
                            .catch(function (error) {
                                console.log('ERROR:', error)
                            })
                    
                        db.any('select * from purchase_items').then(function (data) {
                            res.status(200)
                                .json({
                                    status: 'success',
                                    data: data,
                                    message: 'Delete id=' + req.params.id
                                });
                        })
                    }
                    
                    
                    
                    function getPurchase_itemByID(req, res) {
                        db.any('select * from purchase_items where id =' + req.params.id)
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        status: 'success',
                                        data: data,
                                        message: 'Retrieved Purchase_items id:' + req.params.id
                                    });
                            })
                            .catch(function (error) {
                                res.status(500)
                                    .json({ status: "fail", message: "Mission Fail get back" })
                                console.log('ERROR:', error)
                            })
                    }
                    
                    function getPurchase(req, res) {
                        db.any('select * from purchases')
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        status: 'success',
                                        data: data,
                                        message: 'Retrieved ALL Purchase'
                                    });
                            })
                            .catch(function (error) {
                                console.log('ERROR:', error)
                            })
                    }
                    
                    function DeletePurchase(req, res) {
                        db.any('DELETE from purchases where purchase_id=' + req.params.id)
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        status: 'success',
                                        message: 'Delete id=' + req.params.id
                                    })
                            })
                            .catch(function (error) {
                                console.log('ERROR:', error)
                            })
                        db.any('select * from purchases').then(function (data) {
                            res.status(200)
                                .json({
                                    status: 'success',
                                    data: data,
                                    message: 'Delete id=' + req.params.id
                                });
                        })
                    }
                    
                    
                    function updatePurchase(req, res) {
                        db.any('update purchases set created_at=${created_at},name=${name},address=${address},state=${state},zipcode=${zipcode},user_id=${user_id} where purchase_id =' + req.params.id,
                            req.body)
                            .then(function (data) {
                                res.status(200).json({
                                    status: 'success',
                                    data: data,
                                    message: 'Update Purchase id='+req.params.id
                                });
                            })
                            .catch(function (error) {
                                console.log('ERROR:', error)
                            })
                    }
                    
                    function insertPurchase(req, res) {
                        db.any('insert into purchases(purchase_id,created_at,name,address,state,zipcode,user_id)' +
                            'values(${purchase_id}, ${created_at}, ${name}, ${address}, ${state},${zipcode},${user_id})',
                            req.body)
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        status: 'success',
                                        message: 'Inserted one Purchase'
                                    });
                            })
                            .catch(function (error) {
                                console.log('ERROR:', error)
                            })
                    
                        db.any('select * from purchases').then(function (data) {
                            res.status(200)
                                .json({
                                    status: 'success',
                                    data: data,
                                    message: 'Delete id=' + req.params.id
                                });
                        })
                    }
                    
                    
                    
                    function getPurchaseByID(req, res) {
                        db.any('select * from purchases where purchase_id =' + req.params.id)
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        status: 'success',
                                        data: data,
                                        message: 'Retrieved Purchase id:' + req.params.id
                                    });
                            })
                            .catch(function (error) {
                                res.status(500)
                                    .json({ status: "fail", message: "Mission Fail get back" })
                                console.log('ERROR:', error)
                            })
                    }
                    
                    
                    function getUser(req, res) {
                        db.any('select * from users')
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        status: 'success',
                                        data: data,
                                        message: 'Retrieved ALL User'
                                    });
                            })
                            .catch(function (error) {
                                console.log('ERROR:', error)
                            })
                    }
                    
                    function DeleteUser(req, res) {
                        db.any('DELETE from users where user_id=' + req.params.id)
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        status: 'success',
                                        message: 'Delete id=' + req.params.id
                                    })
                            })
                            .catch(function (error) {
                                console.log('ERROR:', error)
                            })
                        db.any('select * from users').then(function (data) {
                            res.status(200)
                                .json({
                                    status: 'success',
                                    data: data,
                                    message: 'Delete id=' + req.params.id
                                });
                        })
                    }
                    
                    
                    function updateUser(req, res) {
                        db.any('update users set email=${email},password=${password},details=${details},created_at=${created_at} where user_id =' + req.params.id,
                            req.body)
                            .then(function (data) {
                                res.status(200).json({
                                    status: 'success',
                                    data: data,
                                    message: 'update purchase id=' + req.params.id
                                });
                            })
                            .catch(function (error) {
                                console.log('ERROR:', error)
                            })
                    }
                    
                    function insertUser(req, res) {
                        db.any('insert into users(user_id,email,password,details,created_at)' +
                            'values(${user_id}, ${email}, ${password}, ${details}, ${created_at}',
                            req.body)
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        status: 'success',
                                        message: 'Inserted one purchase'
                                    });
                            })
                            .catch(function (error) {
                                console.log('ERROR:', error)
                            })
                    
                        db.any('select * from users').then(function (data) {
                            res.status(200)
                                .json({
                                    status: 'success',
                                    data: data,
                                    message: 'Delete id=' + req.params.id
                                });
                        })
                    }
                    
                    
                    function getUserByID(req, res) {
                        db.any('select * from users where user_id =' + req.params.id)
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        status: 'success',
                                        data: data,
                                        message: 'Retrieved Purchase_items id:' + req.params.id
                                    });
                            })
                            .catch(function (error) {
                                res.status(500)
                                    .json({ status: "fail", message: "Mission Fail get back" })
                                console.log('ERROR:', error)
                            })
                    }


    module.exports = { //ทำให้ข้างนอกเรียกใช้ได้
        getAllProducts,
        getProductByID,
        insertProduct,
        updateProduct,
        deleteProduct,
        getPurchase_item,
        getPurchase_itemByID,
        insertPurchase_item,
        updatePurchase_item,
        DeletePurchase_item,
        getPurchase,
        getPurchaseByID,
        insertPurchase,
        updatePurchase,
        DeletePurchase,
        getUser,
        getUserByID,
        insertUser,
        updateUser,
        DeleteUser



    }