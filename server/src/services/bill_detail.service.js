const db = require("../configs/mysql.config");

async function createBillDetailMySql(billId, productId, quantity) {
    try {
        const [result] = await db.execute("insert into bill_detail (billId, quantity, productId) values (?,?,?)", [billId, quantity, productId]);
        return result
    } catch (error) {
        console.log(error)
    }
}
async function getBillDetailMySql(idBill) {
    console.log("vao day roi",idBill)
    try {
        const [result] = await db.execute("select * from bill join bill_detail on bill.idBill = bill_detail.billId join products on bill_detail.productId = products.idProduct where idBill = ?",[idBill]);
        return result
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    createBillDetailMySql,
    getBillDetailMySql
}