const {authRouter} = require("./auth.router");
const { userRouter } = require("./users.route");
const {categoryRouter} = require("./category.route")
const {productRouter} = require("./products.router");
const { emailRouter } = require("./email.router");
const { cartRouter } = require("./cart.router");
const { billRouter } = require("./bill.router");
const { billDetailRouter } = require("./bill_detail.router");
const rootRouter = (app) => {
  authRouter(app);
  userRouter(app);
  categoryRouter(app);
  productRouter(app);
  emailRouter(app);
  cartRouter(app);
  billRouter(app);
  billDetailRouter(app)
};

module.exports = {rootRouter};
