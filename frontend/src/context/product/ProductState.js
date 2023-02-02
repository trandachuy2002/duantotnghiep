import React, { useEffect, useState } from 'react'
import ProductContext from './productContext'
import axios from 'axios'
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
// Function for cleaning null, undefined and empty strings values in objects
function clean(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName]
    }
  }
  return obj
}

// ------------------------------------------
// Product State
// ------------------------------------------
const ProductState = props => {
  const [products, setProducts] = useState([])
  const [productsError, setProductsError] = useState(null)
  const [productsLoading, setProductsLoading] = useState(false)
  const [productsMessage, setProductsMessage] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setProductsError(null)
      setProductsMessage(null)
    }, 3000)
  }, [productsError, productsMessage])

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
      setProductsError({
        variant: 'danger',
        message: `${info}, ${err.response.data.error}`,
      })
    } else if (err.request) {
      setProductsError({
        variant: 'danger',
        message: `${info},  Không có phản hồi từ máy chủ!`,
      })
    } else {
      setProductsError({ variant: 'danger', message: err.message })
    }
    setProductsLoading(false)
  }

  // get all Products
  const getProducts = async (limit, skip, keyword, category, brand) => {
    try {
      setProductsLoading(true)
      const { data } = await axios.get(`/api/products/getAll`, {
        params: { limit, skip, keyword, category, brand },
      })
      setProducts(data.products)
      setProductsLoading(false)
      setProductsError(null)
      return data.totalResults
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload()
          setProductsLoading(false)
        });
    }
  }

  // Add new product
  const addProduct = async fromData => {
    const productBody = clean(fromData)
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
        'Content-Type': 'multipart/form-data',
      }
      setProductsLoading(true)
      await axios.post('api/products/add', productBody, { headers })

      swal({
        title: "Đã thêm sản phẩm thành công!",
        icon: "success",
      })
        .then((value) => {
          window.location.reload("/products")
        });
      setProductsLoading(false)
      setProductsError(null)
    } catch (err) {
      swal({
        title: `Không thể thêm sản phẩm vui lòng nhập đầy đủ thông tin`,
        icon: "error",
      })
        .then((value) => {
          setProductsLoading(false)
        });
    }
  }

  // Delete prdouct 
  const deleteProduct = async id => {
    try {
      setProductsLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
        'Content-Type': 'multipart/form-data',
      }
      const { data } = await axios.delete(`/api/products/${id}`, { headers })
      setProductsLoading(false)
      setProductsError(null)
      return data.product
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
      })
        .then((value) => {
          if (value) {
            navigate("/products")
          } else {
            navigate("/products")
          }
        });
    }
  }

  // get one product
  const getOneProduct = async id => {
    try {
      setProductsLoading(true)
      const { data } = await axios.get(`/api/products/${id}`)
      setProductsLoading(false)
      setProductsError(null)
      return data.product
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          navigate("/products")
          setProductsLoading(false)
        });
    }
  }

  // Update prdouct details
  const updateProductDetails = async (
    id,
    name,
    sku,
    category,
    brand,
    price,
    description,
    Stock
  ) => {
    try {
      setProductsLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      const productBody = clean({
        name,
        sku,
        category,
        brand,
        price,
        description,
        Stock,
      })
      await axios.patch(`/api/products/${id}`, productBody, { headers })
      swal({
        title: "Bạn có chắc muốn thay đổi không?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            swal("Cập nhật sản phẩm thành công!", {
              icon: "success",
            });
            setTimeout(() => {
              navigate("/products")
            }, 3000)

          } else {
            setProductsLoading(false)
            navigate(`/productDetailsAdmin/${id}`)
          }
        });
      setProductsError(null)
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
      })
        .then((value) => {
          navigate("/products")
        });
    }
  }

  // Update prdouct Image
  const updateProductImage = async (id, formData) => {
    try {
      setProductsLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
        'Content-Type': 'multipart/form-data',
      }
      const { data } = await axios.patch(
        `api/products/${id}/updateImage`,
        formData,
        { headers }
      )
      swal({
        title: `Hình ảnh sản phẩm được cập nhật!`,
        icon: "success",
        button: "Ok",
      });
      setProductsLoading(false)
      setProductsError(null)
      return data.image
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
      })
        .then((value) => {
          navigate(`/productDetailsAdmin/${id}`)
        });
    }
  };

  const newReview = async (payload) => {
    try {
      setProductsLoading(true)

      const { data } = await axios.put("/api/products/review",
        {
          comment: payload.comment,
          rating: payload.rating,
          productId: payload.productId,
          user: payload.user,
          name: payload.name
        });

      setProductsLoading(false)
      setProductsError(null)
      return data

    } catch (error) {
      swal({
        title: `${error.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload()
          setProductsLoading(false)
        });
    }
  };


  const getAllReviews = async (id) => {
    try {
      setProductsLoading(true)
      const { data } = await axios.get(`/api/products/reviews/${id}`);

      setProductsLoading(false)
      setProductsError(null)
      return data
    } catch (error) {
      swal({
        title: `${error.response.data.error}`,
        icon: "error",
      })
        .then((value) => {
          navigate(`/reviews`)
        });
    }
  };

  return (
    <ProductContext.Provider
      value={ {
        products,
        productsError,
        productsLoading,
        productsMessage,
        addProduct,
        getProducts,
        getOneProduct,
        updateProductDetails,
        updateProductImage,
        deleteProduct,
        errorHandler,
        newReview,
        getAllReviews
      } }>
      { props.children }
    </ProductContext.Provider>
  )
}

export default ProductState
