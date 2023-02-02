// import mongoose from 'mongoose'
// import validator from 'validator'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import crypto from "crypto";
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Xin hãy nhập tên của bạn'],
      // minLength: [3, 'Xin hãy nhập tên của bạn'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Vui lòng nhập email của bạn'],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Vui lòng nhập email hợp lệ')
        }
      },
    },
    password: {
      type: String,
      required: [true],
      minLength: [6, 'Mật khẩu phải có độ dài ít nhất 6 ký tự!'],
      trim: true,
      select: true,
      validate(pass) {
        if (pass.toLowerCase().includes('password')) {
          throw new Error(
            'Mật khẩu không được bao gồm từ mật khẩu!'
          )
        }
      },
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
)

// Defining function for hiding private data of users
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.__v

  return userObject
}

// generating authentication token and saving to the database
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
  await user.save()
  return token
}

// Logging in user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!email && !password) {
    throw new Error('Email hoặc Mật khẩu không hợp lệ!')
  }
  if (!email) {
    throw new Error('Email không hợp lệ!')
  }
  if (!password) {
    throw new Error('Mật khẩu không hợp lệ!')
  }
  if (!user) {
    throw new Error('Email không hợp lệ!')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Mật khẩu không hợp lệ!')
  }
  return user
}

// hashing password before saving the user
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }
  next()
})

// Middleware function for unique email error
userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email đã tồn tại!'))
  } else {
    next()
  }

})

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


userSchema.methods.getResetPasswordToken = function () {

  // Generaying Token -- Tạo mã thông báo
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
}

// deleting the user notes when the user profile deletion
// userSchema.pre('remove', async function (next) {
//   await Note.deleteMany({ user: this._id })
//   next()
// })

// creating mongoose model for User collection
const User = mongoose.model('User', userSchema)
module.exports = User

