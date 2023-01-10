const {User,Cart,Item} = require('../models/models');
const {Sequelize,Op} = require('sequelize')
sequelize =Sequelize
const getCart = async (req, res) => {
    const user = await User.findOne({
      where: {
        username: req.username
      }
    })
    const cart=await Cart.findAll({where:{userID:user.id},include:[{model:Item,required:false}]})
    res.status(200).send({cart: cart});
  };


  const postAddToCart = async(req, res)=>{
    try {
    const addedItem = req.body.itemID;
    const user = await User.findOne({
      where: {
        username: req.username
      }
    })
    const searchCart = Cart.findOne({
      where: {
        UserID: user.id,
        itemID: addedItem
      }
    }).then(result => {
      if (result){
        Cart.update(
          {
            numberOfItems: sequelize.literal('numberOfItems + 1'),
          },
          {
            where: {
              [Op.and]:{
              userID: user.id,
              itemID: result.itemID
              }
            }
          }
          ).then(res.status(200).send())
      } 
      else{ 
        Cart.create({
        userID: user.id,
        itemID: addedItem, 
        numberOfItems: 1
      })
    }
      res.status(200).send();
    })}
    catch{
      res.status(500).send()
    }
  };

const postRemoveFromCart = async(req, res)=>{
  try{
    const addedItem = req.body.itemID;
    const user = await User.findOne({
      where: {
        username: req.username
      }
    })
    const searchCart = Cart.findOne({
      where: {
        UserID: user.id,
        itemID: addedItem
      }
    }).then(result => {
      if (result){
      if (result.numberOfItems>1){
        Cart.update(
          {
            numberOfItems: sequelize.literal('numberOfItems - 1'),
          },
          {
            where: {
              [Op.and]:{
              userID: user.id,
              itemID: result.itemID
              }
            }
          }
          ).then(res.status(200).send())
      } 
      else{ 
        result.destroy();
    }
      res.status(200).send();
  }
  else{
    res.status(404).send();
  }
    })}
    catch{
      res.status(500).send()
    }
  };

  module.exports={
    getCart,
    postAddToCart,
    postRemoveFromCart
}