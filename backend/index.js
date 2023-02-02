const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const connectDB = require('./config/db.js');
const cors = require('cors');
// import express from 'express'
// import dotenv from 'dotenv'
// import connectDB from './config/db.js'
// import cors from "cors";
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
// const errorHandler = require('./middleware/errorMiddleware.js');

// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const productRoutes = require('./routes/productRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const brandRoutes = require('./routes/brandRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');

// import productRoutes from './routes/productRoutes.js'
// import categoryRoutes from './routes/categoryRoutes.js'
// import brandRoutes from './routes/brandRoutes.js'
// import userRoutes from './routes/userRoutes.js'
// import orderRoutes from './routes/orderRoutes.js'
// import uploadRoutes from './routes/multer.js'

dotenv.config({ path: "backend/config/.env" });
connectDB();

app.use(express.json())
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/products', productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/brand', brandRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
// app.use('/api/upload', uploadRoutes)

// app.get('/', (req, res) => {
//   res.send('This is the home page')
// })

var __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
})
module.exports = app
