import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../AdminComponents/Navbar";
import OrderContext from "../context/orders/orderContext";
// import SweetPagination from "sweetpagination";
import { Form, FormControl } from "react-bootstrap";
import Paginator from 'react-hooks-paginator';

import swal from "sweetalert";
const statusOrder = {
  Confirmed: "Đang xác nhận",
  Processing: "Đang giao hàng",
  Successfully: "Đã giao hàng",
  Canceled: "Đã hủy",
  // COMPLETED: "Đã Thanh toán online",
};
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

const Orders = () => {
  // for order context
  const oContext = useContext(OrderContext);
  const { getAllOrders, orders, updateStatustAdmin } = oContext;
  const resulf = total(orders, "Successfully");
  const resulf2 = total(orders, "COMPLETED");
  const resulf3 = resulf + resulf2;

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const statusHtml = (orderStatus) => {
    const index = Object.keys(statusOrder).findIndex(
      (key) => key === orderStatus
    );
    return Object.keys(statusOrder)
      .map(function (key, i) {
        if (i >= index) {
          return `<option
          value="${key}"
          className={"text-gray-200 dark:text-slate-800"}
        >${statusOrder[key]}</option>`;
        }
        return "";
      })
      .join("");
  };

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });

  const pageLimit = 5;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    getAllOrders()
  }, []);

  useEffect(() => {
    setCurrentData(orders.slice(offset, offset + pageLimit));
  }, [offset, orders]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/orders?${keyword}`);
    } else {
      navigate(`/orders`)
    }
  }

  const handlerSearchChange = (e) => {
    setKeyword(e.target.value);
  }

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
      <div className="boxorders">
        <div className="card text-center bg-success text-white mb-3">
          <div className="card-body">
            <h5>Doanh thu giao hàng</h5>
            <h4 className="display-4">
              <i className="fas fa-coins" />
            </h4>
            <h2>{ formatter.format(resulf) }</h2>
            <Link
              to={ `/orderAdmin/cod` }
              className="btn btn-outline-light btn-sm"
            >
              Chi tiết
            </Link>
          </div>
        </div>

        <div className="card text-center bg-danger text-white mb-3">
          <div className="card-body">
            <h5>Doanh thu online</h5>
            <h4 className="display-4">
              <i className="fab fa-cc-paypal" />
            </h4>
            <h2>{ formatter.format(resulf2) }</h2>
            <Link
              to={ `/orderAdmin/online` }
              className="btn btn-outline-light btn-sm"
            >
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
            <Link
              to={ `/orderAdmin/canceled` }
              className="btn btn-outline-light btn-sm"
            >
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
          </div>
        </div>
      </div>
      <section id="users">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Đơn đặt hàng mới nhất </h4>
                </div>

                <div className="content table-responsive table-full-width">
                  <table className="table table-hover">
                    <thead>
                      <th className="product-mahang1">Mã</th>
                      <th className="product-tenhang">Tên người đùng</th>
                      <th className="product-logo">Ngày đặt hàng</th>
                      <th className="product-logo">Tiền</th>
                      <th className="product-logo">Trạng thái</th>
                      <th className="product-logo">Thao tác</th>
                      <th></th>
                    </thead>
                    <tbody>
                      {
                        <>
                          { currentData && currentData.filter((value) => {
                            if (keyword === "") {
                              return value;
                            } else if (value._id.toLowerCase().includes(keyword.toLowerCase())) {
                              return value;
                            }
                          }).map((order, index) => (
                            <tr key={ order._id }>
                              <td className="product-mahang1">{ order._id }</td>
                              <td className="product-tenhang">{ order.user?.name }</td>
                              <td className="product-logo">{ new Date(order.createdAt).toLocaleDateString() }</td>
                              <td>
                                { formatter.format(order.totalPrice) }
                              </td>
                              <td>
                                <div className="flex-grow w-full online">
                                  { order.paymentResult.status === "COMPLETED" ? (
                                    "Đã thanh toán online"
                                  ) : (
                                    <select
                                      onChange={ (e) => {
                                        swal({
                                          title: "Bạn có chắc muốn thay đổi không?",
                                          icon: "warning",
                                          buttons: true,
                                          dangerMode: true,
                                        })
                                          .then((willDelete) => {
                                            if (willDelete) {
                                              swal("Đã cập nhật trạng thái đơn hàng thành công!", {
                                                icon: "success",
                                              });
                                              updateStatustAdmin(e, order._id);
                                              window.location.reload();
                                            } else {
                                              window.location.reload();
                                            }
                                          });
                                      } }
                                      className="block w-full px-2 py-1 text-sm outline-none rounded-md form-select focus:shadow-none leading-5 h-12 bg-[#24262D] dark:bg-[#F4F5F7] border-[1px] border-gray-600 dark:border-gray-300 text-gray-200 dark:text-black"
                                      name="orderStatus"
                                      dangerouslySetInnerHTML={ {
                                        __html: statusHtml(
                                          order.paymentResult.status
                                        ),
                                      } }
                                    ></select>
                                  ) }
                                </div>
                              </td>
                              <td>
                                <Link
                                  to={ `/orderDetailsAdmin/${order._id}` }
                                  className="btn btn-secondary bg-primary text-white"
                                >
                                  <i className="fas fa-angle-double-right" /> Chi tiết
                                </Link>
                              </td>
                            </tr>
                          )) }
                        </>
                      }
                    </tbody>
                  </table>
                </div>
                <Paginator
                  totalRecords={ orders.length }
                  pageLimit={ pageLimit }
                  pageNeighbours={ 2 }
                  setOffset={ setOffset }
                  currentPage={ currentPage }
                  setCurrentPage={ setCurrentPage }
                  pageContainerClass="mb-0 mt-0 d-flex "
                  pagePrevText="«"
                  pageNextText="»"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <br></br>
    </>
  ) : (
    "Đơn hàng trống"
  );
};

export default Orders;
