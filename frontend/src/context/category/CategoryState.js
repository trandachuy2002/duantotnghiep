import React, { useEffect, useState } from 'react'
import CategoryContext from './categoryContext'
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
const CategoryState = props => {
  const [categories, setCategories] = useState([])
  const [categoriesError, setCategoriesError] = useState(null)
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [categoriesMessage, setCategoriesMessage] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setCategoriesError(null)
      setCategoriesMessage(null)
    }, 3000)
  }, [categoriesError, categoriesMessage])

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
      setCategoriesError({
        variant: 'danger',
        message: `${info}, ${err.response.data.error}`,
      })
    } else if (err.request) {
      setCategoriesError({
        variant: 'danger',
        message: `${info},  Không có phản hồi từ máy chủ!`,
      })
    } else {
      setCategoriesError({ variant: 'danger', message: err.message })
    }
    setCategoriesLoading(false)
  }

  // Add new category
  const addCategory = async title => {
    const categoryBody = clean({ title })
    console.log(categoryBody, ' categoryBody')
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setCategoriesLoading(true)
      await axios.post('api/category/add', categoryBody, { headers })
      // setCategories([...categories, categoryBody])
      swal({
        title: "Đã thêm danh mục thành công!",
        icon: "success",
      })
        .then((value) => {
          window.location.reload("/categories")
          // navigate("/products")
          // swal(`The returned value is: ${value}`);
        });
      setCategoriesLoading(false)
      setCategoriesError(null)
    } catch (err) {
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
  const getCategories = async () => {
    try {
      setCategoriesLoading(true)
      const { data } = await axios.get('/api/category/getAll')
      setCategories(data.categories)
      setCategoriesLoading(false)
      setCategoriesError(null)
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload(`/orders`)
          setCategoriesLoading(false)
        });
    }
  }

  // Delete Category
  const deleteCategory = async id => {
    try {
      setCategoriesLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
        'Content-Type': 'multipart/form-data',
      }
      const { data } = await axios.delete(`/api/category/${id}`, { headers })
      setCategoriesLoading(false)
      setCategoriesError(null)
      return data.categories
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload(`/categories`)
          setCategoriesLoading(false)
        });
    }
  }

  // get one category
  const getOneCategory = async id => {
    try {
      const { data } = await axios.get(`/api/category/${id}`)
      return data.categories
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload(`/categories`)
          setCategoriesLoading(false)
        });
    }
  }

  const updateCategory = async (id, title) => {
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setCategoriesLoading(true)
      await axios.patch(`api/category/${id}`, { title }, { headers })
      getCategories()
      swal({
        title: "Danh mục được cập nhật!",
        icon: "success",
      })
        .then((value) => {
          window.location.reload("/categories");
        });
      setCategoriesLoading(false)
      setCategoriesError(null)
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload(`/categories`)
          setCategoriesLoading(false)
        });
    }
  }

  return (
    <CategoryContext.Provider
      value={ {
        categories,
        categoriesError,
        categoriesLoading,
        categoriesMessage,
        getCategories,
        addCategory,
        deleteCategory,
        getOneCategory,
        updateCategory,
      } }>
      { props.children }
    </CategoryContext.Provider>
  )
}

export default CategoryState
