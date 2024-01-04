const { createBillDetailMySql, getBillDetailMySql } = require("../services/bill_detail.service");

async function createBillDetail(req, res) {
    try {
        const { billId, cart } = req.body;
        await Promise.all(
            cart.map(async (product) => await createBillDetailMySql(billId, product.productId, product.quantity))
        )
        res.status(200).json({
            message: "Tạo chi tiết bill thành công"
        })
    } catch (error) {
        console.log(error)
    }
}
async function getBillDetail(req, res) {
    console.log("fff",req.params)
   const {idBill} = req.params
    try {
        const billDetail = await getBillDetailMySql(idBill)
        console.log(billDetail)
        res.status(200).json(billDetail)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    createBillDetail,
    getBillDetail
}