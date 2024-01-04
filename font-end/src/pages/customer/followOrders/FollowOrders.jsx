import React, { useEffect, useState } from "react";
import "./FollowOrders.scss";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { VND } from "../../../util";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Header from "../../../components/layout/Header/Header";
import publicAxios from "../../../config/publicAxios";
export default function FollowOrder() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [flag, setFlag] = useState(true);
  const [bill, setBill] = useState([]);
  const [showOrderDetail,setShowOrderDetail] = useState([])
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const handleGetBill = async () => {
    try {
      const res = await publicAxios.get(`/api/v1/bill/${userLogin.id}`);
      console.log("66666",res)
      setBill(res.data.bills)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleGetBill()
  }, [flag])
  
  const handleDeleteOrder = async(id) => {
    try {
      if (confirm("Bạn có muốn hủy đơn hàng")) {
        const res = await publicAxios.patch(`/api/v1/billDeleteStatus/${id}`)
        setFlag(!flag)
        notification.error({
          message: `${res.data.message}`,
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleShowOrderDetail = async(id) => {
    try {
      const res = await publicAxios.get(`/api/v1/billDetail/${id}`)
      console.log("4444444",res)
      setShowOrderDetail(res.data)
        handleShow()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Header></Header>
      <div id="FollowOrder">
        <div id="FollowOrder__navbar">
          <div
            className="FollowOrder__managerAdminAccount"
            style={{ textAlign: "center" }}
          >
            <strong style={{ fontSize: "25px" }}>Tài khoản của tôi</strong>
          </div>
          <div className="FollowOrder__inforManagerAdminAccount">
            <ul className="FollowOrder__inforManagerAdminAccount__listInfor">
              <Link
                to={"/customer"}
                className="FollowOrder__inforManagerAdminAccount__listInfor--current"
                style={{ textDecoration: "none" }}
              >
                <strong className="FollowOrder__inforManagerAdminAccount--current__text">
                  QUẢN LÝ TÀI KHOẢN
                </strong>
              </Link>
              <li className="FollowOrder__inforManagerAdminAccount__listInfor--buy">
                <Link
                  to={"/cart"}
                  className="FollowOrder__inforManagerAdminAccount--buy__text"
                >
                  Đơn hàng của tôi
                </Link>
              </li>
              <li className="FollowOrder__inforManagerAdminAccount__listInfor--delivery">
                <a className="FollowOrder__inforManagerAdminAccount--delivery__text">
                  Theo dõi vận chuyển
                </a>
              </li>
              <li className="FollowOrder__inforManagerAdminAccount__listInfor--sale">
                <a className="FollowOrder__inforManagerAdminAccount--sale__text">
                  Danh sách ưu đãi
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div id="FollowOrder__renderProduct">
          <Table striped="columns">
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th style={{ width: "10px" }}>STT</th>
                <th style={{ width: "180px" }}>Tên người nhận</th>
                <th style={{ width: "100px" }}>Số điện thoại</th>
                <th style={{ width: "130px" }}>Địa chỉ nhận</th>
                <th style={{ width: "130px" }}>Ghi chú</th>
                <th style={{ width: "110px" }}>Trạng thái</th>
                <th style={{ width: "100px" }}>Đơn hàng</th>
                <th style={{ width: "150px" }}>Hủy đơn hàng</th>
              </tr>
            </thead>
            <tbody>
              {bill.map((item, index) => {
                return (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    
                    <td style={{ textAlign: "center" }}>{item.nameUser}</td>
                    <td style={{ textAlign: "center" }}>{item.phone}</td>
                    <td style={{ textAlign: "center" }}>{item.address}</td>
                    <td style={{ textAlign: "center" }}>{item.note}</td>
                    <td style={{ textAlign: "center" }}>
                      <div
                      >
                        {item.status}
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        variant="success"
                        style={{ backgroundColor: "rgb(23,124,77)"}}
                        onClick={() => handleShowOrderDetail(item.idBill)}
                      >
                        Xem
                      </Button>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        variant="danger"
                        style={{ backgroundColor: "rgb(227,24,55)" }}
                        disabled={
                          item.status == "Đang xử lý" 
                            ? false
                            : true
                        }
                        onClick={() => handleDeleteOrder(item.idBill)}
                      >
                        Hủy đơn
                      </Button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin chi tiết đơn hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped="columns" style={{ marginTop: "40px" }}>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th style={{ width: "30px" }}>STT</th>
                  <th style={{ width: "100px" }}>Tên sản phẩm</th>
                  <th style={{ width: "130px" }}>Ảnh</th>
                  <th style={{ width: "100px" }}>Giá</th>
                  <th style={{ width: "100px" }}>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {showOrderDetail?.map((item, index) => {
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
                            // marginLeft: "50px",
                          }}
                          src={item.image}
                          alt=""
                        />
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "700" }}>
                        <div style={{ marginTop: "30px" }}>
                          <span> {VND.format(item.price)}</span>
                        </div>
                      </td>

                      <td
                        style={{
                          textAlign: "center",
                          fontWeight: "700",
                        }}
                      >
                        <div>
                          <span>{item.quantity}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div style={{ float: "right", marginRight: "80px" }}>
              <div
                id="total"
                style={{
                  fontSize: "25px",
                  fontWeight: "800",
                  color: "#e31837",
                }}
              >
                {/* <p>Tổng tiền: {VND.format(showOrderDetail.total)}</p> */}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button 
            style={{ backgroundColor: "grey",border: "none" }}
            onClick={handleClose}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
