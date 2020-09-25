module.exports = function Cart(initItems) {
  this.items = initItems;
  this.totalQty = 0;
  this.tatalPrice = 0;

  this.add = function (item, id) {
    var storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.tatalPrice += storedItem.price;
  };
};