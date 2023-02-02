import React, { useContext, useState } from 'react'
import CategoryContext from '../context/category/categoryContext'
import { useToasts } from "react-toast-notifications";

const AddCategoryModal = () => {
  const context = useContext(CategoryContext)
  const { addCategory } = context
  const { addToast } = useToasts();

  const [category, setCategory] = useState({ title: '' })

  const handleChange = e => {
    setCategory({ ...category, [e.target.name]: e.target.value })
  }

  const handleAddCategory = async () => {
    await addCategory(category.title, addToast)
  }

  return (
    <>
      {/* ADD CATEGORY MODAL */ }
      <div
        style={ { zIndex: '9999' } }
        className="modal fade"
        id="addCategoryModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Thêm danh mục</h5>
              <button className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Danh mục</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={ category.title }
                    onChange={ handleChange }
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-success"
                data-dismiss="modal"
                onClick={ handleAddCategory }>
                Thêm danh mục
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCategoryModal
