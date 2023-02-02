// import express from "express";
// import {
//   getAllOrders,
//   getMyOrders,
//   getOneOrder,
//   getAllHot,
//   getOneOrderAdmin,
//   placeOrder,
//   updateOrder,
// } from "../controllers/orderControllers.js";
// import auth from "../middleware/auth.js";
// import checkAdmin from "../middleware/checkAdmin.js";

const express = require('express');
const { auth } = require('../middleware/auth.js');
const { checkAdmin } = require('../middleware/checkAdmin.js');

const {
  getAllOrders,
  getMyOrders,
  getOneOrder,
  getAllHot,
  getOneOrderAdmin,
  placeOrder,
  updateOrder,
} = require('../controllers/orderControllers.js');



const router = express.Router();

// router.post("/new", auth, placeOrder);
router.route("/new").post(auth, placeOrder);

// router.get("/getAll", getAllOrders);
router.route("/getAll").get(getAllOrders);

// router.get("/getHot", getAllHot);
router.route("/getHot").get(getAllHot);

// router.get("/myOrders", auth, getMyOrders);
router.route("/myOrders").get(auth, getMyOrders);

// router.get("/myOrders/:id", auth, getOneOrder);
router.route("/myOrders/:id").get(auth, getOneOrder);

// router.get("/:id", getOneOrderAdmin);
router.route("/:id").get(getOneOrderAdmin);

// router.put("/admin/order/:id", updateOrder);
router.route("/admin/order/:id").put(updateOrder);

// router.put("/admin/order/:id", updateOrder);
router.route("/admin/order/:id").put(updateOrder);

module.exports = router;
