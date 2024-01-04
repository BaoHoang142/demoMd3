const { addProductByAdmin, getProducts, deleteProduct, updateProduct, getProductDetail, getProductsBySearch } = require("../controllers/product.controller")
const { verifyToken } = require("../middlewares/middlewares")

const productRouter = (app) => {
    app.get("/api/v1/products", getProducts)
    app.get("/api/v1/products/search", getProductsBySearch);
    app.get("/api/v1/products/:id", getProductDetail)
    app.post("/api/v1/product", verifyToken, addProductByAdmin)
    app.put("/api/v1/products/:id", updateProduct);
    app.delete("/api/v1/deleteProduct/:id", deleteProduct);

}
module.exports = {productRouter}