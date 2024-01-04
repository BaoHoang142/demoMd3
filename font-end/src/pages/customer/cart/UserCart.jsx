import React, { useEffect, useState } from "react";
import "./UserCart.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { notification } from "antd";
import { VND } from "../../../util";
import Table from "react-bootstrap/Table";
import Header from "../../../components/layout/Header/Header";
import { Link } from "react-router-dom";
import publicAxios from "../../../config/publicAxios";
// import confirm from "antd/es/modal/confirm";
export default function UserCart() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [note, setNote] = useState("");
  const [cart, setCart] = useState([]);
  const [flag, setFlag] = useState(false);
  const [total, setTotal] = useState(0);
  const [bill, setBill] = useState("");
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const handleGetCart = async () => {
    try {
      const response = await publicAxios.get(`/api/v1/cart/${userLogin.id}`);
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cart);
  const handleDecre = async (id) => {
    const body = { cartId: id, type: "decre" };
    try {
      await publicAxios.patch(`/api/v1/cart/decre`, body);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };
  const handleIncre = async (id) => {
    const body = { cartId: id, type: "incre" };
    try {
      await publicAxios.patch(`/api/v1/cart/incre`, body);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCart = async (id_cart) => {
    try {
      if (confirm("Bạn có muốn xóa sản phẩm không ??")) {
        await publicAxios.delete(`/api/v1/cart/${id_cart}`);
        setFlag(!flag);
      }
    } catch (error) {
      console.log(11122221, error);
    }
  };
  useEffect(() => {
    handleGetCart();
  }, [flag]);

  const handleTotal = () => {
    let result = cart.reduce((a, b) => {
      return a + b.quantity * b.price;
    }, 0);
    setTotal(result);
  };
  useEffect(() => {
    handleTotal();
  }, [cart]);
  const handleBill = async () => {
    try {
      if (cart!="") {
        const bill = {
          userId: userLogin.id,
          address,
          nameUser,
          phone,
          note,
          total,
        };
        const response = await publicAxios.post("/api/v1/bill", bill);
        const billDetail = {
          billId: response.data.newIdBill,
          cart,
        };
        await publicAxios.post("/api/v1/billDetail", billDetail);
        await publicAxios.delete(`/api/v1/cart-payment/${userLogin.id}`);
        await publicAxios.post(`/api/v1/email`,userLogin);
        notification.success({
          message: "Thanh toán thành công",
        });
        setCart([]);
        handleClose(); 
      } else {
        notification.error({
          message: "Vui lòng mua hàng",
        });
      }
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header></Header>
      <div id="userCart">
        <div id="userCart__navbar">
          <div className="yourAccountt" style={{ textAlign: "center" }}>
            <strong style={{ fontSize: "25px" }}>Tài khoản của tôi </strong>
          </div>

          <div className="userCart__navbar--inforAccount">
            <ul className="userCart--inforAccount__listInfor">
              <li className="userCart--inforAccount__listInfor--current">
                <Link to={"/customer"} className="userCart--current__text">
                  QUẢN LÝ TÀI KHOẢN
                </Link>
              </li>
              <li className="userCart--inforAccount__listInfor--buy">
                <strong className="userCart--buy__text">
                  Đơn hàng của tôi
                </strong>
              </li>
              <li className="userCart--inforAccount__listInfor--delivery">
                <Link
                  to={"/customerOrder"}
                  className="userCart--delivery__text"
                >
                  Theo dõi vận chuyển
                </Link>
              </li>
              <li className="userCart--inforAccount__listInfor--sale">
                <a className="userCart--sale__text">Danh sách ưu đãi</a>
              </li>
            </ul>
          </div>
        </div>
        <div id="userCart__renderProduct">
          <Table striped="columns" style={{ marginTop: "40px" }}>
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th style={{ width: "30px" }}>STT</th>
                <th style={{ width: "100px" }}>Tên sản phẩm</th>
                <th style={{ width: "130px" }}>Ảnh</th>
                <th style={{ width: "100px" }}>Giá</th>
                <th style={{ width: "100px" }}>Số lượng</th>
                <th style={{ width: "100px" }}></th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      <div style={{ marginTop: "30px" }}>
                        <span>{index + 1}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "700" }}>
                      <div style={{ marginTop: "30px" }}>
                        <span>{item.nameProduct}</span>
                      </div>
                    </td>
                    <td style={{ alignItems: "center" }}>
                      <img
                        style={{
                          width: "80px",
                          height: "80px",
                          marginLeft: "50px",
                        }}
                        src={item.image}
                        alt=""
                      />
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "700" }}>
                      <div style={{ marginTop: "30px" }}>
                        <span>{VND.format(item.price)}</span>
                      </div>
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "30px",
                          marginTop: "20px",
                          marginLeft: "100px",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          style={{
                            backgroundColor: "#e31837",
                            border: "none",
                            fontSize: "20px",
                            fontWeight: "800",
                            width: "40px",
                          }}
                          onClick={() => handleDecre(item.cartId)}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          style={{
                            backgroundColor: "#e31837",
                            border: "none",
                            fontSize: "20px",
                            fontWeight: "800",
                            width: "40px",
                          }}
                          onClick={() => handleIncre(item.cartId)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div style={{ marginTop: "22px" }}>
                        <Button
                          style={{
                            backgroundColor: "#e31837",
                            border: "none",
                            fontWeight: "800",
                          }}
                          onClick={() => deleteCart(item.cartId)}
                        >
                          Xóa
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div style={{ float: "right", marginRight: "80px" }}>
            <div id="total">
              <p>Tổng tiền: {VND.format(total)} </p>
            </div>
            <Button
              style={{
                backgroundColor: "#e31837",
                border: "none",
                fontSize: "20px",
                fontWeight: "800",
                height: "50px",
                float: "right",
              }}
              // onClick={() => handleStatus(item)}
              onClick={handleShow}
            >
              Thanh toán ngay
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Xử lý thanh toán</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Tên người nhận</Form.Label>
                    <Form.Control
                      type="name"
                      name="nameUser"
                      onChange={(e) => setNameUser(e.target.value)}
                      placeholder=""
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder=""
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Địa chỉ người nhận</Form.Label>
                    <Form.Control
                      name="address"
                      type="text"
                      autoFocus
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control
                      name="note"
                      onChange={(e) => setNote(e.target.value)}
                      as="textarea"
                      rows={3}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  style={{ backgroundColor: "grey", border: "none" }}
                  onClick={handleClose}
                >
                  Đóng
                </Button>
                <Button
                  style={{ backgroundColor: "#e31837", border: "none" }}
                  onClick={handleBill}
                >
                  Thanh toán ngay
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>

      {/* <Footer></Footer> */}
    </>
  );
}
