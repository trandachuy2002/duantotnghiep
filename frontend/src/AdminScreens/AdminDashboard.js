import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../AdminComponents/Navbar'
import AddProductModal from '../AdminComponents/AddProductModal'
import AddCategoryModal from '../AdminComponents/AddCategoryModal'
import { Link } from 'react-router-dom'
import productContext from '../context/product/productContext'
import categoryContext from '../context/category/categoryContext'
import userContext from '../context/user/UserContext'
import OrderContext from '../context/orders/orderContext'
import Paginator from 'react-hooks-paginator'
import { multilanguage } from 'redux-multilanguage'

const total = (orders, status) =>
  orders.reduce((r, index) => {
    if (index.paymentResult.status === status) {
      if (index.orderItems.length) {
        const total = index.orderItems.reduce((count, item) => {
          return (count += item.price * item.quantity);
        }, 0);

        return (r += total);
      }
    }
    return r;
  }, 0);
const AdminDashboard = ({ strings }) => {
  // for product context
  const cContext = useContext(categoryContext)
  const pContext = useContext(productContext)
  const uContext = useContext(userContext)
  const oContext = useContext(OrderContext)
  const { getProducts, products } = pContext
  const { getCategories, categories } = cContext
  const { getAllUsers, allUsers } = uContext
  const { getAllOrders, orders } = oContext
  // const resulf = orders.reduce((r, index) => {
  //   if (index.paymentResult.status === "Successfully") {
  //     if (index.orderItems.length) {
  //       const total = index.orderItems.reduce((count, item) => {
  //         return (count += item.price * item.quantity);
  //       }, 0);

  //       return (r += total);
  //     }
  //   }
  //   return r;
  // }, 0);
  const resulf = total(orders, "Successfully");
  const resulf2 = total(orders, "COMPLETED");
  const resulf3 = resulf + resulf2;
  const skip = 0

  const pageLimit = 5;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);


  useEffect(() => {
    setCurrentData(products.slice(offset, offset + pageLimit));
  }, [offset, products]);
  // const [skip, setSkip] = useState(0)
  // const [keyWord, setKeyWord] = useState('')
  // const [category, setCategory] = useState('')
  // const [totalResults, setTotalResults] = useState(0)
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    getProducts(skip, '', '')
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    getCategories(skip, '', '')
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    getAllUsers(skip, '', '')
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getAllOrders(skip, '', '')
    // eslint-disable-next-line
    getProducts(skip, "", "");
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {/* HEADER */ }
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-cog" />
                  { strings["Admin Dashboard"] }
                </h1>
              </div>
            </div>
          </div>
        </header>
        {/* ACTIONS */ }
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row" id='boxx1'>
              <div className="col-md-4">
                <a
                  href="/"
                  className="btn btn-primary btn-block"
                  data-toggle="modal"
                  data-target="#addProductModal">
                  <i className="fas fa-plus" />
                  { strings["Add products"] }
                </a>
              </div>

              <div className="col-md-4">
                <a
                  href="/"
                  className="btn btn-success btn-block"
                  data-toggle="modal"
                  data-target="#addCategoryModal">
                  <i className="fas fa-plus" />{ strings["Add Category"] }

                </a>
              </div>

              <div className="col-md-4">
                <Link to="/users" className="btn btn-warning btn-block">
                  <i className="fas fa-plus" /> { strings["user management"] }
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* POSTS */ }
        <section id="posts">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header">
                    <h4>{ strings["New product"] }</h4>
                  </div>


                  <div className="content table-responsive table-full-width">
                    <table className="table table-hover">
                      <thead>
                        <th className="product-mahang1">{ strings["Id"] }</th>
                        <th className="product-tenhang">{ strings["Product name"] }</th>
                        <th className="product-logo">{ strings["price_product"] }</th>
                        <th className="product-logo">{ strings["Date"] }</th>
                        <th>{ strings["Manipulation"] }</th>
                      </thead>
                      <tbody>
                        {
                          <>
                            { currentData && currentData.map((product, i) => (
                              <tr key={ product._id }>
                                <td className="product-mahang1">
                                  { product._id }
                                </td>
                                <td className="product-tenhang">{ product.name }</td>
                                <td className="product-logo">{ formatter.format(product.price) }</td>
                                <td>
                                  { new Date(product.createdAt).toLocaleDateString() }
                                </td>
                                <td>
                                  <Link to={ `/productDetailsAdmin/${product._id}` } className="btn btn-secondary bg-primary text-white">
                                    <i className="fas fa-angle-double-right" />{ " " }
                                    { strings["Detail"] }
                                  </Link>
                                </td>
                              </tr>
                            )) }
                          </>
                        }
                      </tbody>
                    </table>
                    <div className="text-center my-3">
                      <Paginator
                        totalRecords={ products.length }
                        pageLimit={ pageLimit }
                        pageNeighbours={ 2 }
                        setOffset={ setOffset }
                        currentPage={ currentPage }
                        setCurrentPage={ setCurrentPage }
                        pageContainerClass="mb-0 mt-0 d-flex justify-content-center align-items-center"
                        pagePrevText="«"
                        pageNextText="»"
                      />
                    </div>
                  </div>
                </div>
                <br></br>
              </div>


              <div className="col-md-3">
                <div className="card text-center bg-primary text-white mb-3">
                  <div className="card-body">
                    <h3>{ strings["Product"] }</h3>
                    <h4>
                      <i className="fas fa-pencil-alt" /> { products.length }
                    </h4>
                    <Link
                      to="/products"
                      className="btn btn-outline-light btn-sm">
                      { strings["to watch"] }
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-success text-white mb-3">
                  <div className="card-body">
                    <h3>   { strings["Category"] }</h3>
                    <h4>
                      <i className="fas fa-folder" /> { categories.length }
                    </h4>
                    <Link
                      to="/categories"
                      className="btn btn-outline-light btn-sm">
                      { strings["to watch"] }
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-warning text-white mb-3">
                  <div className="card-body">
                    <h3> { strings["Account"] }</h3>
                    <h4 >
                      <i className="fas fa-users" /> { allUsers.length }
                    </h4>
                    <Link to="/users" className="btn btn-outline-light btn-sm">
                      { strings["to watch"] }
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-info text-white mb-3">
                  <div className="card-body">
                    <h3>     { strings["Revenue"] }</h3>
                    <h4>
                      <i className="fas fa-dollar-sign"></i> { formatter.format(resulf3) }
                    </h4>
                    <Link to="/orders" className="btn btn-outline-light btn-sm">
                      { strings["to watch"] }
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br></br>
      </div>

      {/* <Footer /> */ }

      <div>
        <AddProductModal />

        <AddCategoryModal />
      </div>
    </div>
  );
};

export default multilanguage(AdminDashboard);