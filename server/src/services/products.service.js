const db = require("../configs/mysql.config");
async function getAllProducts(){
    try {
        const [result] = await db.execute("select * from products")
        return result;
    } catch (error) {
        console.log(error)
    }
}
async function getProductDetailMySql(idProduct){
  try {
      const [result] = await db.execute("select * from products where idProduct = ?",[idProduct])
      return result;
  } catch (error) {
      console.log(error)
  }
}
async function getProductsByName(name) {
  try {
    const [products] = await db.execute(
      `select * from products where nameProduct like '%${name}%'`
    );
    console.log(products);
    return products;
  } catch (error) {
    console.log(error);
  }
}
async function addProduct(newProduct) {
  const { nameProduct, price, description, stock, image, categoryId } =
    newProduct;
  try {
    const [result] = await db.execute(
      "insert into products (nameProduct, price, description, stock, image, categoryId) values (?, ?, ?, ?, ?, ?)",
      [nameProduct, price, description, stock, image, categoryId]
    );
    if (result.insertId) {
        return true
    }
    return false
  } catch (error) {
    console.log(error);
  }
}
// sua
async function updateProductMySQL(
  nameProduct,
  price,
  image,
  stock,
  description,
  categoryId,
  idProduct
) {
  try {
    const [result] = await db.execute(
      "update products set nameProduct = ?, price = ?, image = ?, stock = ?, description = ?, categoryId = ? where idProduct = ?",
      [nameProduct, price, image, stock, description, categoryId, idProduct]
    );
    console.log(result);
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function deleteProductMySql(id) {
  try {
    const [result] = await db.execute(
      "delete from products where idProduct = ?",
      [id]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
    getAllProducts,
    addProduct,
    getProductDetailMySql,
    updateProductMySQL,
    getProductsByName,
    deleteProductMySql
}