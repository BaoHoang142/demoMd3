const db = require("../configs/mysql.config");

async function addToBillMySql(userId, address,nameUser, phone,note, total) {
        try {
            const [result] = 
            await db.execute
            ("insert into bill (userId, address,nameUser, phone,note, total, createdAt) values (?,?,?,?,?,?, CURRENT_TIMESTAMP())", 
            [userId, address,nameUser, phone,note, total]);
            return result.insertId
        } catch (error) {
            console.log(error)
        } 
}
async function getBillsMySql(userId) {

    try {
        const [result] = await db.execute("select * from bill  where userId = ?", [userId]);
        return result
    } catch (error) {
        console.log(error)
    }
}
async function getAllBillsMySql() {

    try {
        const [result] = await db.execute("select * from bill");
        return result
    } catch (error) {
        console.log(error)
    }
}
async function changeBillStatusMySql(idBill) {
    try {
        const [result] = await db.execute("update bill set status = 'Đã xác nhận' where idBill = ?", [idBill]);
        return result
    } catch (error) {
        console.log(error)
    }
}
async function changeDeleteBillStatusMySql(idBill) {
    try {
        const [result] = await db.execute("update bill set status = 'Đã hủy' where idBill = ?", [idBill]);
        return result
    } catch (error) {
        console.log(error)
    }
}
module.exports = { 
    addToBillMySql,
    getBillsMySql,
    getAllBillsMySql,
    changeBillStatusMySql,
    changeDeleteBillStatusMySql
}