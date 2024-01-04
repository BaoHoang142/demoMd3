const {
    addToCart,
    getCart,
    deleteCart,
    decreQuantity,
    increQuantity,
    deleteCartPayment,
  } = require("../controllers/cart.controller");
  
  const cartRouter = (app) => {
    app.get("/api/v1/cart/:userId",getCart);
    app.patch("/api/v1/cart/decre",decreQuantity);
    app.patch("/api/v1/cart/incre",increQuantity);
    app.post("/api/v1/cart", addToCart);
    app.delete("/api/v1/cart/:cartId", deleteCart);
    app.delete("/api/v1/cart-payment/:userId", deleteCartPayment)

  };
  
  module.exports = { cartRouter };
  