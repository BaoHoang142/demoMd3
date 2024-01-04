const { addToBill, getBills, getAllBills, changeBillStatus, changeDeleteBillStatus } = require("../controllers/bill.controller");

const billRouter = (app) => {
  
    app.post("/api/v1/bill", addToBill)
    app.get("/api/v1/bill/:userId",getBills)
    app.patch("/api/v1/billStatus/:idBill",changeBillStatus)
    app.patch("/api/v1/billDeleteStatus/:idBill",changeDeleteBillStatus)
    app.get("/api/v1/bills",getAllBills)
  };
  module.exports = { billRouter }