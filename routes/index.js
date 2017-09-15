var express = require('express');
var router = express.Router();
var models =  require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  let total = 0
  if (req.session.cart) {
    total = req.session.cart
              .map(item => item.total)
              .reduce((t,c) => parseInt(c)+t, 0);
  } 

  models.Goods.findAll()
  .then(goods => {
    res.render('index', { inCart: (req.session.cart ? req.session.cart : []), totalInCart: total, goods: goods });
  })
  .catch(err => {
    console.log(err)
  })
  
});

router.get('/add-customer', function(req, res, next) {
  res.render('add-customer');
});

router.get('/checkout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
  // res.render('checkout', { items: {} })
})

router.get('/add-to-cart/:itemid/:itemname/:itemprice', function(req, res, next) {
  console.log(req.session.cart);

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

module.exports = router;
