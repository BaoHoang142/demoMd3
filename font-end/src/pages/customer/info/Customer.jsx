import React from 'react'
import "./Customer.scss"
import Header from '../../../components/layout/Header/Header'
import { Link } from 'react-router-dom';
import Footer from '../../../components/layout/Footer/Footer';
export default function Customer() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  console.log(userLogin)

  return (
    <>
    <Header></Header>
    <div id='customer'>
        <div id='customer__main'>
            <h1>QUẢN LÝ TÀI KHOẢN</h1>
            <p>Xin chào {userLogin.userName}. Với trang này, bạn sẽ quản lý được tất cả thông tin tài khoản của mình.</p>
            <div id='infor--customer'>
                <div id='title--cus'>
                    <span style={{marginLeft:"10px"}}>
                        <strong>THÔNG TIN TÀI KHOẢN</strong>
                    </span>
                </div>
                <div id='content--cus'>
                    <div id='content--infor'>
                            <strong style={{fontSize:"18px"}}>Thông tin liên hệ </strong>
                        <p>{userLogin.userName}</p>
                        <p>{userLogin.email}</p>
                        <div id='content--action'>
                            <a href="" id='left--action'>Chỉnh sửa</a>
                            <a href="" id='right--action'>Thay đổi mật khẩu</a>

                        </div>

                    </div>

                </div>
                <div id='news--cus'>
                    <div id='content--infor'>
                            <strong style={{fontSize:"18px"}}>Đăng ký nhận tin</strong>
                        <p>Bạn chưa đăng kí nhận tin</p>
                        <div id='content--action'>
                            <a href="" id='left--action'>Chỉnh sửa</a>
                        </div>

                    </div>

                </div>
                <div>

                </div>

            </div>
            <div id='location--customer'>
                <div id='title--cus'>
                    <span style={{marginLeft:"10px"}}>
                        <strong>ĐỊA CHỈ GIAO HÀNG</strong>
                    </span>
                </div>
                <div>
                    <br />
                    <strong>Địa chỉ giao hàng mặc định</strong><br />
                    <br />
                    <a href="">Chỉnh sửa địa chỉ</a>
                </div>
            </div>


        </div>
        <div id='customer__navbar'>
            <div class='yourAccount'
             style={{ textAlign: "center" }}>
                <strong style={{fontSize:"25px"}}>Tài khoản của tôi</strong>
            </div>
            <div class='inforAccount'>
                <ul class='inforAccount__listInfor'>
                    <li class='inforAccount__listInfor--current'>
                        <strong class='current__text'>QUẢN LÝ TÀI KHOẢN</strong>
                    </li>
                    <li class='inforAccount__listInfor--buy'>
                        <Link to={"/cart"} class='buy__text'>Đơn hàng của tôi</Link>
                    </li>
                    <li class='inforAccount__listInfor--delivery'>
                        <Link to={"/customerOrder"} class='delivery__text'>Theo dõi vận chuyển</Link>
                    </li>
                    <li class='inforAccount__listInfor--sale'>
                        <a class='sale__text'>Danh sách ưu đãi</a>
                    </li>
                    
                </ul>

            </div>

        </div>
    </div>
    <Footer></Footer>
    
    </>
  )
}
