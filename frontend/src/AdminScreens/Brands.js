import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Navbar from '../AdminComponents/Navbar'
// import Footer from '../AdminComponents/Footer'
import BrandContext from '../context/brand/brandContext'
import EditBrandModal from '../AdminComponents/EditBrandModal'
import AddBrandModal from '../AdminComponents/AddBrandModal'
import swal from 'sweetalert'
import { multilanguage } from 'redux-multilanguage'

const Brands = ({ strings }) => {
  const context = useContext(BrandContext)
  const { brands, getBrands, deleteBrand } = context

  // const [categoryArray, setCategoryArray] = useState(categories)

  useEffect(() => {
    getBrands()

    // eslint-disable-next-line
  }, [])

  //delete catagory
  const deleteSaveChanges = (id) => {
    swal({
      title: `${strings["Are you sure you want to delete?"]}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {

        if (willDelete) {
          swal({
            title: `${strings["Deleted brand successfully"]}`,
            icon: "success",
            buttons: true,
          });
          deleteBrand(id)
          // setTimeout(() => {
          window.location.reload()


          // }, 3000)
        } else {
          window.location.reload()
        }
      });

  }
  return (
    <div>
      <Navbar />

      <div>
        {/* HEADER */ }
        <header id="main-header" className="py-2 bg-secondary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-folder" /> { strings["brands"] }
                </h1>
              </div>
            </div>
          </div>
        </header>
        {/* SEARCH */ }
        <section id="search" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row" id='boxx2'>
              <div className="col-md-6">
                <a
                  href="/"
                  className="btn bg-secondary text-white btn-block"
                  data-toggle="modal"
                  data-target="#addBrandModal">
                  <i className="fas fa-plus" />  { strings["Add new brand"] }
                </a>
                <AddBrandModal />
              </div>
              <div className="col-md-6 ml-auto">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={ strings["search_brand"] }
                  />
                  <div className="input-group-append">
                    <button className="btn btn-secondary"> { strings["search"] }</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CATEGORIES */ }
        <section id="brands">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>{ strings["News brands"] }</h4>
                  </div>

                  <div className="content table-responsive table-full-width">
                    <table className="table table-hover">
                      <thead>
                        <th className="product-mahang1">#</th>
                        <th className="product-tenhang">{ strings["Title"] }</th>
                        <th>{ strings["Manipulation"] }</th>
                      </thead>
                      <tbody>
                        {
                          <>
                            { brands.map((brand, i) => (
                              <tr key={ brand._id }>
                                <td className="product-mahang1">
                                  { i + 1 }
                                </td>
                                <td className="product-tenhang">{ brand.local }</td>
                                <td id='buttonadmin'>
                                  <EditBrandModal brand={ brand } />
                                  <Button variant="danger" className="mx-2" onClick={ () => deleteSaveChanges(brand._id) }>
                                    <i className="fas fa-trash" />
                                  </Button>
                                </td>
                              </tr>
                            )) }
                          </>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Footer /> */ }
    </div>
  )
}

export default multilanguage(Brands);