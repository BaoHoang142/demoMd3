const { creatOrder } = require("../controllers/orders.controller");

const orderRouter = (app) => {
    app.post("/api/v1/orders", creatOrder);
    app.get("/api/v1/orders/:id", getOrder);
    app.put("/api/v1/orders/:id", editOrder);
    app.post("/api/v1/order", addOrder);
}
module.exports = {
    orderRouter
}