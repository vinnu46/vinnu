const {Purchase,User,Cart,PromotionCode,Item,PurchaseItem} = require('../models/models');


const postPurchase = async (req, res) => {
    try{
    const user = await User.findOne({
      where: {
        username: req.username
      }
    })
    const cart=await Cart.findAll({where:{userID:user.id},include:[{model:Item,required:false}]})
    const totalBeforePromotion = cart.reduce((total,nextItem) => total + nextItem.numberOfItems * nextItem.item.price,0)
    let totalAfterPromotion = null
    if (req.body.promotionCodeID){
        promotionCode = await PromotionCode.findOne({
            where: { id: req.body.promotionCode},
        })
        if (promotionCode && promotionCode.minimumPaymentLimit <= totalBeforePromotion ){
            totalDiscountAmount =  totalBeforePromotion * promotionCode.percentageDiscountAmount + promotionCode.rawDiscountAmount <= promotionCode.maximumDiscountLimit  
                                    ? totalBeforePromotion * promotionCode.percentageDiscountAmount + promotionCode.rawDiscountAmount  : promotionCode.maximumDiscountLimit
        totalAfterPromotion = totalBeforePromotion - totalDiscountAmount
        }
    }
    if (!totalAfterPromotion) {
        totalAfterPromotion = totalBeforePromotion
    }
    purchaseData = {
        userID: user.id,
        totalBeforePromotion: totalBeforePromotion,
        totalAfterPromotion: totalAfterPromotion,
        promotionCodeID: req.body.promotionCodeID
    }
    const purchase = await Purchase.create(purchaseData)
    console.log(cart)
    cart.forEach(async(cartItem) =>  { 
        console.log(cartItem.item.price)
            const purchaseItem = await PurchaseItem.create({
                purchaseID : purchase.id,
                itemID : cartItem.itemID,
                price : cartItem.item.price,
                numberOfItems : cartItem.numberOfItems})
            cartItem.destroy();
                })
    res.json();
}
    catch{
        res.status(500).send()
    }
};


module.exports={postPurchase}