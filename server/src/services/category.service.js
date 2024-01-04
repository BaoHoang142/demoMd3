const db = require("../configs/mysql.config");
async function getAllCates() {
  try {
    const [result] = await db.execute("select * from category");
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function addCategory(newCategory) {
  const { nameCategory, imageCategory } = newCategory;
  console.log("1111111",newCategory);
  try {
    const [result] = await db.execute(
      "insert into category (nameCategory,imageCategory) values (?,?)",
      [nameCategory,imageCategory]
    );
    if (result.insertId) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}
async function deleteCategory(id) {
  console.log(id)
  try {
    const [result]= await db.execute(
      "delete from category where categoryId = ?",[id]);
      console.log(result)
    return result.insertId;
  } catch (error) {
    console.log(error);
  } 
}
async function updateCategoryMySQL(
    nameCategory,
    imageCategory,
    categoryId
  ) {
    console.log(nameCategory,imageCategory,categoryId)
    try {
      const [result] = await db.execute(
        "update category set nameCategory = ?, imageCategory = ? where categoryId = ?",[ nameCategory, imageCategory, +categoryId]
      )
      return result.insertId
    } catch (error) {
      console.log(error);
    }
}
async function getCategoryProductsMySql(id) {
  console.log(id,"sqp")
  try {
    const [result] = await db.execute(
      "SELECT * FROM `products` JOIN category ON products.categoryId=category.categoryId WHERE category.categoryId = ?",[id]
    )
    
    return result
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getAllCates,
  updateCategoryMySQL,
  getCategoryProductsMySql,
  addCategory,
  deleteCategory
};
