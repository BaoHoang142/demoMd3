const { addProduct, getAllProducts, deleteProductMySql, updateProductMySQL, getProductDetailMySql, getProductsByName } = require("../services/products.service");

async function getProducts(req,res){
    try {
        const products = await getAllProducts()
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
    }
}
async function getProductsBySearch(req, res) {
    const { key } = req.query;
    console.log("davao search")
    try {
      const result = await getProductsByName(key);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
async function getProductDetail(req,res){
    console.log("first")
    const {id}= req.params
    try {
        const productDetail = await getProductDetailMySql(id)
        res.status(200).json(productDetail)
    } catch (error) {
        console.log(error)
    }
}
async function addProductByAdmin(req,res){
    try {
        const result = await addProduct(req.body)
        const products = await getAllProducts()
        if(!result){
            return res.status(500).json({
                message: "có lỗi khi thêm sản phẩm"
            })
        }
        res.status(201).json({
            message: "Thêm sản phẩm thành công",
            products
        })
    } catch (error) {
        console.log(error)
    }
}
async function updateProduct(req, res) {
    console.log(req.params);
    try {
      const { id } = req.params;
      
      const { nameProduct, price, image, stock, description, categoryId } =
        req.body;
      const result = await updateProductMySQL(
        nameProduct,
        price,
        image,
        stock,
        description,
        categoryId,
        id
      );
      const products = await getAllProducts();
      res.status(200).json({
        message: "Sửa sản phẩm thành công",
        products,
      });
    } catch (error) {
      console.log(error);
    }
  }
//xoa
async function deleteProduct(req, res) {
    const { id } = req.params;
    const result = await deleteProductMySql(id);
    const products = await getAllProducts();
    res.status(200).json({
      message: "Xóa sản phẩm thành công",
      products,
    });
}
module.exports = {
    getProducts,
    getProductDetail,
    addProductByAdmin,
    deleteProduct,
    getProductsBySearch,
    updateProduct
}