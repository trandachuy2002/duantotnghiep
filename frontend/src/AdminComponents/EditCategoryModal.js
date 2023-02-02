import { Button, Modal } from 'react-bootstrap'
import React, { useContext, useEffect, useState } from 'react'
import CategoryContext from '../context/category/categoryContext'

const EditCategoryModal = props => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const context = useContext(CategoryContext)
  const { updateCategory } = context

  const [category, setCategory] = useState({ title: '' })

  useEffect(() => {
    setCategory({ title: props.category.title })
    // eslint-disable-next-line
  }, [])

  const handleChange = e => {
    setCategory({ ...category, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    updateCategory(props.category._id, category.title, category.image)
    setShow(false)
  }

  return (
    <>
      <Button variant="secondary" className="mx-2 bg-success text-white" onClick={handleShow}>
        <i className="fas fa-edit" /> 
      </Button>

      <Modal show={show} style={{ zIndex: '9999' }} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="title">Danh mục</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={category.title}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSave}>
           Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditCategoryModal
