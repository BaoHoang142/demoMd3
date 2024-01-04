import React, { useEffect } from "react";
import { useState } from "react";
import { VND } from "../../../util";
import { Pagination, notification } from "antd";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import "./ManagerProduct.scss";
import HeaderAdmin from "../../../components/layout/headerAdmin/HeaderAdmin";
import { Link, useNavigate } from "react-router-dom";
import publicAxios from "../../../config/publicAxios";
import privateAxios from "../../../config/privateAxios";
import axios from "axios";
export default function ManagerProduct() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [check, setCheck] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");

  const filterProduct = () => {
    return allProducts.filter((item) =>
      item.nameProduct.toLowerCase().includes(search)
    );
  };

  const renderArray = filterProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts = renderArray.slice(startIndex, endIndex);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };


  const [product, setProduct] = useState({
    nameProduct: "",
    price: 0,
    description: "",
    stock: 0,
    image: "",
    categoryId: 0,
  });
  const handleAddMedia = (event) => {
    setSelectedMedia(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  const changeValue = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleGetCates = async () => {
    try {
      const response = await publicAxios.get("/api/v1/categories");
      setCategories(response.data);
    } catch (error) {
      notification.error({
        message: `${error.response.data.message}`,
      });
    }
  };
  const handleGetProducts = async () => {
    try {
      const response = await publicAxios.get("/api/v1/products");
      setAllProducts(response.data);
      console.log(response.data);
      setShow(false);
    } catch (error) {
      notification.error({
        message: `${error.response.data.message}`,
      });
    }
  };
  useEffect(() => {
    handleGetCates();
    handleGetProducts();
  }, []);
  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "projectMd3");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/dzmiglgd4/image/upload",
          formData
        ),
      ]);
      const media = uploadMedia.data.secure_url;
      console.log(media);
      const response = await privateAxios.post("/api/v1/product", {
        ...product,
        stock: +product.stock,
        price: +product.price,
        categoryId: +product.categoryId,
        image: media,
      });
      console.log(product);
      setAllProducts(response.data.products);
      notification.success({
        message: `${response.data.message}`,
      });

      setShow(false);
      setProduct({
        nameProduct: "",
        price: 0,
        description: "",
        stock: 0,
        image: "",
        categoryId: 0,
      });
    } catch (error) {
      notification.error({
        message: `${error.response.data.message}`,
      });
    }
  };
  const handleSaveProduct = async () => {
    console.log(777777777);
    try {
      const response = await privateAxios.put(
        `/api/v1/products/${product.idProduct}`,
        product
      );
      setShow(false);
      setCheck(false);
      setProduct({
        nameProduct: "",
        price: 0,
        description: "",
        stock: 0,
        image: "",
        categoryId: 0,
      });
      setAllProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  // sua
  const handleEditProduct = (item) => {
    console.log("33333", item);
    setProduct({
      nameProduct: item.nameProduct,
      price: item.price,
      description: item.description,
      stock: item.stock,
      image: item.image,
      categoryId: item.categoryId,
      idProduct: item.idProduct,
    });
    setShow(true);
    setCheck(true);
  };
  const handleDeleteProduct = async (id) => {
    try {
      if (confirm("Bạn có muốn xóa sản phẩm này?")) {
        const response = await privateAxios.delete(
          `/api/v1/deleteProduct/${id}`
        );
        console.log(response);
        setAllProducts(response.data.products);
      }
    } catch (error) {
      notification.error({
        message: `${error.response.data.message}`,
      });
    }
  };
  const handleSearch = async () => {
    try {
      const response = await publicAxios.get(
        `/api/v1/products/search?key=${search}`
      );
      console.log("first", response.data);
      setAllProducts(response.data);
    } catch (error) {}
  };
  return (
    <>
      <HeaderAdmin></HeaderAdmin>
      <div id="managerProduct">
        <div id="managerProduct__navbar">
          <div
            className="managerProduct__managerAdminAccount"
            style={{ textAlign: "center" }}
          >
            <strong style={{ fontSize: "25px" }}>
              {/* {admin?.Admin ? `${admin?.Admin}` : "Tài khoản của tôi"} */}
              Admin
            </strong>
          </div>
          <div className="managerProduct__inforManagerAdminAccount">
            <ul className="managerProduct__inforManagerAdminAccount__listInfor">
              <li className="managerProduct__inforManagerAdminAccount__listInfor--current">
                <Link
                  to={"/adminUser"}
                  className="managerProduct__inforManagerAdminAccount--current__text"
                >
                  QUẢN LÝ NGƯỜI DÙNG
                </Link>
              </li>
              <li className="managerProduct__inforManagerAdminAccount__listInfor--buy">
                <a className="managerProduct__inforManagerAdminAccount--buy__text">
                  quản lý sản phẩm
                </a>
              </li>
              <li className="managerProduct__inforManagerAdminAccount__listInfor--delivery">
                <Link
                  to={"/adminCategory"}
                  className="managerProduct__inforManagerAdminAccount--delivery__text"
                >
                  quản lý chủng loại
                </Link>
              </li>
              <li className="managerProduct__inforManagerAdminAccount__listInfor--sale">
                <Link
                  to={"/adminOrder"}
                  className="managerProduct__inforManagerAdminAccount--sale__text"
                >
                  Danh sách order
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div id="managerProduct__addProduct">
          <div
            className="managerProduct__addProduct--form"
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={{
                backgroundColor: "#e31837",
                border: "none",
                fontWeight: "700",
              }}
              onClick={handleShow}
            >
              Thêm sản phẩm
            </Button>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <InputGroup
                className="mb-3"
                style={{ width: "700px", marginTop: "20px" }}
              >
                <Form.Control
                  placeholder="Tìm kiếm..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  name="search_Product"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </InputGroup>
              <Button
                style={{
                  backgroundColor: "#e31837",
                  border: "none",
                  fontWeight: "700",
                }}
                onClick={handleSearch}
              >
                Tìm kiếm
              </Button>
            </div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thêm sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={changeValue}
                    value={product.categoryId}
                    name="categoryId"
                  >
                    <option value="">Chọn category</option>
                    {categories.map((item, index) => {
                      return (
                        <option value={item.categoryId} key={index}>
                          {item.nameCategory}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    type="name"
                    name="nameProduct"
                    onChange={changeValue}
                    value={product.nameProduct}
                    placeholder=""
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Số lượng</Form.Label>
                  <Form.Control
                    type="text"
                    name="stock"
                    onChange={changeValue}
                    value={product.stock}
                    placeholder=""
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Thêm ảnh</Form.Label>
                  <Form.Control
                    name="img"
                    // onChange={changeImage}
                    type="file"
                    // value={product.image}
                    onChange={handleAddMedia}
                    autoFocus
                  />
                  <br />
                  <label htmlFor="hh">Ảnh sản phẩm</label>
                  <img id="hh" src={product.image} alt="" />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    name="price"
                    onChange={changeValue}
                    value={product.price}
                    placeholder="VNĐ"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Mô tả sản phẩm</Form.Label>
                  <Form.Control
                    name="description"
                    onChange={changeValue}
                    value={product.description}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                style={{ backgroundColor: "rgb(227,24,55)", border: "none" }}
                onClick={handleClose}
              >
                Đóng
              </Button>
              <Button
                variant="success"
                style={{ backgroundColor: "blue", border: "none" }}
                onClick={() => (check ? handleSaveProduct() : handleAdd())}
              >
                {check ? "Sửa" : "Thêm"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div id="managerProduct__renderProduct" style={{ height: "800px" }}>
          <Table striped="columns">
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th style={{ width: "30px" }}>STT</th>
                <th style={{ width: "120px" }}>Tên sản phẩm</th>
                <th style={{ width: "120px" }}>Số lượng</th>
                <th style={{ width: "130px" }}>Ảnh</th>
                <th style={{ width: "100px" }}>Giá</th>
                <th style={{ width: "180px" }}>Mô tả</th>
                <th style={{ width: "100px" }}>Sửa, xóa</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts
                .filter((item) =>
                  item.nameProduct.toLowerCase().includes(search)
                )
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ textAlign: "center", fontWeight: "700" }}>
                        <div style={{ marginTop: "30px" }}>
                          <span>{index + 1}</span>
                        </div>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          fontWeight: "700",
                          textTransform: "uppercase",
                        }}
                      >
                        <div style={{ marginTop: "30px" }}>
                          <span>{item.nameProduct}</span>
                        </div>
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "700" }}>
                        <div style={{ marginTop: "30px" }}>
                          <span>{item.stock}</span>
                        </div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div style={{ width: "100px", height: "70px" }}>
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              marginLeft: "24px",
                            }}
                            src={item.image}
                            alt=""
                          />
                        </div>
                      </td>

                      <td style={{ textAlign: "center", fontWeight: "700" }}>
                        <div style={{ marginTop: "30px" }}>
                          <span>{VND.format(item.price)}</span>
                        </div>
                      </td>
                      <td>
                        <div
                          style={{
                            marginTop: "30px",
                            textTransform: "uppercase",
                          }}
                        >
                          <span>{item.description}</span>
                        </div>
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "700" }}>
                        <div style={{ marginTop: "30px" }}>
                          <Button
                            variant="success"
                            style={{ backgroundColor: "green", color: "#fff" }}
                            onClick={() => handleEditProduct(item)}
                          >
                            Sửa
                          </Button>{" "}
                          <Button
                            variant="danger"
                            style={{
                              backgroundColor: "#E31837",
                              color: "#fff",
                            }}
                            onClick={() => handleDeleteProduct(item.idProduct)}
                          >
                            Xóa
                          </Button>{" "}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          {/* bắt buộc có */}
          <Pagination
            current={currentPage}
            onChange={onPageChange}
            pageSize={itemsPerPage}
            total={renderArray.length}
            style={{ marginLeft: "450px" }}
          />
        </div>
      </div>
    </>
  );
}
