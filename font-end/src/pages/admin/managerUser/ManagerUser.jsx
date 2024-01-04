import React, { useEffect } from "react";
import { notification } from "antd";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import "./ManagerUser.scss";
import HeaderAdmin from "../../../components/layout/headerAdmin/HeaderAdmin";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import privateAxios from "../../../config/privateAxios";
import publicAxios from "../../../config/publicAxios";
export default function ManagerUser() {
  const navigate = useNavigate()
  const users = JSON.parse(localStorage.getItem("userLogin"));
  const [renderUsers, setRenderUsers] = useState([]);
  const [check, setCheck] = useState(false);
  const handleGetUsers = async () => {
    try {
      const response = await privateAxios.get("/api/v1/users");
      setRenderUsers(response.data.users);
    } catch (error) {
      notification.error({
        message: `${error.response.data.message}`,
      });
    }
  };
  useEffect(() => {
    handleGetUsers();
  }, []);
  console.log(renderUsers)
  const handleChangeStatus = async (id) => {
    try {
      const response = await publicAxios.patch(`/api/v1/users/${id}`);
      setRenderUsers(response.data.users);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <HeaderAdmin></HeaderAdmin>
      <div id="managerUser">
        <div id="managerUser__navbar">
          <div
            className="managerUser__managerAdminAccount"
            style={{ textAlign: "center" }}
          >
            <strong style={{ fontSize: "25px" }}>
            Admin
            </strong>
          </div>
          <div className="managerUser__inforManagerAdminAccount">
            <ul className="managerUser__inforManagerAdminAccount__listInfor">
              <li className="managerUser__inforManagerAdminAccount__listInfor--current">
                <strong className="managerUser__inforManagerAdminAccount--current__text">
                  QUẢN LÝ NGƯỜI DÙNG
                </strong>
              </li>
              <li className="managerUser__inforManagerAdminAccount__listInfor--buy">
                <Link
                  to={"/adminProduct"}
                  className="managerUser__inforManagerAdminAccount--buy__text"
                >
                  quản lý sản phẩm
                </Link>
              </li>
              <li className="managerUser__inforManagerAdminAccount__listInfor--delivery">
                <Link
                  to={"/adminCategory"}
                  className="managerUser__inforManagerAdminAccount--delivery__text"
                >
                  quản lý chủng loại
                </Link>
              </li>
              <li className="managerUser__inforManagerAdminAccount__listInfor--sale">
                <Link
                  to={"/adminOrder"}
                  className="managerUser__inforManagerAdminAccount--sale__text"
                >
                  Danh sách order
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div id="managerUser__renderProduct" style={{marginTop:"-20px"}}>
          <Table striped="columns">
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th style={{ width: "30px" }}>STT</th>
                <th style={{ width: "180px" }}>Tên người dùng</th>
                <th style={{ width: "130px" }}>Email</th>
                <th style={{ width: "100px" }}>Address</th>
                <th style={{ width: "180px" }}>Trạng thái người dùng</th>
              </tr>
            </thead>
            <tbody>
              {renderUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td style={{ textAlign: "center" }}>{item.userName}</td>
                    <td style={{ textAlign: "center" }}>{item.email}</td>
                    <td style={{ textAlign: "center" }}>{item.address}</td>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        variant="primary"
                        disabled = {item.role == 1 ? true : false}
                        style={{backgroundColor:`${item.status == 1 ? "#0B5ED7" : "#e31837"}`,border:"none",fontWeight:"700"}}
                        className={item.status == 1 ? "banUser" : "activeUser"}
                        onClick={() => handleChangeStatus(item.id)}
                      >
                        {item.status==1 ? "Active" : "Ban"}
                      </Button>{" "}
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
