const express = require ('express')
const router = express.Router()
const Model = require('../models')
var sendmail = require('../helper/sendmail');

router.get('/', function(req, res){
  Model.Customer.findAll({
    include: ['Card']
  })
  .then(function(Customer){
    res.render('customer', {dataCustomer: Customer})
  })
})


router.get('/add', function(req, res){
  res.render('addCustomer',{err: false})
})

router.post('/add', function(req, res){
  Model.Customer.create({
    name: req.body.name,
    email: req.body.email
  })
  .then(cust => {
    cust.createCard({
      number: (cust.id/100 + Math.random()) * 10000,
      credit: 10000,
      CustomerId: cust.id
    })
    .then(card => {
      console.log('===============',JSON.stringify({
        customer: cust,
        card: card
      }));

      sendmail(
        cust.name, 
        cust.email, 
        'Welcome to Warung Card Pay',
        `Welcome ${cust.name},\nYour card number is ${card.number}\nYour credit balance is ${card.credit}\nHappy shopping!`,
        function() {
          if (req.query.from === 'warung') {
            return res.render('customer-success', {
              customer: cust,
              card: card
            });
          } else {
            res.redirect('/customer')
          }
        }
      );

      
      
    })
    .catch(err => console.log(err))
  })
  .catch(err =>{
    res.send(err);
  })
})

/*              >> edit <<                      */
router.get('/edit/:id', function(req, res){
  Model.Customer.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(data =>{
      res.render('customerEdit',{data:data})
  })
})

router.post('/edit/:id', (req, res)=>{
  Model.Customer.update({
    name: req.body.name,
    email: req.body.price
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(()=>{
    res.redirect('/customer')
  })
  .catch((data)=>{
    res.redirect('/customer')
  })
})



/*              >> Delete <<                     */

router.get('/delete/:id', function(req, res){
  Model.Customer.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(()=>{
    res.redirect('/customer')
  })
})



module.exports = router
