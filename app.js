const session = require('express-session');
const parseurl = require('parseurl');
const expressValidator = require('express-validator');
const MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
const url = 'mongodb://localhost:27017/vending';
const ObjectId = require('mongodb').ObjectID;
const express = require('express'),
  mustacheExpress = require('mustache-express'),
  bodyParser = require('body-parser'),
  sequelize = require('sequelize')
models = require("./models");
const app = express();
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());

app.use(expressValidator());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({
  extended: false
}));




// get a list of items
app.get('/api/customer/items', function(req, res) {
  models.VMachine.findAll().then(function(snack) {
    res.json({
      "data": snack
    })
  })
})



// add a new item not previously existing in the machine
app.post('/api/vendor/items', function(req, res) {
  let nameV = req.body.name;
  let costV = req.body.cost;
  let quantityV = req.body.quantity;
  let discriptionV = req.body.discription;
  const vmachine = models.VMachine.build({
    name: nameV,
    cost: costV,
    quantity: quantityV,
    discription: discriptionV
  })
  vmachine.save().then(function() {
    res.json({
      "status": "success"
    });
  })
})



// purchase an item
app.post('api/customer/items/:itemId/purchases', function(req, res) {
  // let itemId = req.params.itemId;
  // models.VMachine.findOne({
  //   where: {
  //     id: itemId
  //   }
  // }).then(function(results) {
  //   models.VMachine.update({
  //     quantity: req.body.quantity - 1
  //   }).then(function(results) {
  //     const purchased = new purchase({
  //       name: results.name,
  //       amountIn: req.body.amountIn
  //     })
  //     purchased.save().then(function() {
  //       res.json({
  //         'you are': 'successful'
  //       })
  //     })
  //   })
  // })
})


// get a list of all purchases with their item and date/time
app.get('/api/vendor/purchases', function(req, res) {

})




// get a total amount of money accepted by the machine
app.get('/api/vendor/money', function(req, res) {

})


// update item quantity, description, and cost
app.put('/api/vendor/items/:itemId', function(req, res) {
  models.VMachine.update({
      name: req.body.name,
      cost: req.body.cost,
      quantity: req.body.quantity,
      discription: req.body.discription
    }, {
      where: {
        id: req.params.itemId
      }
    })
    .then(function(snack) {
      if (snack === 1) {
        res.json({
          "data": "success"
        })
      }
      res.json({
        //why does this display when it is successful?
        "data": "error"
      })
    })
})









app.listen(3000, function() {
  console.log('WE ARE RUNNING ON http://localhost:3000/.')
});

process.on('SIGINT', function() {
  console.log("\nshutting down");
  const index = require('./models/index')
  index.sequelize.close()

  setTimeout(function() {
    console.log('we are down Captain');
    process.exit(0);
  }, 500)
});
