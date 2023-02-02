import React, { useEffect, useState } from "react";
import OrderContext from "./orderContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import swal from "sweetalert";

// Function for cleaning null, undefined and empty strings values in objects
function clean(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
}

// ------------------------------------------
// Orders State
// ------------------------------------------
const OdersState = (props) => {
  const navigate = useNavigate();

  const { emptyCart } = useCart();

  const [orders, setOrders] = useState([]);
  const [ordersError, setOrdersError] = useState(null);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersMessage, setOrdersMessage] = useState(null);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setOrdersError(null);
      setOrdersMessage(null);
    }, 3000);
  }, [ordersError, ordersMessage]);

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
      setOrdersError({
        variant: "danger",
        message: `${info}, ${err.response.data.error}`,
      });
    } else if (err.request) {
      setOrdersError({
        variant: "danger",
        message: `${info},  Không có phản hồi từ máy chủ!`,
      });
    } else {
      setOrdersError({ variant: "danger", message: err.message });
    }
    setOrdersLoading(false);
  };

  // -----------------------------------------
  // Place new order
  //   ---------------------------------------
  const placeOrder = async (
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentResult,
    addToast
  ) => {
    const orderBody = clean({
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentResult,
    });
    try {
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      };
      setOrdersLoading(true);
      await axios.post("api/orders/new", orderBody, { headers });
      // localStorage.removeItem('react-use-cart')

      emptyCart();
      navigate("/thankYou");
      // setProducts([...products, productBody])


      setOrdersLoading(false);
      setOrdersError(null);
    } catch (err) {
      if (addToast) {
        addToast(`${err.response.data.error}`, { appearance: "error", autoDismiss: true });
      }
      setOrdersLoading(false);

    }
  };

  // -----------------------------------------
  //  Get all orders
  //   ---------------------------------------
  const getAllOrders = async (limit, skip, keyword) => {
    try {
      setOrdersLoading(true);
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      };
      const { data } = await axios.get("/api/orders/getAll", {
        params: { limit, skip, keyword },
        headers
      });
      setOrders(data.orders);
      setOrdersLoading(false);
      setOrdersError(null);
      return data;
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload()
          setOrdersLoading(false)
        });
    }
  };

  // -----------------------------------------
  //  Get my orders
  //   ---------------------------------------
  const getMyOrders = async () => {
    try {
      setOrdersLoading(true);
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      };
      const { data } = await axios.get("/api/orders/myOrders", { headers });
      setMyOrders(data.myOrders);
      setOrdersLoading(false);
      setOrdersError(null);
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload()
          setOrdersLoading(false)
        });
    }
  };

  // -----------------------------------------
  //  Get One order
  //   ---------------------------------------
  const getOneOrder = async (id) => {
    try {
      setOrdersLoading(true);
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      };
      const { data } = await axios.get(`/api/orders/myOrders/${id}`, {
        headers,
      });
      setOrdersLoading(false);
      setOrdersError(null);
      return data.order;
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload(`/myOrderDetails/${id}`)
          setOrdersLoading(false)
        });
    }
  };

  // -----------------------------------------
  //  Get One order admin
  //   ---------------------------------------
  const getOneOrderAdmin = async (id) => {
    try {
      setOrdersLoading(true);
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      };
      const { data } = await axios.get(`/api/orders/${id}`, {
        headers,
      });
      setOrdersLoading(false);
      setOrdersError(null);
      return data.order;
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload(`/orderDetailsAdmin/${id}`)
          setOrdersLoading(false)
        });
    }
  };

  const updateStatustAdmin = async (e, id) => {
    const selectHend = e.target.value;
    const select = e.target
      .closest("td")
      .querySelectorAll('[name="orderStatus"] option');
    const indexSatus = [...select].findIndex((val) => val.value === selectHend);
    for (let index = 0; index < select.length; index++) {
      if (index < indexSatus) select[index].remove();
    }
    try {
      setOrdersLoading(true);
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(`/api/orders/admin/order/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ id, status: selectHend }),
      });

      setOrdersLoading(false);
      setOrdersError(null);
      return res.json();
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload(`/orders`)
          setOrdersLoading(false)
        });
    }
  };

  return (
    <OrderContext.Provider
      value={ {
        placeOrder,
        orders,
        ordersError,
        ordersLoading,
        ordersMessage,
        myOrders,
        getAllOrders,
        getMyOrders,
        getOneOrder,
        getOneOrderAdmin,
        updateStatustAdmin,
      } }
    >
      { props.children }
    </OrderContext.Provider>
  );
};

export default OdersState;
