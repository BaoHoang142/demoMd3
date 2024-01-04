import React, { useEffect } from "react";
import "./ManagerCategory.scss";
import HeaderAdmin from "../../../components/layout/headerAdmin/HeaderAdmin";
import { notification } from "antd";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import privateAxios from "../../../config/privateAxios";

export default function ManagerCategory() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categories, setCategories] = useState([]);
  const [check, setCheck] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [newCategory, setNewCategory] = useState({
    nameCategory: "",
    imageCategory: "",
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
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleGetCates = async () => {
    try {
      const response = await privateAxios("/api/v1/categories");
      setCategories(response.data);
    } catch (error) {
      notification.error({
        message: `${error.response.data.message}`,
      });
    }
  };
  useEffect(() => {
    handleGetCates();
  }, []);
  const handleAddCategory = async () => {
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
      const response = await privateAxios.post("/api/v1/category", {
        ...newCategory,
        imageCategory: media,
      });
      setCategories(response.data.cates);
      setShow(false);
      setNewCategory({
        imageCategory: "",
        nameCategory: "",
        categoryId: "",
      });
      notification.success({
        message: `${response.data.message}`,
      });
    } catch (error) {
      notification.error({
        message: `${error.response.data.message}`,
      });
    }
  };
  console.log(newCategory);
  const handleSave = async () => {
    try {
      const response = await privateAxios.put(
        `/api/v1/category/${newCategory.categoryId}`,
        newCategory
      );
      console.log(response);
      setShow(false);
      setCheck(false);
      setNewCategory({
        imageCategory: "",
        nameCategory: "",
        categoryId: "",
      });
      setCategories(response.data.cates);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditCategory = async (item) => {
    console.log("33333", item);
    setNewCategory({
      nameCategory: item.nameCategory,
      imageCategory: item.imageCategory,
      categoryId: item.categoryId,
    });
    console.log(newCategory);
    setShow(true);
    setCheck(true);
  };
  const handleDeleteCategory = async (id) => {
    try {
      if (confirm("Bạn chắc chắn muốn xóa ?")) {
        const response = await privateAxios.delete(`/api/v1/category/${id}`);
        console.log(response);
        setCategories(response.data.cates);
      }
    } catch (error) {
      notification.error({
        message: `${error.response.data.message}`,
      });
    }
  };
  return (
    <>
      <HeaderAdmin></HeaderAdmin>
      <div id="managerCategory">
        <div id="managerCategory__navbar">
          <div
            className="managerCategory__managerAdminAccount"
            style={{ textAlign: "center" }}
          >
            <strong style={{ fontSize: "25px" }}>
              {/* {admin.Admin ? `${admin.Admin}` : "Tài khoản của tôi"} */}
              Admin
            </strong>
          </div>
          <div className="managerCategory__inforManagerAdminAccount">
            <ul className="managerCategory__inforManagerAdminAccount__listInfor">
              <li className="managerCategory__inforManagerAdminAccount__listInfor--current">
                <Link
                  to={"/adminUser"}
                  className="managerCategory__inforManagerAdminAccount--current__text"
                >
                  QUẢN LÝ NGƯỜI DÙNG
                </Link>
              </li>
              <li className="managerCategory__inforManagerAdminAccount__listInfor--buy">
                <Link
                  to={"/adminProduct"}
                  className="managerCategory__inforManagerAdminAccount--buy__text"
                >
                  quản lý sản phẩm
                </Link>
              </li>
              <li className="managerCategory__inforManagerAdminAccount__listInfor--delivery">
                <a className="managerCategory__inforManagerAdminAccount--delivery__text">
                  quản lý chủng loại
                </a>
              </li>
              <li className="managerCategory__inforManagerAdminAccount__listInfor--sale">
                <Link
                  to={"/adminOrder"}
                  className="managerCategory__inforManagerAdminAccount--sale__text"
                >
                  Danh sách order
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div id="managerCategory__Category">
          <Button
            style={{
              backgroundColor: "#e31837",
              border: "none",
              fontWeight: "700",
            }}
            onClick={handleShow}
          >
            Thêm category
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thêm category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                ></Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Tên category</Form.Label>
                  <Form.Control
                    type="name"
                    name="nameCategory"
                    onChange={changeValue}
                    value={newCategory?.nameCategory}
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
                    name="imageCategory"
                    onChange={handleAddMedia}
                    type="file"
                    autoFocus
                  />
                  <br />
                  <label htmlFor="hh">Ảnh sản phẩm</label>
                  <img id="hh" src={newCategory?.imageCategory} alt="" />
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
                onClick={check ? handleSave : handleAddCategory}
              >
                {check ? "Sửa" : "Thêm"}
              </Button>
            </Modal.Footer>
          </Modal>
          <div id="managerProduct__Category--renderCategory">
            <Table striped="columns">
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th style={{ width: "30px" }}>STT</th>
                  <th style={{ width: "120px" }}>Category</th>
                  <th style={{ width: "120px" }}>Ảnh</th>
                  <th style={{ width: "100px" }}>Sửa, xóa</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td style={{ textAlign: "center" }}>
                        {item.nameCategory}
                      </td>
                      <td style={{ textAlign: "center", height: "140px" }}>
                        <img
                          style={{
                            objectFit: "cover",
                            height: "200px",
                            width: "100%",
                          }}
                          src={item.imageCategory}
                          alt=""
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Button
                          variant="success"
                          style={{ backgroundColor: "green", color: "#fff" }}
                          onClick={() => handleEditCategory(item)}
                        >
                          Sửa
                        </Button>{" "}
                        <Button
                          variant="danger"
                          style={{ backgroundColor: "#E31837", color: "#fff" }}
                          onClick={(id) =>
                            handleDeleteCategory(item.categoryId)
                          }
                        >
                          Xóa
                        </Button>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
