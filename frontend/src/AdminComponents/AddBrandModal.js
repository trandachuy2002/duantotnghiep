import React, { useContext, useState } from 'react'
import BrandContext from '../context/brand/brandContext'


const AddBrandModal = () => {
  const context = useContext(BrandContext)
  const { addBrand } = context

  const [brand, setBrand] = useState({ local: '', image: '' })

  const handleChange = e => {
    setBrand({ ...brand, [e.target.name]: e.target.value })
  }

  const handleAddBrand = async () => {
    await addBrand(brand.local)
  }

  return (
    <>
      {/* ADD CATEGORY MODAL */}
      <div
        style={{ zIndex: '9999' }}
        className="modal fade"
        id="addBrandModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Add Thương hiệu</h5>
              <button className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="local">Local</label>
                  <input
                    type="text"
                    name="local"
                    className="form-control"
                    value={brand.title}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleAddBrand}>
                Add Brand
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddBrandModal
