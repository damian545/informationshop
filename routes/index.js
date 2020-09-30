var express = require("express");
var router = express.Router();
var Cart = require("../models/product");

var Product = require("../models/product");

/* GET home page. */
router.get("/", function (req, res, next) {
  Product.find(function (err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }

    res.render("shop/index", {
      title: "Information Shop",
      products: productChunks,
    });
  });
});

router.get("/add-to-cart/:id", function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect("/");
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/");
  });
});

router.get("/shopping-cart", function (req, res, next) {
  if (!req.session.cart) {
    return res.render("shop/shopping-cart", { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render("shop/shopping-cart", {
    products: cart.generateArry(),
    totalPrice: cart.totalPrice,
  });
});

router.get("/checkout", function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }
  var cart = new Cart(req.session.cart);
  res.render("shop/checkout", { total: cart.totalPrice });
});

router.post("/checkout", function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }
  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")("sk_test_pweF4VBTjmx6qKT3WgvKUKO4");

  stripe.charges.create(
    {
      amount: cart.totalPrice * 100,
      currency: "aus",
      source: req.body.stripeToken, // obtained with Stripe.js
      description: "Test Charge",
    },
    function (err, charge) {
      // asynchronously called
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/checkout");
      }
      req.flash("success", "Successfully bought product!");
      req.cart = null;
      res.redirect("/");
    }
  );
});

module.exports = router;
