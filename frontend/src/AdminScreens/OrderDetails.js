import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import OrderContext from "../context/orders/orderContext";
import Navbar from "../AdminComponents/Navbar";
const statusOrder = {
  Confirmed: "Đang xác nhận",
  Processing: "Đang giao hàng",
  Successfully: "Đã giao hàng",
  Canceled: "Đã hủy",
  COMPLETED: "Đã Thanh toán online",
};
const OrderDetails = () => {
  // for order context
  const oContext = useContext(OrderContext);
  const { getOneOrderAdmin } = oContext;

  const { id } = useParams();

  const [order, setOrder] = useState({
    shippingAddress: {},
    paymentResult: {},
    orderItems: [],
    user: {},
  });
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOneOrderAdmin(id);
      setOrder(result);
    };
    fetchOrder();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      {/* HEADER */ }
      <header id="main-header" className="py-2 bg-info text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-users" /> Đơn hàng
              </h1>
            </div>
          </div>
        </div>
      </header>


      <section className="h-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-xl-8">
              <div className="card" style={ { borderRadius: "10px" } }>
                <div className="card-header px-4 py-5">
                  <h5 className="text-muted mb-0">
                    Đơn hàng của,
                    <span style={ { color: "#a8729a" } }>{ order.user?.name }</span>
                    !
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p
                      className="lead fw-normal mb-0"
                      style={ { color: "#a8729a" } }
                    >
                      Biên nhận
                    </p>
                    <p className="small text-muted mb-0">
                      ID : <b>{ id }</b>
                    </p>
                  </div>

                  { order.orderItems.map((orderItem) => (
                    <div
                      key={ orderItem._id }
                      className="card shadow-0 border mb-4"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-2">
                            <Link to={ `/shopSingle/${orderItem.product}` }>
                              <img
                                src={ orderItem.image }
                                className="img-fluid"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0">
                              <b>{ orderItem.name }</b>
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              Số lượng: { orderItem.quantity }
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              Giá: { formatter.format(orderItem.price) }
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">

                              <b>
                                Tiền: { formatter.format(orderItem.itemTotal) }
                              </b>
                            </p>
                          </div>
                        </div>
                        <hr
                          className="mb-4"
                          style={ { backgroundColor: "#e0e0e0", opacity: 1 } }
                        />
                      </div>
                    </div>
                  )) }

                  <div className="row my-3">
                    <div className="col-md-6">
                      <h4>Chi tiết giao hàng</h4>
                      <div>
                        <b>Giao hàng cho: </b> { order.shippingAddress.name }
                        <br />
                        <b>Số điện thoại : </b> { order.shippingAddress.phone }
                        <br />
                        <b>Địa chỉ: </b> { order.shippingAddress.address },
                        { order.shippingAddress.city },
                        { order.shippingAddress.country } <br />
                        <b>Mã :</b> { order.shippingAddress.postalCode }
                      </div>
                    </div>
                    <div className="col-md-6 border-left">
                      <div className="">
                        <h4>Chi tiết đơn</h4>
                        <div>
                          <b>Ngày đặt hàng</b> :
                          { new Date(order.createdAt).toLocaleDateString() }
                        </div>
                        <div>
                          <b>Thanh toán</b> : { order.paymentMethod }
                        </div>
                        <div>
                          <b>Trạng thái</b>:
                          { statusOrder[order.paymentResult.status] }
                        </div>
                        { order.paymentMethod === "paypal" && (
                          <div>
                            <b>Id</b> : { order.paymentResult.id } <br />
                            <b>Thời gian thanh toán</b> :
                            { new Date(
                              order.paymentResult.update_time
                            ).toLocaleString() }
                            <br />
                            <b>Địa chỉ email</b>:
                            { order.paymentResult.email_address }
                          </div>
                        ) }
                        <div className="col-md-6"></div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-footer border-0 px-4 py-5"
                    style={ {
                      backgroundColor: "#a8729a",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    } }
                  >
                    <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                      Tổng tiền :
                      <span className="h2 mb-0 ms-2">
                        {/* {order.totalPrice} */ }
                        { formatter.format(order.totalPrice) }
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetails;
