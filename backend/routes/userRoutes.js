// import { Router } from 'express'
// import {
//   deleteOneUserAdmin,
//   deleteProfile,
//   forgotPassword,
//   getAllUsers,
//   getOneUserAdmin,
//   login,
//   readProfile,
//   registerUser,
//   resetPassword,
//   updatePassword,
//   updateProfile,
//   updateUserRole,
// } from '../controllers/userController.js'
// import auth from '../middleware/auth.js'
// import checkAdmin from '../middleware/checkAdmin.js'

const express = require('express');
const { auth } = require('../middleware/auth.js');
const { checkAdmin } = require('../middleware/checkAdmin.js');
const {
  deleteOneUserAdmin,
  deleteProfile,
  forgotPassword,
  getAllUsers,
  getOneUserAdmin,
  login,
  readProfile,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
} = require('../controllers/userController.js');


const router = express.Router()

// router.post('/register', registerUser)
router.route("/register").post(registerUser);

// router.post('/login', login)
router.route("/login").post(login);

// router.post("/password/forgot", forgotPassword);
router.route("/password/forgot").post(forgotPassword);

// router.put("/password/reset/:token", resetPassword);
router.route("/password/reset/:token").put(resetPassword);

// router.get('/profile', auth, readProfile)
router.route("/profile").get(auth, readProfile);

// router.put("/profile/updatepassword", updatePassword);
router.route("/profile/updatepassword").put(auth, updatePassword);

// router.patch('/profile', auth, updateProfile)
router.route("/profile").patch(auth, updateProfile);

// router.delete('/profile', auth, deleteProfile)
router.route("/profile").delete(auth, deleteProfile);

// router.get('/getAll', getAllUsers)
router.route("/getAll").get(getAllUsers);

// router.get("/admin/user/:id", auth, checkAdmin, getOneUserAdmin);
router.route("/admin/user/:id").get(auth, checkAdmin, getOneUserAdmin);

// router.put("/admin/user/:id", updateUserRole);
router.route("/admin/user/:id").put(updateUserRole);

// router.delete("/admin/user/:id", auth, checkAdmin, deleteOneUserAdmin)
router.route("/admin/user/:id").delete(auth, checkAdmin, deleteOneUserAdmin);

module.exports = router;
