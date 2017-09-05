const session = require('express-session');
const parseurl = require('parseurl');
const expressValidator = require('express-validator');
const MongoClient = require('mongodb').MongoClient, assert = require('assert');
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

// app.get('/', function(req, res) {
//   res.render("index");
// })

app.get('/vendor', function(req, res) {
  models.VMachine.findAll().then(function(snack){
    res.json(
      {"data": snack})
  })
})

// app.get('/api/customer/items', function(req, res) {
//   models.VMachine.findAll().then(function(snack){
//     res.render('machine', {snack: snack})
//   })
// })

app.post('/addItem', function(req, res) {
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
  vmachine.save().then(function () {
    res.json({"status":"success"});
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
