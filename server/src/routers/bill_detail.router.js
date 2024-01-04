const { createBillDetail,getBillDetail } = require("../controllers/bill_detail.controller")

const billDetailRouter = (app) => {
    app.post("/api/v1/billDetail", createBillDetail)
    app.get("/api/v1/billDetail/:idBill", getBillDetail)
}

module.exports = {
    billDetailRouter
}