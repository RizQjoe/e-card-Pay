const express = require ('express')
const router = express.Router()
const Model = require('../models')
const sendmail = require('../helper/sendmail');

router.get('/', function(req, res, next) {
  res.render('top-up');
});

router.post('/', function(req, res, next) {
  Model.Card.findOne({
    where: {
      number: parseInt(req.body.number)
    },
    include: ['Customer']
  })
  .then(card => {
    if (card === null || isNaN(parseInt(req.body.credit))) {
      return res.redirect('/top-up/error')
    }
    card.update({
      credit: card.credit + parseInt(req.body.credit)
    })
    .then(cardUpdated => {
      sendmail(
        card.Customer.name, 
        card.Customer.email,
        'Top-up Successful',
        `Dear ${card.Customer.name},\n\nYour top-up is successful, your new credit balance is Rp. ${cardUpdated.credit}\n\nHappy shopping!`,
        function() {
          res.render('top-up-success',{ data: cardUpdated} )
        }
      )
    })
    .catch(err => console.log(err))
  })
  .catch(err => {
    res.send(err);
  })
});

router.get('/error', (req, res, next) => {
  return res.render('top-up-error');
})

module.exports = router
