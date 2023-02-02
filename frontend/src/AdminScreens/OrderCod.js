import React, { useContext, useEffect, useState } from "react";
import Paginator from "react-hooks-paginator";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../AdminComponents/Navbar";
import OrderContext from "../context/orders/orderContext";
import { Form, FormControl } from "react-bootstrap";

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

const OrderCod = () => {
  // for order context
  const oContext = useContext(OrderContext);
  const { getAllOrders, orders } = oContext;
  const resulf = total(orders, "Successfully");
  const resulf2 = total(orders, "COMPLETED");
  const resulf3 = resulf + resulf2;
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });
  const pageLimit = 5;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/orderAdmin/cod?id=${keyword}`);
    } else {
      navigate(`/orderAdmin/cod`)
    }
  }

  const handlerSearchChange = (e) => {
    setKeyword(e.target.value);
  }

  useEffect(() => {
    setCurrentData(orders.slice(offset, offset + pageLimit));
  }, [offset, orders]);

  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line
  }, []);
  const canceled = orders.map((i) => {
    let arr = [];
    if (i.paymentResult.status === "Canceled") {
      arr.push(i.paymentResult.status);
    }
    return arr;
  });
  const cance = canceled.filter((g) => g[0] === "Canceled");

  return orders ? (
    <>
      <Navbar />
      {/* HEADER */ }
      <header id="main-header" className="py-2 bg-info text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-shopping-cart" /> Đơn hàng
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH */ }
      <section id="search" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ml-auto">
              <Form className="d-flex" onSubmit={ searchHandler }>
                <FormControl
                  type="search"
                  placeholder="Mã đơn hàng"
                  className="me-2"
                  aria-label="Search"
                  minLength={ 3 }
                  size="sm"
                  defaultValue={ keyword } onChange={ handlerSearchChange }
                />
                <button type="submit" className="btn btn-secondary mx-3">
                  Tìm kiếm
                </button>
              </Form>
            </div>
          </div>
        </div>
      </section>
      <div className="boxorders" >

        <div className="card text-center bg-success text-white mb-3">
          <div className="card-body">
            <h5>Doanh thu giao hàng</h5>
            <h4 className="display-4">
              <i className="fas fa-coins" />
            </h4>
            <h2>{ formatter.format(resulf) }</h2>
          </div>
        </div>

        <div className="card text-center bg-danger text-white mb-3">
          <div className="card-body">
            <h5>Doanh thu online</h5>
            <h4 className="display-4">
              <i className="fab fa-cc-paypal" />
            </h4>
            <h2>{ formatter.format(resulf2) }</h2>
            <Link to={ `/orderAdmin/online` } className="btn btn-outline-light btn-sm">
              Chi tiết
            </Link>
          </div>
        </div>

        <div className="card text-center bg-warning text-white mb-3">
          <div className="card-body">
            <h5>Đơn hàng đã hủy</h5>
            <h4 className="display-4">
              <i className="fas fa-window-close" />
            </h4>
            <h2>{ cance.length }</h2>
            <Link to={ `/orderAdmin/canceled` } className="btn btn-outline-light btn-sm">
              Chi tiết
            </Link>
          </div>
        </div>

        <div className="card text-center bg-primary text-white mb-3">
          <div className="card-body">
            <h5>Tổng doanh thu</h5>
            <h4 className="display-4">
              <i className="far fa-money-bill-alt" />
            </h4>
            <h2>{ formatter.format(resulf3) }</h2>
            <Link to={ `/orders` } className="btn btn-outline-light btn-sm">
              Chi tiết
            </Link>
          </div>
        </div>
      </div>

      <section id="users">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Đơn giao hàng mới nhất </h4>
                </div>

                <div className="content table-responsive table-full-width">
                  <table className="table table-hover">
                    <thead>
                      <th>Mã</th>
                      <th>Tên người dùng</th>
                      <th>Ngày đặt hàng</th>
                      <th>Tiền </th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </thead>
                    <tbody>
                      {
                        <>
                          { currentData.filter((value) => {
                            if (keyword === "") {
                              return value;
                            } else if (value._id.toLowerCase().includes(keyword.toLowerCase())) {
                              return value;
                            }
                          }).map((order, index) =>
                            order.paymentResult.status === "Successfully" ? (
                              <tr key={ order._id }>
                                <td className="product-mahang1">
                                  { order._id }
                                </td>
                                <td className="product-tenhang">{ order.user?.name }</td>
                                <td className="product-logo"> { new Date(order.createdAt).toLocaleDateString() }</td>
                                <td>
                                  { formatter.format(order.totalPrice) }
                                </td>
                                <td>
                                  <div className="flex-grow w-full online">
                                    Đã giao hàng
                                  </div>
                                </td>
                                <td>
                                  <Link
                                    to={ `/orderDetailsAdmin/${order._id}` }
                                    className="btn btn-secondary bg-primary text-white"
                                  >
                                    <i className="fas fa-angle-double-right" /> Chi
                                    tiết
                                  </Link>
                                </td>
                              </tr>

                            ) : ("")) }
                          <Paginator
                            totalRecords={ orders.length }
                            pageLimit={ pageLimit }
                            pageNeighbours={ 2 }
                            setOffset={ setOffset }
                            currentPage={ currentPage }
                            setCurrentPage={ setCurrentPage }
                            pageContainerClass="mb-0 mt-0 d-flex"
                            pagePrevText="«"
                            pageNextText="»"
                          />
                        </>
                      }
                      {/* { currentData.paymentResult.status === "Successfully" ? (
                        <>
                          { currentData.filter((value) => {
                            if (keyword === "") {
                              return value;
                            } else if (value._id.toLowerCase().includes(keyword.toLowerCase())) {
                              return value;
                            }
                          }).map((order, index) =>

                            <tr key={ order._id }>
                              <td className="product-mahang1">
                                { order._id }
                              </td>
                              <td className="product-tenhang">{ order.user?.name }</td>
                              <td className="product-logo"> { new Date(order.createdAt).toLocaleDateString() }</td>
                              <td>
                                { formatter.format(order.totalPrice) }
                              </td>
                              <td>
                                <div className="flex-grow w-full online">
                                  Đã giao hàng
                                </div>
                              </td>
                              <td>
                                <Link
                                  to={ `/orderDetailsAdmin/${order._id}` }
                                  className="btn btn-secondary bg-primary text-white"
                                >
                                  <i className="fas fa-angle-double-right" /> Chi
                                  tiết
                                </Link>
                              </td>
                            </tr>
                          ) }
                        </>
                      ) : "" } */}
                    </tbody>
                  </table>
                  {/* <Paginator
                    totalRecords={ orders.length }
                    pageLimit={ pageLimit }
                    pageNeighbours={ 2 }
                    setOffset={ setOffset }
                    currentPage={ currentPage }
                    setCurrentPage={ setCurrentPage }
                    pageContainerClass="mb-0 mt-0 d-flex"
                    pagePrevText="«"
                    pageNextText="»"
                  /> */}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : "Đơn hàng trống"
};

export default OrderCod;
