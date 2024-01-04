import React from "react";
import { BsTwitter } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import giaohangtannoi from "../../../assets/imgs/giaohangtannoi.png";
import bocongthuong from "../../../assets/imgs/bocongthuong.png";
export default function Footer() {
  return (
    <>
      <div
        className=" text-slate-50"
        style={{ backgroundColor: "#e31837", height: "540px" }}
      >
        <div className="h-52 flex justify-around gap-30 mt-20">
          <div className="mt-5 gap-4 ">
            <p className="text-xl">
              <strong>CÔNG TY TNHH JOLLIBEE VIỆT NAM</strong>
            </p>
            <p className="mt-5 ">
              Địa chỉ: Số 7 Thiền Quang
              <br />
              Thành phố Hà Nội, Việt Nam
            </p>
            <p className="mt-2 ">Điện thoại: (028) xxx9999</p>
            <p className="mt-2 ">Tổng đài: 1900-1001</p>
            <p className="mt-2 ">Mã số thuế: 0303883266</p>
            <p className="mt-2 ">
              Ngày cấp: 15/07/2008 <br />
              <br />
              Nơi cấp: Cục Thuế Hà Nội
            </p>
            <p >Hộp thư góp ý: xindunggopy@jollibee.com.vn</p>
          </div>
          <div className="mt-5">
            <p className="text-xl">
              <img src={giaohangtannoi} alt="" />
            </p>
            <p className="mt-2 ">Liên hệ</p>
            <p className="mt-2 ">Chính sách và quy định chung</p>
            <p className="mt-2 ">
              Chính sách thanh toán khi <br />
              đặt hàng
            </p>
            <p className="mt-2 ">Chính sách hoạt động</p>
            <p className="mt-2 ">Chính sách bảo mật thông tin</p>
            <p className="mt-2 ">Thông tin vận chuyển và giao nhận</p>
          </div>
          <div className="mt-5">
            <p className="text-xl">
              <strong>HÃY KẾT NỐI VỚI CHÚNG TÔI</strong>
            </p>
            <p className="mt-2 ">Lời phản hồi của bạn cho chúng tôi!</p> <br />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="  Your feedback..."
                className=" h-9 text-gray-900 border-solid border-2 border-dark-500 rounded-md"
              />
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Send
              </button>
            </div>
            <div>
              <img src={bocongthuong} alt="" />
            </div>
            <hr />
            <p style={{ fontSize: "20px", fontWeight: "700" }} className="mt-5 ">
              TẢI ỨNG DỤNG ĐẶT HÀNG <br />
              VỚI NHIỀU ƯU ĐÃI HƠN
            </p>
          </div>
        </div>
        <hr style={{ marginTop: "220px", fontWeight: "30px" }} />
        <div className="h-24 flex justify-around gap-60 mt-5">
          <p>© Project Module 2 by Bảo Hoàng</p>
          <div className="flex gap-3">
            <BsTwitter className="text-2xl cursor-pointer"></BsTwitter>
            <BsFacebook className="text-2xl cursor-pointer"></BsFacebook>
            <BsInstagram className="text-2xl cursor-pointer"></BsInstagram>
          </div>
        </div>
      </div>
    </>
  );
}
