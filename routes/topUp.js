const express = require ('express')
const router = express.Router()
const Model = require('../models')



router.post('/top-up', function (req, res){
  Model.Card.FindOne({
    where: {
      number: req.body.number,
    }
  })
  .then(card => {
    if (card === null) {
      return res.redirect('/top-up/error')
     }
     Model.Card.update(card.id, {
      credit: card.credit + (req.body.credit)
     })
     .then(cardUpdated => res.send {
       return res.render('top-up',{data:data})
     })
  })
  .catch(err => {
    res.send(err);
  })
})

module.exports = router
