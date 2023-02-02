import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CategoryContext from '../context/category/categoryContext'
import BrandContext from '../context/brand/brandContext'
import productContext from '../context/product/productContext'
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Navbar from "../AdminComponents/Navbar";
import { multilanguage } from 'redux-multilanguage'

const ProductDetails = ({ strings }) => {
  const navigate = useNavigate();

  // for product context
  const pContext = useContext(productContext)
  const { getOneProduct, updateProductDetails, updateProductImage, deleteProduct } = pContext
  // for category context
  const cContext = useContext(CategoryContext)
  const { categories, getCategories } = cContext

  const bContext = useContext(BrandContext)
  const { brands, getBrands } = bContext

  const { id } = useParams()
  const [imageFile, setImageFile] = useState('')

  const [product, setProduct] = useState({
    name: '',
    sku: '',
    category: '',
    brand: '',
    price: '',
    description: '',
    Stock: '',
  })
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getOneProduct(id)
      setProduct(fetchedProduct)
      setImage(fetchedProduct.image)
    }
    fetchProduct()
    getCategories()
    getBrands()
    // eslint-disable-next-line
  }, [])

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleSaveChanges = () => {
    const { name, sku, category, brand, price, description, Stock } = product
    updateProductDetails(id, name, sku, category, brand, price, description, Stock)
  }
  const deleteSaveChanges = (id) => {
    swal({
      title: "Bạn có chắc muốn xóa không?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal({
            title: "Đã xóa sản phẩm thành công!",
            icon: "success",
            buttons: true,
          });
          deleteProduct(id)

          // setTimeout(() => {
          navigate("/products")


          // }, 3000)
        } else {
          navigate(`/productDetailsAdmin/${id}`)
        }
      });
  }

  const handleUpdateImage = async () => {
    const formData = new FormData()
    formData.append('image', imageFile)

    const imagePath = await updateProductImage(id, formData)

    setImage(imagePath)

    setImageFile(null)
  }


  return (
    <>
      <Navbar />
      {/* HEADER */ }
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-users" />    { strings["Product"] }
              </h1>
            </div>
          </div>
        </div>
      </header>



      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row" id='boxx1'>
            <div className="col-md-4">
              <Link
                to="/adminDashboard"
                className="btn btn-secondary btn-block">
                <i className="fas fa-arrow-left" />  { strings["come_back"] }
              </Link>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-success btn-block"
                onClick={ handleSaveChanges }>
                <i className="fas fa-check" /> { strings["save"] }
              </button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-danger btn-block"
                onClick={ () => deleteSaveChanges(id) }>
                <i className="fas fa-trash" />{ strings["delete_product"] }
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* DETAILS */ }
      <section id="details">
        <div className="container">
          <div className="row" id='boxx1'>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h4>{ strings["edit_product"] }</h4>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="name">{ strings["Product name"] }</label>
                    <input
                      type="text"
                      name="name"
                      onChange={ handleChange }
                      value={ product.name }
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sku">{ strings["Product_code"] }</label>
                    <input
                      type="text"
                      name="sku"
                      onChange={ handleChange }
                      value={ product.sku }
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">{ strings["Category"] }</label>
                    <select
                      className="form-control"
                      name="category"
                      onChange={ handleChange }>
                      <option value={ product.category?._id }>
                        { product.category?.title }
                      </option>
                      { categories.map(item => (
                        <option key={ item._id } value={ item._id }>
                          { item.title }
                        </option>
                      )) }
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="brand">{ strings["Brand"] }</label>
                    <select
                      className="form-control"
                      name="brand"
                      onChange={ handleChange }>
                      <option value={ product.brand?._id }>
                        { product.brand?.local }
                      </option>
                      { brands.map(item => (
                        <option key={ item._id } value={ item._id }>
                          { item.local }
                        </option>
                      )) }
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">{ strings["price_product"] }</label>
                    <input
                      type="text"
                      name="price"
                      onChange={ handleChange }
                      value={ product.price }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Stock">{ strings["Stock"] }</label>
                    <input
                      type="text"
                      name="Stock"
                      onChange={ handleChange }
                      value={ product.Stock }
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="body">{ strings["Product_Description"] }</label>
                    <textarea
                      className="form-control"
                      name="description"
                      onChange={ handleChange }
                      value={ product.description }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <h3 className="text-center">{ strings["Image"] }</h3>
              <img src={ image } alt="" className="d-block img-fluid mb-3" />
              <div className="form-group">
                <label htmlFor="image">{ strings["upload_file"] }</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="image"
                    // onChange={uploadFileHandler}
                    name="image"
                    onChange={ e => setImageFile(e.target.files[0]) }
                  // value={product.description}
                  />
                  <label htmlFor="image" className="custom-file-label">
                    { strings["upload_file"] }
                  </label>
                </div>
                <small className="form-text text-muted"> { strings["Max_size_3mb"] }</small>
              </div>
              <button
                className="btn btn-primary btn-block"
                disabled={ !imageFile }
                onClick={ handleUpdateImage }>
                Cập nhật hình ảnh
              </button>
              {/* <button className="btn btn-danger btn-block">Delete Image</button> */ }
            </div>
          </div>
        </div>
      </section>
      <br></br>
    </>
  )
}

export default multilanguage(ProductDetails);