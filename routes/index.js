var express = require('express');
var router = express.Router();
var models =  require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {

  models.Goods.findAll()
  .then(goods => {
    res.render('index', { inCart: (req.session.cart ? req.session.cart : []), totalInCart: totalInCart(req.session.cart), goods: goods });
  })
  .catch(err => {
    console.log(err)
  })
  
});

router.get('/add-customer', function(req, res, next) {
  res.render('add-customer');
});

router.get('/checkout', function (req, res, next) {
  if (!totalInCart(req.session.cart)) return res.redirect('/');
  next();
},
function(req, res, next) {
  res.render('check-card', {inCart: (req.session.cart ? req.session.cart : []), totalInCart: totalInCart(req.session.cart)});
});

router.get('/add-to-cart/:itemid/:itemname/:itemprice', function(req, res, next) {

  let id = req.params.itemid,
      name = req.params.itemname,
      price = req.params.itemprice;

  if (req.session.cart) {
    let index = req.session.cart
                  .map(item => item.name)
                  .indexOf(name);

    let found = index !== -1;

    if (found) {
      req.session.cart[index].total++
    } else {
      let obj = {};
      obj.id = id;
      obj.name = name;
      obj.price = price;
      obj.total = 1;

      req.session.cart.push(obj);
    }
  } else {
    req.session.cart = [];

    let obj = {};
    obj.id = id;
    obj.name = name;
    obj.price = price;
    obj.total = 1;

    req.session.cart.push(obj);
  }

  res.redirect('/');

})

router.post('/pay', function(req, res, next) {
  models.Card.findOne({
    where: {
      number: parseInt(req.body.number)
    },
    include: ['Customer']
  })
  .then(card => {
    let totalPrice = totalPriceInCart(req.session.cart);
    if (card && card.credit > totalPrice) {
      card.update({
        credit: card.credit - totalPrice
      })
      .then(cardUpdated => {
        res.session.cart = [];
        res.render('payment-success', { card: cardUpdated });
      })
      .catch(err => console.log(err));
    } else {
      return ( card ? res.render('payment-error', {error: 'Credit is insufficient'}) : res.render('payment-error', {error: 'Card is invalid'}));
    }
  })
});

router.get('/cancel', (req, res) => {
  req.session.cart = [];
  res.redirect('/')
})

function totalInCart(cart) {
  let total = 0
  if (cart) {
    total = cart
              .map(item => item.total)
              .reduce((t,c) => parseInt(c)+t, 0);
  } 
  return total
}

function totalPriceInCart(cart) {
  let totalPrice = 0;
  if (cart) {
    totalPrice = cart
                  .map(item => parseInt(item.total) * parseInt(item.price))
                  .reduce((t,c) => t+c, 0);
  }
  return totalPrice;
}

module.exports = router;
