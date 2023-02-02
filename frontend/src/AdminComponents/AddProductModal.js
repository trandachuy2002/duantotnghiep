import React, { useContext, useEffect, useState } from 'react'
import CategoryContext from '../context/category/categoryContext'
import BrandContext from '../context/brand/brandContext'
import productContext from '../context/product/productContext'
import { multilanguage } from 'redux-multilanguage'



const AddProductModal = ({ strings }) => {
  // for product context
  const pContext = useContext(productContext)
  const { addProduct } = pContext

  // for category context
  const cContext = useContext(CategoryContext)
  const { categories, getCategories } = cContext
  // for brands context
  const bContext = useContext(BrandContext)
  const { brands, getBrands } = bContext

  useEffect(() => {
    getCategories()
    getBrands()
    // eslint-disable-next-line
  }, [])

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

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleAddproduct = () => {
    const { name, sku, category, brand, price, description, Stock } = product
    const formData = new FormData()
    formData.append('image', image)
    formData.append('name', name)
    formData.append('sku', sku)
    formData.append('category', category)
    formData.append('brand', brand)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('Stock', Stock)
    addProduct(formData)
    setProduct({
      name: '',
      sku: '',
      category: '',
      brand: '',
      price: '',
      description: '',
      Stock: '',
    })
    setImage('')
  }

  return (
    <>
      {/* ADD POST MODAL */ }
      <div
        style={ { zIndex: '9999' } }
        className="modal fade"
        id="addProductModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">{ strings["Add products"] }</h5>
              <button className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            {/* <form onSubmit={handleAddproduct}> */ }
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">{ strings["Product name"] }</label>
                <input
                  type="text"
                  name="name"
                  onChange={ handleChange }
                  value={ product.name }
                  className="form-control"
                />
                <small className="form-text text-muted">{ strings["Please Enter Name With At least 3 Characters"] }</small>
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
                  <option value>{ strings["select category"] }</option>
                  { categories.map(item => (
                    <option key={ item._id } value={ item._id }>
                      { item.title }
                    </option>
                  )) }
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="brand">{ strings["brands"] }</label>
                <select
                  className="form-control"
                  name="brand"
                  onChange={ handleChange }>
                  <option value>{ strings["Choose a brand"] }</option>
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
                <small className="form-text text-muted">{ strings["Price Must Be A Positive Number!"] }</small>
              </div>

              <div className="form-group">
                <label htmlFor="price">{ strings["quantity"] }</label>
                <input
                  type="text"
                  name="Stock"
                  onChange={ handleChange }
                  value={ product.Stock }
                  className="form-control"
                />
                <small className="form-text text-muted">{ strings["Number Can't Exceed 4 Characters"] }</small>
              </div>

              <div className="form-group">
                <label htmlFor="body">{ strings["Product_Description"] }</label>
                <textarea
                  className="form-control"
                  name="description"
                  onChange={ handleChange }
                  value={ product.description }
                />
                <small className="form-text text-muted">{ strings["Please Enter Description With At least 10 Characters"] }</small>
              </div>

              <div className="form-group">
                <label htmlFor="image">{ strings["Image"] }</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="image"
                    // onChange={uploadFileHandler}
                    name="image"
                    onChange={ e => setImage(e.target.files[0]) }
                  // value={product.description}
                  />
                  <label htmlFor="image" className="custom-file-label">
                    { strings["upload_file"] }
                  </label>
                </div>
                {/* <small className="form-text text-muted">Max Size 3mb</small> */ }
                <small className="form-text text-muted"> { strings["Max_size_3mb"] }</small>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                type="submit"
                // data-dismiss="modal"
                onClick={ handleAddproduct }>
                { strings["Add products"] }
              </button>
            </div>
            {/* </form> */ }
          </div>
        </div>
      </div>
    </>
  )
}

export default multilanguage(AddProductModal);