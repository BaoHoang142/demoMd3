const { getCategories, addCate, deleteCate, editCate, getCategoryProducts } = require("../controllers/category.controller")
const { verifyToken } = require("../middlewares/middlewares")

const categoryRouter = (app) => {
    app.get("/api/v1/categories", getCategories);
    app.get("/api/v1/categories/:id", getCategoryProducts);
    app.post("/api/v1/category",verifyToken, addCate);
    app.delete("/api/v1/category/:id",verifyToken, deleteCate);
    app.put("/api/v1/category/:id",verifyToken, editCate);
}
module.exports = {
    categoryRouter
}