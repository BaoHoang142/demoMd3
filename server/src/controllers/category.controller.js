const { getAllCates, addCategory, deleteCategory, updateCategoryMySQL,getCategoryProductsMySql } = require("../services/category.service");

const getCategories = async (req, res) => {
  try {
    const cates = await getAllCates();
    res.status(200).json(cates);
  } catch (error) {
    console.log(error);
  }
};
const addCate = async (req, res) => {
  try {
    const result = await addCategory(req.body);
    if (!result) {
      return res.status(500).json({
        message: "Thêm category thất bại",
      });
    }
    const cates = await getAllCates();
    res.status(200).json({
      message: "Thêm category thành công",
      cates,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteCate = async (req,res)=> {
  const { id } = req.params;
  try {
    const result = await deleteCategory(id)
    const cates = await getAllCates();
    res.status(200).json({
      message: "Xóa category thành công",
      cates,
    });
  } catch (error) {
    
  }
}
async function editCate(req, res) {
  console.log(req.params)
  try {
    console.log(req.params)
    const { id } = req.params;
    const { nameCategory,imageCategory } = req.body;
    const result = await updateCategoryMySQL(
      nameCategory,
      imageCategory,
      id
    );
    const cates = await getAllCates();
    console.log(cates)
    res.status(200).json({
      message: "Sửa category thành công",
      cates,
    });
  } catch (error) {
    console.log(error);
  }
}
async function getCategoryProducts(req, res) {
  const { id } = req.params;
  console.log(id)
  try {
    const category = await getCategoryProductsMySql(id);
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getCategories,
  addCate,
  getCategoryProducts,
  deleteCate,
  editCate
};
