const { addUser, checkUserByEmail } = require("../services/user.service");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
async function register(req, res) {
  try {
    const { userName, email, password } = req.body;

    const hashedPassword = await argon.hash(password);
    const newId = await addUser(userName, hashedPassword, email);
    if (!newId) {
      return res.status(500).json({
        message: "Server lỗi",
      });
    }
    res.status(201).json({
      message: "Đăng ký thành công",
    });
  } catch (error) {
    console.log(error);
  }
}
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const findUser = await checkUserByEmail(email);
    if (!findUser) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }
    const checkPassowrd = await argon.verify(findUser.password, password);
    if (!checkPassowrd) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }
    const token = jwt.sign(
      { id: findUser.id, role: findUser.role },
      "MABIMATJWT"
    );
    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: findUser,
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  register,
  login,
};
