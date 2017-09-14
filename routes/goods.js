const express = require ('express')
const router = express.Router()
const Model = require('../models')


// goods
router.get('/', function(req, res){
  Model.Goods.findAll()
  .then(function(Goods){
    res.render('goods', {data: Goods})
  })
})


/*              >> Add <<                  */
router.get('/add', function(req, res){
  res.render('goods-add',{err: false})
})

router.post('/add', function(req, res){
  Model.Goods.create({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    img_link : req.body.img_link
  })
  .then(good => {
    res.redirect('/goods');
  })
  .catch(err => {
    res.send(err);
  })
})


/*              >> edit <<                      */
router.get('/edit/:id', function(req, res){
  Model.Goods.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(data =>{
      res.render('goodsEdit',{data:data})
  })
})

router.post('/edit/:id', (req, res)=>{
  Model.Goods.update({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    img_link : req.body.img_link
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(()=>{
    res.redirect('/Goods')
  })
  .catch((data)=>{
    res.redirect('/Goods')
  })
})



/*              >> Delete <<                     */

router.get('/delete/:id', function(req, res){
  Model.Goods.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(()=>{
    res.redirect('/goods')
  })
})

















module.exports = router
