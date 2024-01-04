import React, { useEffect, useState } from "react";
import "./ListProduct.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { notification } from "antd";
import combobanchay from "../../assets/imgs/combo_ban_chay.png";
import logo from "../../assets/imgs/logo.png"
// import Product from "../product/Product";
import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { VND } from "../../util/index.js";
import publicAxios from "../../config/publicAxios.js";
export default function ListProduct() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [categories, setCategories] = useState([]);
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const [infoProduct, setInfoProduct] = useState({});
  const handleShow = async (id) => {
    const response = await publicAxios.get(`/api/v1/products/${id}`)
    console.log(response)
    setProductDetail(response.data[0])
    setShow(true)
  };
  console.log(productDetail)

  console.log(userLogin)
  const handleGetCategories = async () => {
    try {
      const response = await publicAxios.get("/api/v1/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetProducts = async () => {
    try {
      const response = await publicAxios.get("/api/v1/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetCategories();
    handleGetProducts();
  }, []);
  const handleBuy = async (productId) => {
    if (!userLogin) {
      notification.error({
        message: "Vui lòng đăng nhập để mua hàng thành công",
      });
      return;
    }
    try {
      const cart = {
        userId: userLogin.id,
        productId
      }
      const response = await publicAxios.post(`/api/v1/cart`,cart);
      console.log(response)
      notification.success({
        message: `${response.data.message}`,
      });
    } catch (error) {
      console.log(error)
    }
  }
  const handleChooseProduct = async (categoryId) => {
    try {
      const response = await publicAxios.get(`/api/v1/categories/${categoryId}`);
      // console.log(response)
      setProducts(response.data);
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <>
      <Header></Header>
      <div id="listProduct_div">
        <ul id="listProduct">
          {categories.map((item, index) => (
            <li
              className="listProduct__nav1"
              key={index}
              onClick={() => handleChooseProduct(item.categoryId)}
            >
              <NavLink to={"/listProduct"} className="listProduct__nav1--item">
                <div className="nav1--item--img" style={{width:"70px",height:"60px"}}>
                  <img style={{width:"100%",height:"100%"}} src={item.imageCategory} alt="" />
                </div>
                <span>
                    {item.nameCategory}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div id="mainListProduct">
          {products?.map((productDetail) => (
            <Card
              style={{
                width: "18rem",
                boxShadow: "9px 10px 11px -6px rgba(0,0,0,0.28)",
              }}
              key={productDetail.idProduct}
            >
              <div style={{ width: "100%", height: "230px" }}>
                <Card.Img
                  variant="top"
                  src={productDetail.image}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <Card.Body>
                <Card.Title
                  style={{
                    textAlign: "center",
                    fontSize: "27px",
                    fontWeight: "700",
                    color: "#e31837",
                  }}
                >
                  {productDetail.nameProduct}
                </Card.Title>
                
                <Button
                  style={{
                    backgroundColor: "#e31837",
                    border: "none",
                    fontSize: "15px",
                    fontWeight: "800",
                    color: "#fff",
                    marginLeft: "35px",
                  }}
                  onClick={() => handleShow(productDetail.idProduct)}
                >
                  Các món trong combo
                </Button>

                <span style={{ textAlign: "center" }}>
                  <p
                    style={{
                      marginTop: "20px",
                      fontWeight: "700",
                      fontSize: "18px",
                    }}
                  >
                    Giá: {VND.format(productDetail.price)}
                  </p>
                </span>
                <Button
                  style={{
                    backgroundColor: "#e31837",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#fff",
                    marginLeft: "75px",
                    width: "100px",
                    height: "50px",
                  }}
                  onClick={() => handleBuy(productDetail.idProduct)}
                >
                  Mua
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
       
          <div id="modal" >
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Body>
                <div id="product__Detail--img">
                  <img
                    style={{
                      width: "80%",
                      height: "80%",
                      objectFit: "cover",
                      margin: "0 auto",
                      boxShadow: "0 7px 5px rgba(0, 0, 0, 0.25)",
                    }}
                    src={productDetail.image}
                    alt=""
                  />
                </div>
                <div id="product__Detail--infor">
                  
                  <p
                    style={{
                      marginTop: "20px",
                      fontWeight: "700",
                      fontSize: "18px",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    {productDetail.description}
                  </p>
                  <Button
                    style={{
                      backgroundColor: "#e31837",
                      border: "none",
                      fontSize: "18px",
                      fontWeight: "800",
                      color: "#fff",
                      marginLeft: "170px",
                      width: "130px",
                      height: "50px",
                      marginTop: "20px",
                    }}
                    onClick={() => handleBuy(productDetail.idProduct)}
                  >
                    Mua ngay
                  </Button>{" "}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button 
                variant="secondary" 
                style={{ backgroundColor: "grey",border: "none" }}
                onClick={handleClose}>
                  Đóng
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        
      </div>
      <Footer></Footer>
    </>
  );
}
