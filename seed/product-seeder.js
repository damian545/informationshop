var Product = require("../models/product");

var mongoose = require("mongoose");

mongoose.connect("localhost:3000/shopping");

var products = [
  new Product({
    imagePath: "./image/putting.jpg",
    title: "How to Putt in golf",
    description: "Selling the information to putt a golf ball!!!",
    price: 50,
  }),
  new Product({
    imagePath: "./images/Fitting R33 body kit.webp",
    title: "How to fit a body kit",
    description: "Selling the information to fit a body kit!!!",
    price: 100,
  }),
  new Product({
    imagePath: "./images/fading.webp",
    title: "How to do fading in graffiti ",
    description: "Selling the information to fade two colors!!!",
    price: 30,
  }),
  new Product({
    imagePath: "./images/Versawall.jpg",
    title: "How to use versawall",
    description: "Selling the information to use versawall!!!",
    price: 80,
  }),
  new Product({
    imagePath: "./images/straighten-hair.webp",
    title: "How to straighten hair",
    description: "Selling the information to straighten hair!!!",
    price: 35,
  }),
  new Product({
    imagePath: "./images/kick flip.jpg",
    title: "How to do a kick flip",
    description: "Selling the information to kick flip!!!",
    price: 50,
  }),
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function (err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
