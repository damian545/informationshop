var express = require("express");
var router = express.Router();

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
});

module.exports = router;
