const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    url: {
                        type: 'GET',
                        url: 'http://localhost:3000/products' + doc._id
                    }
                }
            })
        };
        // console.log(docs);
        // if (docs.length >=0){
            res.status(200).json(response);
        // } else{
        //     res.status(404).json({
        //         message: 'No entries found'
        //     });
        // }        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    // res.status(200).json({
    //     message: 'Handling GET requests to /products'
    // });
});

router.post('/', (req, res, next) => {
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Successfully created the product.',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products' + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });       
    });    
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    // description: 'Get all products',
                    url: 'http://localhost:3000/products' + doc._id
                }
            });
        }else{
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    // if(id === 'special'){
    //     res.status(200).json({
    //         message: 'You discovered the special ID',
    //         id: id
    //     });
    // }else{
    //     res.status(200).json({
    //         message: 'You passed and ID'
    //     });
    // }    
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {}; //updateOperations
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id }, { $set: updateOps }) //{ $set:{name: req.body.newName, price: req.body.newPrice} });
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products' + id
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

    // res.status(200).json({
    //     message: 'Updated product'
    // });
});

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({_id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product Deleted',
            request:{
                type: 'POST',
                url: 'http://localhost:3000/products',
                body: { name: 'String', price: 'Number' }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    // res.status(200).json({
    //     message: 'Deleted product'
    // });
});

module.exports = router;