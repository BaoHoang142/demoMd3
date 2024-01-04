const db = require("../configs/mysql.config");
async function getCartByUserId(userId) {
  try {
    const [cart_user] = await db.execute(
      "select * from cart join products on cart.productId = products.idProduct join category on products.categoryId = category.categoryId where userId = ?",
      [userId]
    );
    return cart_user;
  } catch (error) {
    console.log(error);
  }
}

async function checkProductInCart(cart) {
  try {
    const [check] = await db.execute(
      "select * from cart where userId = ? and productId = ?",
      [cart.userId, cart.productId]
    );
    return check[0];
  } catch (error) {
    console.log(error);
  }
}
async function addToCartMySQL(cart) {
  try {
    const [result] = await db.execute(
      "insert into cart (userId,productId, quantity) values (?,?,1)",
      [cart.userId, cart.productId]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function updateQuantity(cart) {
  try {
    const [result] = await db.execute(
      "update cart set quantity = quantity + 1 where userId = ? and productId = ?",
      [cart.userId, cart.productId]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function deleteCartSQL(id) {
  try {
    const [result] = await db.execute("delete from cart where cartId = ?", [
      id,
    ]);
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function getCartQuantity(id) {
  try {
    const [result] = await db.execute(
      "select * from cart where cartId = ?",
      [id]
    );
    return result[0];
  } catch (error) {
    console.log(error);
  }
}
async function decreSQL(id,type) {
  try {
    if (type == "decre") {
      const [result] = await db.execute(
        "update cart set quantity = quantity - 1 where cartId = ?",
        [id]
      );
      return result.insertId;

    } 
  } catch (error) {
    console.log(error);
  }
}
async function increSQL(id,type) { 
  
  try {
    if (type == "incre") {
      const [result] = await db.execute(
        "update cart set quantity = quantity + 1 where cartId = ?",
        [id]
      );
      return result.insertId;

    } 
  } catch (error) {
    console.log(error);
  }
}
async function deleteCartByUserId(userId) {
  try {
      const [result] = await db.execute("delete from cart where userId = ?", [
          userId,
      ]);
      console.log("ghnhghnhngnhgh")
      return result;
  } catch (error) {
      console.log();
  }
}
module.exports = {
  getCartByUserId,
  checkProductInCart,
  addToCartMySQL,
  updateQuantity,
  deleteCartSQL,
  decreSQL,
  increSQL,
  deleteCartByUserId,
  getCartQuantity
};
