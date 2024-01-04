import React, { useEffect, useState } from "react";
import "./Header.scss";
import "./ReponsiveHeader.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsFillCartPlusFill, BsList } from "react-icons/bs";
import logo from "../../../assets/imgs/logo.png";
import hotline from "../../../assets/imgs/giaohangtannoi.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import publicAxios from "../../../config/publicAxios";
export default function Header() {
  const [cart, setCart] = useState([]);
  const [flag, setFlag] = useState(false);
  const [total, setTotal] = useState(0);
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  console.log("11111",userLogin);
  const nav = useNavigate();
  const logOut = () => {
    localStorage.removeItem("userLogin");
    nav("/");
  };
  const handleGetCart = async () => {
    try {
      const response = await publicAxios.get(`/api/v1/cart/${userLogin.id}`);
      setCart(response.data[0]);
      setFlag(true);
    } catch (error) {
      console.log(error);
    }
  };
  
  // const handleTotal = () => {
  //   let result = userLogin.quantity.reduce((a, b) => {
  //     return a + b.times * ;
  //   }, 0);
  //   setTotal(result);
  // };
  // useEffect(() => {
  //   handleTotal();
  // }, [buyProduct]);
  console.log("1111", cart);
  useEffect(() => {
    handleGetCart();
  }, [flag]);

  return (
    <>
      <div id="page-warpper">
        <div id="page-header">
          <label for="show-menu" className="menu-icon">
            <BsList />
          </label>
          <input type="checkbox" id="show-menu" />
          <div id="panel--warpper">
            <div id="panel--header">
              <div id="circle"></div>
              <div id="switcher--language">
                <strong id="switcher--label">
                  <span>Language</span>
                </strong>
                <div id="switcher--option">
                  <div id="switcher--current">
                    <strong id="view--default">
                      <div id="language--VN"></div>
                      <span
                        style={{ fontSize: "15px", fontWeight: "700" }}
                        id="VN-text"
                      >
                        VN
                      </span>
                    </strong>
                  </div>
                  <div id="switcher--list">
                    <strong id="view--EN">
                      <div id="language--EN"></div>
                      <span style={{ fontSize: "15px", fontWeight: "700" }}>
                        EN
                      </span>
                    </strong>
                  </div>
                </div>
              </div>
              <div id="switcher--cart">
                {userLogin?  (
                  <Link to={"/cart"}>
                  <BsFillCartPlusFill
                    style={{ color: "#000" }}
                    id="icon--cart"
                  ></BsFillCartPlusFill>
                </Link>
                  
                ) : 
                <span>
                  <BsFillCartPlusFill
                    style={{ color: "#000" }}
                    id="icon--cart"
                  ></BsFillCartPlusFill>
                </span>
              }
                
                {cart?.quantity ? (
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      border: "0.5px solid white",
                      backgroundColor: "#e31837",
                      marginLeft: "-10px",
                      marginTop: "-10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {cart?.quantity < 10 ? (
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "900",
                          color: "#fff",
                          marginLeft: "5px",
                        }}
                      >
                        {cart?.quantity}
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "900",
                          color: "#fff",
                          marginLeft: "2px",
                        }}
                      >
                        {cart?.quantity}
                      </span>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <ul id="check--log">
                <li id="user--icon">
                  <a href="" id="a--login">
                    <span id="icon--user"></span>
                  </a>
                </li>
                <li id="register">
                  {userLogin?.id ? (
                    <Navbar
                      variant="dark"
                      expand="lg"
                      style={{
                        display: "flex",
                        color: "black",
                        fontSize: "20px",
                        fontWeight: "700",
                        width: "200px",
                        alignItems: "right",
                      }}
                    >
                      <div
                        style={{
                          marginTop: "15px",
                          fontSize: "16px",
                          width: "240px",
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            width: "120px",
                            marginTop: "-14px",
                            textTransform: "uppercase",
                            fontSize: "11px",
                          }}
                        >
                          {userLogin.userName}
                        </p>
                      </div>
                      <Container
                        fluid
                        style={{ height: "20px", backgroundColor: "#ffc522" }}
                      >
                        <Navbar.Toggle aria-controls="navbar-dark-example" />
                        <Navbar.Collapse id="navbar-dark-example">
                          <Nav>
                            <NavDropdown id="nav-dropdown-dark-example">
                              {" "}
                              <NavDropdown.Item
                                href="/customer"
                                style={{
                                  color: "#e31837",
                                  fontWeight: "700",
                                }}
                              >
                                Thông tin
                              </NavDropdown.Item>
                              <NavDropdown.Item
                                style={{ color: "#e31837", fontWeight: "700" }}
                                onClick={logOut}
                              >
                                Đăng xuất
                              </NavDropdown.Item>
                            </NavDropdown>
                          </Nav>
                        </Navbar.Collapse>
                      </Container>
                    </Navbar>
                  ) : (
                    <Link to={"/register"} id="a--register">
                      <span>đăng ký</span>
                    </Link>
                  )}
                </li>
                <span id="notetick">{userLogin?.id ? "" : <span>/</span>}</span>
                <li id="login">
                  <Link to={"/login"} id="a--login">
                    {userLogin?.id ? "" : <span>đăng nhập</span>}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div id="header--content">
            <div id="colum--left">
              <div id="img--logo">
                <Link to={"/"} id="a--logo">
                  <img src={logo} alt="" />
                </Link>
              </div>
            </div>
            <div id="colum--mid">
              <div id="mid--nav">
                <ul id="nav--menu">
                  <li id="home">
                    <Link
                      to="/"
                      id="home--text"
                      style={{
                        fontSize: "20px",
                        backgroundColor: "#ffc522",
                        color: "#000",
                        boxShadow: "0 7px 5px rgba(0, 0, 0, 0.25)",
                        minWidth: "120px",
                        height: "40px",
                        borderRadius: "15px",
                        textAlign: "center",
                        fontWeight: "800",
                      }}
                    >
                      Trang chủ
                    </Link>
                  </li>
                  <li id="about" style={{ cursor: "pointer" }}>
                    <a to="" id="text--about">
                      Về Joyllibee
                    </a>
                  </li>

                  <li id="menu">
                    <Link to={"/listProduct"} id="text--menu">
                      Thực đơn
                    </Link>
                  </li>
                  <li id="sale">
                    <a href="" id="text--sale">
                      Khuyến mãi
                    </a>
                  </li>
                  <li id="service">
                    <a href="" id="text--service">
                      Dịch vụ
                    </a>
                  </li>
                  <li id="news">
                    <a href="" id="text--news">
                      Tin tức
                    </a>
                  </li>
                  <li id="store">
                    <a href="" id="text--store">
                      Cửa hàng
                    </a>
                  </li>
                  <li id="contact">
                    <a href="" id="text--contact">
                      Liên hệ
                    </a>
                  </li>
                  <li id="jobs">
                    <a href="" id="text--jobs">
                      Tuyển dụng
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div id="colum--right">
              <div id="none"></div>
              <div id="hotline">
                <img id="imgA" src={hotline} alt="" />
              </div>
              <div id="pickup">
                <a to={"/listProduct"} id="a--pickup">
                  PICK UP
                </a>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
