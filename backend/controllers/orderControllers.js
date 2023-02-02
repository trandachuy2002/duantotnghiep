const Order = require('../models/Order.js');
const Product = require('../models/Product.js');

// @desc Place new order
// @route POST '/api/orders/new'
// @access Private : User/Admin
exports.placeOrder = async (req, res) => {
  try {
    const order = new Order({ ...req.body, user: req.user._id })
    if (!req.body.paymentMethod) {
      throw new Error('Bạn chưa chọn phương thức thanh toán')
    }
    if (order.paymentResult.status === "COMPLETED") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }

    await order.save()
    res.status(201).json({ success: true, message: 'Đã đặt hàng', order })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc Get all orders
// @route GET '/api/orders/all'
// @access Private : Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort("-createdAt")
      .populate("user", "name email");
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getAllHot = async (req, res) => {
  try {
    const orders = await Order.find()

    res.status(200).json({ success: true, orders: orders.orderItems });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc Get my orders
// @route GET '/api/orders/myOrders'
// @access Private : User
exports.getMyOrders = async (req, res) => {
  try {
    const myOrders = await Order.find({ user: req.user._id })
      .sort("-createdAt")
      .populate("user", "name email");
    res.status(200).json({ success: true, myOrders });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc Get One order by id
// @route GET '/api/orders/myOrders/:id'
// @access Private : User
exports.getOneOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("user", "name email");
    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: 'Không thể tìm thấy đơn đặt hàng!' })
    }
    res.json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc Get One order by id admin
// @route GET '/api/orders/:id'
// @access Private : Admin
exports.getOneOrderAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: 'Không thể tìm thấy đơn đặt hàng!' })
    }
    res.json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res
      .status(404)
      .json({ success: false, error: "Đơn hàng không tìm thấy Id" });
  }

  if (order.paymentResult.status === "Successfully") {
    return res.status(400).json({
      success: false,
      error: "Bạn đã thực hiện thành công đơn hàng này",
    });
  }

  if (req.body.status === "Processing") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  // if (req.body.status === "Successfully") {
  //   order.orderItems.forEach(async (o) => {
  //     await updateStockSuccess(o.product, o.quantity);
  //   });
  // }
  if (req.body.status === "Canceled") {
    order.orderItems.forEach(async (o) => {
      await updateStockCanceled(o.product, o.quantity);
    });
  }

  order.paymentResult.status = req.body.status;

  if (req.body.status === "Successfully") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    status: order.paymentResult.status,
  });
};
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.Stock -= quantity;

  // if (product.Stock = quantity) {
  //   return product.Stock;
  // } else {
  // }
  await product.save({ validateBeforeSave: false });

}

async function updateStockCanceled(id, quantity) {
  const product = await Product.findById(id);

  product.Stock += quantity;

  await product.save({ validateBeforeSave: false });
}