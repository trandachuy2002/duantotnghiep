import { Button, Modal } from 'react-bootstrap'
import React, { useContext, useEffect, useState } from 'react'
import BrandContext from '../context/brand/brandContext'

const EditBrandModal = props => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const context = useContext(BrandContext)
  const { updateBrand } = context

  const [brand, setBrand] = useState({ local: '' })

  useEffect(() => {
    setBrand({ local: props.brand.local })
    // eslint-disable-next-line
  }, [])

  const handleChange = e => {
    setBrand({ ...brand, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    updateBrand(props.brand._id, brand.local, brand.image)
    setShow(false)
  }

  return (
    <>
      <Button variant="secondary" className="mx-2" onClick={handleShow}>
        <i className="fas fa-edit" />
      </Button>

      <Modal show={show} style={{ zIndex: '9999' }} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="local"
              className="form-control"
              value={brand.local}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditBrandModal
