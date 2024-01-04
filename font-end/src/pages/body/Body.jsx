import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import banner from "../../assets/imgs/Banner.jpg";
import logo from "../../assets/imgs/logo.png";
import garan from "../../assets/imgs/ga_gion_vui_ve.png";
import gagionvuive from "../../assets/imgs/gagionvuive.png";
import gasotcay from "../../assets/imgs/ga_sot_cay.png";
import gasotcayy from "../../assets/imgs/gasotcay.png";
import myysotbobamm from "../../assets/imgs/myysotbobam.png";
import myysotbobam from "../../assets/imgs/my_y_sot_bo_bam.png";
import montrangmieng from "../../assets/imgs/mon_trang_mieng.png";
import montrangmiengg from "../../assets/imgs/montrangmieng.png";
import phone from "../../assets/imgs/phone.png";
import donhanglon from "../../assets/imgs/donhanglon.png";
import tiecsinhnhat from "../../assets/imgs/tiecsinhnhat.png";
import club from "../../assets/imgs/club.png";
import thumbnail1 from "../../assets/imgs/THUMBNAIL-04-06.jpg";
import thumbnail_2 from "../../assets/imgs/bieudo.png";
import JED_Man from "../../assets/imgs/JED_Man.jpg";
import nh_m_y from "../../assets/imgs/nh_m_y.jpg";
import "./Body.scss";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { Link } from "react-router-dom";
export default function Body() {
  





  return (
    <>
      <Header></Header>

      <div id="main">
        <div id="banner">
          <img src={banner} alt="" />
        </div>
        <div id="menu__main">
          <div id="menu--logo">
            <div id="intro">
              <div id="intro--logo">
                <img src={logo} alt="" />
              </div>
              <p id="intro--text">
                ĂN GÌ <br />
                HÔM NAY
              </p>
              <p id="intro--texts">
                Thực đơn Jollibee đa dạng và phong phú, có rất nhiều sự lựa chọn
                cho bạn, gia đình và bạn bè.
              </p>
            </div>
          </div>
          <div id="menu--food">
            <div id="quad--menu">
              <a href="" id="quad">
                <div id="top--image">
                  <img src={garan} alt="" />
                </div>
                <div id="bot-image">
                  <img src={gagionvuive} alt="" />
                  <Link to={"/listProduct"}>
                    <button>Đặt hàng</button>
                  </Link>
                </div>
              </a>
              <a href="" id="quad">
                <div id="top--image">
                  <img src={gasotcay} alt="" />
                </div>
                <div id="bot-image">
                  <img src={gasotcayy} alt="" />
                  <Link to={"/listProduct"}>
                    <button>Đặt hàng</button>
                  </Link>
                </div>
              </a>
              <a href="" id="quad">
                <div id="top--image">
                  <img src={myysotbobam} alt="" />
                </div>
                <div id="bot-image">
                  <img src={myysotbobamm} alt="" />
                  <Link to={"/listProduct"}>
                    <button>Đặt hàng</button>
                  </Link>
                </div>
              </a>
              <a href="" id="quad">
                <div id="top--image">
                  <img src={montrangmieng} alt="" />
                </div>
                <div id="bot-image">
                  <img src={montrangmiengg} alt="" />
                  <Link to={"/listProduct"}>
                    <button>Đặt hàng</button>
                  </Link>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* service */}
        <div id="main--service">
          <div id="title--wrapper">
            <p className="title--service">DỊCH VỤ</p>
            <p className="title-text">
              TẬN HƯỞNG NHỮNG KHOẢNH KHẮC TRỌN VẸN CÙNG JOLLIBEE
            </p>
          </div>
          <div id="service-wrapper">
            <div id="service--points">
              <div id="media--max">
                <img src={phone} alt="" />
              </div>
            </div>
            <div id="service--points">
              <div id="media--max">
                <img src={tiecsinhnhat} alt="" />
              </div>
            </div>
            <div id="service--points">
              <div id="media--max">
                <img src={club} alt="" />
              </div>
            </div>
            <div id="service--points">
              <div id="media--max">
                <img src={donhanglon} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div id="banner--welcome">
          <div id="content-banner">
            <h3>JOLLIBEE, XIN CHÀO</h3>
            <br />
            <p>
              Chúng tôi là Jollibee Việt Nam với hơn 100 cửa hàng trên khắp cả
              nước, chúng tôi mong muốn đem đến niềm vui ẩm thực cho mọi gia
              đình Việt bằng những món ăn có chất lượng tốt, hương vị tuyệt hảo,
              dịch vụ chu đáo với một mức giá hợp lý… Hãy đến và thưởng thức
              nhé!
            </p>
            <br />
            <a href="">
              <Button className="btn--buy" variant="danger">MUA HÀNG</Button>{" "}
            </a>
          </div>
        </div>
        <div id="location--store">
          <div id="store--title">
            <h3>TÌM CỬA HÀNG</h3>
          </div>
          <div id="location--filter">
            <div id="form--location" style={{ width: "40%" }}>
              <Form.Select aria-label="Default select example">
                <option>Tìm kiếm khu vực</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
            <div id="form--location" style={{ width: "40%" }}>
              <Form.Select aria-label="Default select example">
                <option>Tìm kiếm khu vực</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
            <a href="">
              <Button variant="danger" className="btn--search">TÌM KIẾM</Button>{" "}
            </a>
          </div>
        </div>
        <div id="news">
          <h3>TIN TỨC</h3>
          <div id="news--cards">
            <div id="cards--one">
              <Card style={{ width: "18rem" }}>
                <div style={{ width: "100%", height: "188px" }}>
                  <Card.Img variant="top" src={thumbnail1} />
                </div>
                <Card.Body>
                  <Card.Title>
                    JOLLIBEE VIỆT NAM KHAI TRƯƠNG CỬA HÀNG THỨ 150
                  </Card.Title>
                  <Card.Text>
                    Jollibee Việt Nam đã đưa vào vận hành nhà máy mới với chứng
                    nhận ISO.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div id="cards--one">
              <Card style={{ width: "18rem" }}>
                <div style={{ width: "100%", height: "188px" }}>
                  <Card.Img variant="top" src={thumbnail_2} />
                </div>
                <Card.Body>
                  <Card.Title>
                    JOLLIBEE VIỆT NAM TIẾP TỤC ĐÀ TĂNG TRƯỞNG SAU GIÃN CÁCH
                  </Card.Title>
                  <Card.Text>
                    Jollibee Việt Nam đã đưa vào vận hành nhà máy mới với chứng
                    nhận ISO.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div id="cards--one">
              <Card style={{ width: "18rem" }}>
                <div style={{ width: "100%", height: "188px" }}>
                  <Card.Img variant="top" src={JED_Man} />
                </div>
                <Card.Body>
                  <Card.Title>
                    THƯƠNG HIỆU FAST FOOD ĐƯỢC YÊU THÍCH NHẤT VIỆT NAM
                  </Card.Title>
                  <Card.Text>
                    Jollibee Việt Nam đã đưa vào vận hành nhà máy mới với chứng
                    nhận ISO.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div id="cards--one">
              <Card style={{ width: "18rem" }}>
                <div style={{ width: "100%", height: "188px" }}>
                  <Card.Img variant="top" src={nh_m_y} />
                </div>
                <Card.Body>
                  <Card.Title>
                    NHÀ MÁY MỚI JOLLIBEE VIỆT NAM NHẬN ĐƯỢC ISO 22000:2018
                  </Card.Title>
                  <Card.Text>
                    Jollibee Việt Nam đã đưa vào vận hành nhà máy mới với chứng
                    nhận ISO.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          <br />
          <br />
          <Button variant="danger" className="btn--see">XEM THÊM</Button>{" "}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
