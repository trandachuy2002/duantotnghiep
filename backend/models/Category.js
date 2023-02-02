// import mongoose from 'mongoose'
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Vui lòng nhập danh mục'],
      minLength: [3, 'Danh mục phải dài ít nhất 3 ký tự'],
      trim: true,
    }
  },
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)
module.exports = Category