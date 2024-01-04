import React, { useState } from "react";
import logo from "../../assets/imgs/logo.png";
import { notification } from "antd";
import Form from "react-bootstrap/Form";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import publicAxios from "../../config/publicAxios";
import { Link } from "react-router-dom";
export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    try {
      const res = await publicAxios.post("/api/auth/login", user);
      console.log(res.data.user);
      if (res.data.user.status == 0) {
        notification.error({
          message: "Tài khoản đã bị khóa",
        });
      } else {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userLogin", JSON.stringify(res.data.user));
        notification.success({
          message: `${res.data.message}`,
        });

        if (res.data.user.role == 1) {
          window.location.href = "/adminUser";
        } else {
          window.location.href = "/";
        }
      }
    } catch (error) {
      notification.error(error.response.data.message);
    }
  };
  return (
    <>
      <Header></Header>
      <div
        className="w-full"
        style={{ height: "850px", marginTop: "101px", marginBottom: "-70px" }}
      >
        <div className='flex w-full h-full justify-center bg-cover bg-[url("https://th.bing.com/th/id/R.fdfe686ef09db1f70ba77e3c82a1bf2f?rik=iJ2ttSIPVyK8eQ&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f2767038%2fimages%2fo-JOLLIBEE-facebook.jpg&ehk=GF3G2%2f1KMaJ3O5ZZbLRyZZEG9k1NUujl38VarR0Yu18%3d&risl=&pid=ImgRaw&r=0")]'>
          <div
            style={{ height: "550px", marginTop: "40px" }}
            className="mt-36 backdrop-contrast-125 p-10  border-gray-700"
          >
            <div className="text-center">
              <img src={logo} className="w-20 ml-36"></img>
              <br />
              <h1
                style={{
                  color: "#e31837",
                  fontSize: "40px",
                  fontWeight: "800",
                }}
                className="text-4xl font-medium0"
              >
                Đăng Nhập
              </h1>
            </div>
            <div className="mt-5">
              <div class="mb-6">
                {/* <label for="default-input" class="block mb-2 text-xl font-bold text-gray-900 dark:text-white">Email :</label> */}
                <input
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  id="default-input"
                  className="backdrop-contrast-125 w-96 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                {/* <label for="small-input" class="block mb-2 text-xl font-bold text-gray-900 dark:text-white">Mật khẩu :</label> */}
                <input
                  name="password"
                  onChange={handleChange}
                  placeholder="Mật khẩu"
                  type="password"
                  id="small-input"
                  style={{ fontSize: "14px" }}
                  className="block w-96  h-10 p-2 text-gray-900 border border-gray-300 rounded-lg backdrop-contrast-125 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  style={{ color: "#fff", fontWeight: "700" }}
                  type="checkbox"
                  label="Nhớ mật khẩu"
                  id="check"
                />
              </Form.Group>

              <div className="mt-5">
                <button
                  style={{
                    backgroundColor: "#e31837",
                    fontSize: "18px",
                    color: "#fff",
                    fontWeight: "800",
                    boxShadow: "0px 7px 8px 0px rgba(0,0,0,0.37)",
                  }}
                  class="text-white bg-gradient-to-br w-96    focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={handleLogin}
                >
                  Đăng nhập
                </button>
              </div>
              <Link to={"/register"}>
                <button
                  style={{
                    backgroundColor: "#e31837",
                    fontSize: "18px",
                    color: "#fff",
                    fontWeight: "800",
                    boxShadow: "0px 7px 8px 0px rgba(0,0,0,0.37)",
                  }}
                  class="text-white bg-gradient-to-br w-96    focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  //   onClick={handleRegister}
                >
                  Đăng Ký
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
