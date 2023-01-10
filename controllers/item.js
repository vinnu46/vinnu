const {Item} = require('../models/models');
const {Op} = require('sequelize');

const getItems =  (req, res) => {
    const name = req.query.name ?`${req.query.name}%` : '%%';
    const min = req.query.min ? req.query.min : 0; 
    const max = req.query.max ? req.query.max : 99999999;
    const brand = req.query.brand ? req.query.brand : '^*';
    Item.findAll({
    where: { 
        name:{
        [Op.like]: name
        },
        price: {
        [Op.and]: {
            [Op.gte]: min,
            [Op.lte]: max,
            }
        },
        brand: {
        [Op.regexp]: brand
        }
    }
    })
    .then(result => {res.json(result)})
    .catch(err => {
        console.log(err)
        res.status(400).json({success:false,msg:'error'})
    })
};
const getItem =  (req, res) => {
    Item.findOne({
    where: { id : req.params.itemID
        }
    }
    )
    .then(result => {
        if (result){
        res.json(result)
    }else{
        res.status(404).send()
    }
    })
    .catch(err => res.status(400))
};
module.exports={getItems,getItem};