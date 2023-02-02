// import mongoose from 'mongoose'
const mongoose = require('mongoose');

const brandSchema = mongoose.Schema(
  {
    local: {
      type: String,
      required: [true, 'Vui lòng nhập thương hiệu!'],
      minLength: [3, 'Vui lòng nhập phải dài ít nhất 3 ký tự'],
      trim: true,
    }
  },
  { timestamps: true }
)

const Brand = mongoose.model('Brand', brandSchema)
// module.exports = mongoose.model("Brand", brandSchema);
module.exports = Brand
