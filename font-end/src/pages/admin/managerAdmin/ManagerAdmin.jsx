import React from "react";
import "./ManagerAdmin.scss"
import { Outlet } from "react-router-dom";
export default function ManagerAdmin() {
  return (
    <>
      <div id="admin">
        <div id="admin__navbar">
          <div class="managerAdminAccount">
            <strong style={{ fontSize: "20px" }}>Admin</strong>
          </div>
          <div class="inforManagerAdminAccount">
            <ul class="inforManagerAdminAccount__listInfor">
              <li class="inforManagerAdminAccount__listInfor--current">
                <strong class="inforManagerAdminAccount--current__text">QUẢN LÝ NGƯỜI DÙNG</strong>
              </li>
              <li class="inforManagerAdminAccount__listInfor--buy">
                <a class="inforManagerAdminAccount--buy__text">quản lý sản phẩm</a>
              </li>
              <li class="inforManagerAdminAccount__listInfor--delivery">
                <a class="inforManagerAdminAccount--delivery__text">quản lý đơn hàng</a>
              </li>
              <li class="inforManagerAdminAccount__listInfor--sale">
                <a class="inforManagerAdminAccount--sale__text">Thêm ưu đãi</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet></Outlet>
    </>
  );
}
