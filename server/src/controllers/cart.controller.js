const {
    addToCartMySQL,
    checkProductInCart,
    updateQuantity,
    getCartByUserId,
    deleteCartSQL,
    increSQL,
    deleteCartByUserId,
    getCartQuantity,
    decreSQL,
  } = require("../services/cart.service");
  async function getCart(req, res) {
    const { userId } = req.params;
    console.log(userId)
    const cart = await getCartByUserId(userId);
    console.log(cart)
    res.status(200).json(cart);
  }
  async function addToCart(req, res) {
    try {
      const check = await checkProductInCart(req.body);
      if (!check) {
        await addToCartMySQL(req.body);
        return res.status(200).json({
          message: "Thêm vào giỏ hàng thành công",
        });
      }
      await updateQuantity(req.body);
      return res.status(200).json({
        message: "Thêm vào giỏ hàng thành công",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteCart(req, res) {
    const { cartId } = req.params;
    try {
      const result = await deleteCartSQL(cartId);
      res.status(200).json({
        message: "Xóa sản phẩm thành công",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function decreQuantity(req, res) {
    const { cartId } = req.body;
    const { type } = req.body;
    try {
      const cart = await getCartQuantity(cartId);
      console.log("rrrr",cart)
      if (cart.quantity == 1) {
        await deleteCartSQL(cartId);
        res.status(200).json({
          message: "Xóa sản phẩm thành công",
        }) 
      }
      const result = await decreSQL(cartId,type);
      res.status(200).json({
        message: "giảm số lượng thành công",
      });
    } catch (error) {
      console.log(error);
      
    }
  }
  async function increQuantity(req, res) {
    const { cartId } = req.body;
    const { type } = req.body;
    try {
      const result = await increSQL(cartId,type);
      res.status(200).json({
        message: "tăng số lượng thành công",
      });
    } catch (error) {
      console.log(error);
      
    }
  }
  async function deleteCartPayment(req, res) {
    const { userId } = req.params
    try {
        await deleteCartByUserId(userId)
        res.status(200).json({
            message: "Xóa giỏ hàng thành công"
        })
    } catch (error) {
        console.log(error)
    }
}

  module.exports = {
    getCart,
    addToCart,
    deleteCart,
    decreQuantity,
    increQuantity,
    deleteCartPayment
  };
  