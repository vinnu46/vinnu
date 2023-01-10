const {PromotionCode} = require('../models/models');


const postCheckPromotionCode =  (req, res) => {
    try{
    const promotionCode = req.body.promotionCode;
    PromotionCode.findOne({
        where: { text: promotionCode},
    })
    .then(result => {
      if (result){
      res.json(result)
    }
    else{
      res.status(404).send()
    }
  }
    )
    .catch(err => res.status(500).send())
    }
catch{
  res.status(500).send()
}
};

module.exports={postCheckPromotionCode};