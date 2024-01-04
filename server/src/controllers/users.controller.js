const { getAllUsers, getUserById, updateStatus } = require("../services/user.service");
const { login } = require("./auth.controller");

async function getUsers(req, res) {
  const users = await getAllUsers();
  res.status(200).json({
    users,
    message: "Bạn là admin",
  });
}
async function updateStatusUser(req,res) {
  console.log(req.params)
  try {
    const {id} = req.params;
    console.log(id)
    const user = await getUserById(id);
    const newStatus = !user.status;
    const updateUser = await updateStatus(id, newStatus);
    const users = await getAllUsers();
    res.status(200).json({
      message: "Cập nhật trạng thái thành công",
      users
    })

  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getUsers,
  updateStatusUser
};
