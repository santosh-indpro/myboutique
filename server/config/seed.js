/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var Users = require('../api/users/users.model');
var Products = require('../api/products/products.model');
var Transactions = require('../api/transactions/transactions.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

Users.find({}).remove(function(){
    Users.create(
        {
            mobile: '9887771234',
            fullname: 'Santosh K',
            active: true
        },
        {
            mobile: '9885671234',
            fullname: 'Bineesh K',
            active: true
        }
    );
});

Products.find({}).remove(function(){
    /*Products.create(
        {
            userID: '',
            name: "Test items",
            description: "Test item description",
            price: 100,
            images : [],
            location: "Test location",
            email:"email-id@test.com",
            datecreated: "2015-07-01",
            publishStatus: true
        }
    );*/
});

Transactions.find({}).remove(function(){
    Transactions.create(
        {
            userID: '',
            addressL1: '56, Lav road',
            addressL2: 'Indr',
            city: 'Bangalore',
            state: 'Karnataka',
            country: 'India',
            productsList: [
                {
                    productID: '',
                    quantity: ''
                },
                {
                    productID: '',
                    quantity: ''
                }
            ],
            totalCost: 300,
            orderDate: "2015-07-01",
            orderStatus: true,
            paymentStatus: false,
            paymentDate: ""
        }
    );
});

