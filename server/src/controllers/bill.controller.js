const { addToBillMySql, getBillsMySql, getAllBillsMySql, changeBillStatusMySql, changeDeleteBillStatusMySql } = require("../services/bill.service")

 async function addToBill(req, res) {
    const { userId,address,nameUser, phone,note, total } = req.body
    try {
        const newIdBill = await addToBillMySql( userId,address,nameUser, phone,note, total)
        res.status(201).json({
            newIdBill
        })
    } catch (error) {
        console.log(error)
    }
}
async function getBills(req, res) {
    const { userId } = req.params
    try {
        const bills = await getBillsMySql(userId)
        console.log("4444",bills)
        res.status(200).json({
            bills
        })
    } catch (error) {
        console.log(error)
    }
}
async function getAllBills(req, res) {
    try {
        const allBills = await getAllBillsMySql()
        console.log("4444",allBills)
        res.status(200).json({
            allBills
        })
    } catch (error) {
        console.log(error)
    }
}
async function changeBillStatus(req, res) {
    const { idBill } = req.params
    try {
        const status = await changeBillStatusMySql(idBill)
        res.status(200).json({
            message:"Cập nhật trạng thái thành công"
        })
    } catch (error) {
        console.log(error)
    }
    
}
async function changeDeleteBillStatus(req, res) {
    const { idBill } = req.params
    try {
        const status = await changeDeleteBillStatusMySql(idBill)
        res.status(200).json({
            message:"Đã hủy đơn hàng này"
        })
    } catch (error) {
        console.log(error)
    }
}
  module.exports = {
    addToBill,
    getBills,
    getAllBills,
    changeBillStatus,
    changeDeleteBillStatus
  }