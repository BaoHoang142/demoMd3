import React, { useEffect, useState } from "react";
import { notification } from "antd";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import HeaderAdmin from "../../../components/layout/headerAdmin/HeaderAdmin";
import "./ManagerOrder.scss";
import { Link, useNavigate } from "react-router-dom";
import privateAxios from "../../../config/privateAxios";
export default function ManagerOrder() {
  const [bill, setBill] = useState([]);
  const [flag, setFlag] = useState(false);
  const handleGetBill = async () => {
    try {
      const res = await privateAxios.get(`/api/v1/bills`);
      console.log("33333",res)
      setBill(res.data.allBills)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleGetBill()
  }, [flag]) 
  const handleConfirmOder = async(id) => {
    try {
      if (confirm("Bạn có muốn xác nhận đơn hàng")) {
        const res = await privateAxios.patch(`/api/v1/billStatus/${id}`)
        setFlag(!flag)
        notification.success({
          message: `${res.data.message}`,
        });
        // setBill(res.data)  
      }
    } catch (error) {
      console.log(error)
    }
    
  }
  const handleDeleteOrder = async(id) => {
    try {
      if (confirm("Bạn có muốn hủy đơn hàng")) {
        const res = await privateAxios.patch(`/api/v1/billDeleteStatus/${id}`)
        setFlag(!flag)
        notification.error({
          message: `${res.data.message}`,
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <HeaderAdmin></HeaderAdmin>
      <div id="managerOrder">
        <div id="managerOrder__navbar">
          <div
            className="managerOrder__managerAdminAccount"
            style={{ textAlign: "center" }}
          >
            <strong style={{ fontSize: "25px" }}>
            Admin
            </strong>
          </div>
          <div className="managerOrder__inforManagerAdminAccount">
            <ul className="managerOrder__inforManagerAdminAccount__listInfor">
              <Link
                to={"/adminUser"}
                className="managerOrder__inforManagerAdminAccount__listInfor--current"
                style={{ textDecoration: "none" }}
              >
                <strong className="managerOrder__inforManagerAdminAccount--current__text">
                  QUẢN LÝ NGƯỜI DÙNG
                </strong>
              </Link>
              <li className="managerOrder__inforManagerAdminAccount__listInfor--buy">
                <Link
                  to={"/adminProduct"}
                  className="managerOrder__inforManagerAdminAccount--buy__text"
                >
                  quản lý sản phẩm
                </Link>
              </li>
              <li className="managerOrder__inforManagerAdminAccount__listInfor--delivery">
                <Link
                  to={"/adminCategory"}
                  className="managerOrder__inforManagerAdminAccount--delivery__text"
                >
                  quản lý chủng loại
                </Link>
              </li>
              <li className="managerOrder__inforManagerAdminAccount__listInfor--sale">
                <a className="managerOrder__inforManagerAdminAccount--sale__text">
                  Danh sách order
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div id="managerOrder__renderProduct">
          <Table striped="columns">
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th style={{ width: "30px" }}>STT</th>
                <th style={{ width: "180px" }}>Tên người nhận</th>
                <th style={{ width: "130px" }}>Số điện thoại</th>
                <th style={{ width: "100px" }}>Địa chỉ</th>
                <th style={{ width: "150px" }}>Ghi chú</th>
                <th style={{ width: "150px" }}>Trạng thái </th>
                <th style={{ width: "150px" }}>Xử lý đơn hàng</th>
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
                      style={{fontWeight:"900",color:"rgb(227,24,55)"}}
                      >
                        {item.status}
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div style={{ display: "flex", gap: "20px" }}>
                        <Button
                          variant="success"
                          className={item.status === "Đang xử lý" ? "deleteOder" : "checkDeleteOder"}
                          disabled={item.status === "Đang xử lý" ? false : true}
                          style={{ height: "40px", width: "100px",backgroundColor: "green", color: "white" }}
                          onClick={() => handleConfirmOder(item.idBill)}
                        >
                          Xác nhận
                        </Button>
                        <Button
                          disabled={
                            item.status === "Đang xử lý"
                              ? false
                              : true
                          }
                          style={{ height: "40px", width: "100px", backgroundColor: "red", color: "white",border:"none" }}
                          onClick={() => handleDeleteOrder(item.idBill)}
                        >
                          Hủy đơn
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
