import React, { useEffect, useState } from "react";
import "./Register.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../../components/layout/Header/Header.jsx";
import { notification } from "antd";
import Footer from "../../components/layout/Footer/Footer.jsx";
import publicAxios from "../../config/publicAxios.js";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  const nav = useNavigate()
    const [newUser, setNewUser] = useState({
        userName: "",
        email: "",
        password: "",
        gender: 0,
        address: "",
        confirmPassword: ""
    })
    const changeValue= (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }
    const handleRegister = async(e) => {
        e.preventDefault()
        try {
            const response = await publicAxios.post("/api/auth/signup", newUser)
            notification.success({
              message: "Đăng ký thành công",
            });
            nav("/login")
        } catch (error) {
          notification.error({
            message: `${error.response.data.message}`,
          });
        }
    }
  return (
    <>
      <Header></Header>
      <div id="register--form">
        <h1>ĐĂNG KÝ TÀI KHOẢN</h1>
        <div>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicEmail" id="form">
              <Form.Control
                type="FullName"
                placeholder="Họ và Tên*"
                style={{ height: "52px" }}
                onChange={changeValue}
                value={newUser.userName}
                name="userName"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail" id="form">
              <Form.Control
                type="email"
                placeholder="Email*"
                style={{ height: "52px" }}
                onChange={changeValue}
                value={newUser.email}
                name="email"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail" id="form">
              <Form.Control
                type="address"
                placeholder="Địa chỉ*"
                style={{ height: "52px" }}
                onChange={changeValue}
                value={newUser.address}
                name="address"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail" id="form">
              <Form.Control
                type="password"
                placeholder="Mật khẩu*"
                style={{ height: "52px" }}
                onChange={changeValue}
                value={newUser.password}
                name="password"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            

            <Form.Select
              className="mb-3"
              aria-label="Default select example"
              id="select-sex"
              name="gender"
              style={{ height: "52px" }}
              onChange={changeValue}
            >
              <option>Giới tính*</option>
              <option value={0}>Nam</option>
              <option value={1}>Nữ</option>
            </Form.Select>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Đồng ý với chính sách, quy định chung và thông báo bảo mật cá nhân"
                id="check"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Nhận chương trình khuyến mãi qua email"
                id="check"
              />
            </Form.Group>
            <br />
            <br />
            <div style={{ display: "flex", gap: "70px", alignItems: "center" }}>
              <Button
                
                variant="primary"
                type="submit"
                style={{
                  width: "200px",
                  fontWeight: "900",
                  color: "white",
                  backgroundColor: "#e31837",
                  border: "1px solid #e31837",
                  height: "50px",
                }}
              >
                ĐĂNG KÝ
              </Button>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <p> Bạn đã có tài khoản?</p>
                <p style={{color:"blue"}}>
                  <Link to={"/login"}> Đăng nhập</Link>
                </p>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
