import React, { useEffect, useState } from 'react'
import BrandContext from './brandContext'
import axios from 'axios'
import swal from 'sweetalert'


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
// Category State
// ------------------------------------------
const BrandState = props => {
  const [brands, setBrands] = useState([])
  const [brandsError, setBrandsError] = useState(null)
  const [brandsLoading, setBrandsLoading] = useState(false)
  const [brandsMessage, setBrandsMessage] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setBrandsError(null)
      setBrandsMessage(null)
    }, 3000)
  }, [brandsError, brandsMessage])

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
      setBrandsError({
        variant: 'danger',
        message: `${info}, ${err.response.data.error}`,
      })
    } else if (err.request) {
      setBrandsError({
        variant: 'danger',
        message: `${info},  Không có phản hồi từ máy chủ!`,
      })
    } else {
      setBrandsError({ variant: 'danger', message: err.message })
    }
    setBrandsLoading(false)
  }

  // Add new category
  const addBrand = async local => {
    const brandBody = clean({ local })
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setBrandsLoading(true)
      await axios.post('/api/brand/add', brandBody, { headers })
      // setBrands([...brands, brandBody])
      swal({
        title: "Đã thêm thương hiệu thành công!",
        icon: "success",
      })
        .then((value) => {
          window.location.reload("/brands")
          // navigate("/products")
          // swal(`The returned value is: ${value}`);
        });
      setBrandsLoading(false)
      setBrandsError(null)
    } catch (err) {
      // errorHandler(err, "Không thể thêm thương hiệu")
      swal({
        title: `${err.response.data.error}, Vui lòng nhập dữ liệu!`,
        icon: "error",
      })
        .then((value) => {
          window.location.reload("/brands")
        });
    }
  }

  // get all categories
  const getBrands = async (limit, skip, keyword) => {
    try {
      setBrandsLoading(true)
      const { data } = await axios.get('/api/brand/getAll', {
        params: { limit, skip, keyword },
      })
      setBrands(data.brands)
      setBrandsLoading(false)
      setBrandsError(null)
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload("/brands")
          setBrandsLoading(false)
        });
    }
  }

  // Delete Category
  const deleteBrand = async id => {
    try {
      setBrandsLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
        'Content-Type': 'multipart/form-data',
      }
      const { data } = await axios.delete(`/api/brand/${id}`, { headers })

      setBrandsLoading(false)
      setBrandsError(null)
      return data.categories
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload("/brands")
          setBrandsLoading(false)
        });
    }
  }

  // get one category
  const getOneBrand = async id => {
    try {
      const { data } = await axios.get(`/api/brand/${id}`)
      return data.categories
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload("/brands")
          setBrandsLoading(false)
        });
    }
  }

  const updateBrand = async (id, local) => {
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setBrandsLoading(true)
      await axios.patch(`api/brand/${id}`, { local }, { headers })
      getBrands()
      swal({
        title: "Thương hiệu đã được cập nhật!",
        icon: "success",
      })
        .then((value) => {
          window.location.reload("/brands")
        });
      setBrandsLoading(false)
      setBrandsError(null)
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload("/brands")
          setBrandsLoading(false)
        });
    }
  }

  return (
    <BrandContext.Provider
      value={ {
        brands,
        brandsError,
        brandsLoading,
        brandsMessage,
        getBrands,
        addBrand,
        deleteBrand,
        getOneBrand,
        updateBrand,
      } }>
      { props.children }
    </BrandContext.Provider>
  )
}

export default BrandState
