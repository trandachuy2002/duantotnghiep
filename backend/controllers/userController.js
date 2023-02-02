// import { errorHandler } from '../middleware/errorMiddleware.js'
const errorHandler = require("../middleware/errorMiddleware.js");

// import User from '../models/User.js'
const User = require('../models/User.js');

// import sendEmail from "../utils/sendEmail";
// import crypto from "crypto";
const crypto = require("crypto");

// import { sendEmail } from '../utils/sendEmail.js';
const sendEmail = require("../utils/sendEmail");

// @desc Register a new user
// @route POST '/api/users/register'
// @access Public
exports.registerUser = async (req, res) => {
  try {
    const user = new User(req.body)
    if (!req.body.name) {
      throw new Error('Bạn chưa nhập tên!')
    }
    if (!req.body.email) {
      throw new Error('Bạn chưa nhập email!')
    }
    if (!req.body.password) {
      throw new Error('Bạn chưa nhập mật khẩu!')
    }
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ success: true, user, token })
  } catch (e) {
    res.status(400).json({ success: false, error: e.message })
  }
}

// @desc Login user
// @route POST '/api/users/login'
// @access Public
exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    if (!user) {
      throw new Error('Email và Mật khẩu không hợp lệ!')
    }
    if (!req.body.email || !req.body.password) {
      throw new Error('Email và Mật khẩu không hợp lệ!')
    }
    const token = await user.generateAuthToken()
    res.status(200).json({ success: true, user, token })
  } catch (e) {
    res.status(400).json({ success: false, error: e.message })
  }
}

// @desc Read user profile
// @route GET '/api/users/profile'
// @access Private: User
exports.readProfile = async (req, res) => {
  // res.json(req.user)
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  })
}

// @desc Update user profile
// @route PATCH '/api/users/profile'
// @access Private : user
exports.updateProfile = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).json({ error: 'Cập nhật không thành công' })
  }
  if (!req.body.name) {
    throw new Error('Bạn chưa nhập tên!')
  }
  updates.forEach(update => (req.user[update] = req.body[update]))
  try {
    await req.user.save()
    res.json({ success: true, message: 'Hồ sơ cá nhân đã cập nhật', user: req.user })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

// @desc Delete user profile
// @route DELETE '/api/users/profile'
// @access Private: user
exports.deleteProfile = async (req, res) => {
  try {
    await req.user.remove()
    res.json({ success: true, message: 'Người dùng đã xóa' })
  } catch (e) {
    res.status(500).json({ success: false, error: e.message })
  }
}

// @desc Get all users
// @route DELETE '/api/users/profile'
// @access Private: Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).sort('-createdAt')
    res.json({ success: true, users })
  } catch (err) {
    res.status(500).json({ success: false, error: e.message })
  }
}


exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email
  });
  if (!user) {
    // throw new Error('Không tìm thấy người dùng!')
    return res.status(404).json({ error: 'Không tìm thấy người dùng' })
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({
    validateBeforeSave: false
  });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/resetPassword/${resetToken}`;
  const message = `Your password reset token is ttemp :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    // if (!user) {
    //   throw new Error('Không tìm thấy người dùng!')
    //   // return res.status(404).json({ error: 'Không tìm thấy người dùng' })
    // }
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({
      validateBeforeSave: false
    });

    // return res.status(500).json({
    //   success: false,
    //   message: "email không tồn tại"
    // })
    // res.status(500).json({ success: false, error: e.message })

    return next(new errorHandler(error.message, 500));
  }
};

exports.resetPassword = async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: 'Reset Password Token is invalid or has been expired' })
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ error: 'Password does not password' })
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  const token = await user.generateAuthToken()
  res.status(200).json({ success: true, user, token })
};

exports.updatePassword = async (req, res, next) => {
  // const user = await User.findById(req.user.id);

  const user = await User.findById(req.user._id).select("+password");
  console.log("user", user);
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    // throw new Error('Old password is incorrect')
    return res.status(400).json({ error: 'Old password is incorrect' })
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    // throw new Error('password does not matc')

    return res.status(400).json({ error: 'password does not match' })
  }

  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({ success: true, message: `Đổi mật khẩu thành công`, user })
};


exports.getOneUserAdmin = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new errorHandler(`User does not exist with ID:${req.params.id}`))
  }
  res.status(200).json({
    success: true,
    user,
  })
};

exports.updateUserRole = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  })

};

exports.deleteOneUserAdmin = async (req, res, next) => {

  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new errorHandler(`User does not exist with Id: ${req.params.id}`))
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: "Xóa thành công"
  })

};