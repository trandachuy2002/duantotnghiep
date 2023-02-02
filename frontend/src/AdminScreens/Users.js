import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { multilanguage } from 'redux-multilanguage'
import Navbar from '../AdminComponents/Navbar'
import UserContext from '../context/user/UserContext'
// import Footer from '../AdminComponents/Footer'

const Users = ({ strings }) => {
  // for user context
  const uContext = useContext(UserContext)
  const { getAllUsers, allUsers, deleteOneUserAdmin } = uContext

  useEffect(() => {
    getAllUsers()
    // eslint-disable-next-line
  }, [])
  const deleteSaveChanges = (id) => {
    // const { name, sku, category, price, description } = user
    deleteOneUserAdmin(id)
  }
  return (
    <>
      <Navbar />
      <div>
        {/* HEADER */ }
        <header id="main-header" className="py-2 bg-warning text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-users" />     { strings["Account"] }
                </h1>
              </div>
            </div>
          </div>
        </header>
        {/* SEARCH */ }
        <section id="search" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6 ml-auto">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={ strings["search"] }
                  />
                  <div className="input-group-append">
                    <button className="btn btn-warning">{ strings["search"] }</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* USERS */ }
        <section id="users">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>{ strings["News users"] }</h4>
                  </div>


                  <div className="content table-responsive table-full-width">
                    <table className="table table-hover">
                      <thead>
                        <th className="product-mahang1">#</th>
                        <th className="product-tenhang">{ strings["account_name"] }</th>
                        <th className="product-logo">{ strings["email"] }</th>
                        <th className="product-logo">{ strings["Date"] }</th>
                        <th>{ strings["Manipulation"] }</th>
                      </thead>
                      <tbody>
                        {
                          <>
                            { allUsers.map((user, i) => (
                              <tr key={ user._id }>
                                <td className="product-mahang1">
                                  { i + 1 }
                                </td>
                                <td className="product-tenhang">{ user.name }</td>
                                <td className="product-logo">{ user.email }</td>
                                <td>
                                  { new Date(user.createdAt).toLocaleString() }
                                </td>
                                <td>
                                  <button
                                    className="btn btn-secondary bg-danger text-white"
                                    disabled
                                    onClick={ () => deleteSaveChanges(user._id) }>
                                    <i className="fas fa-trash" />
                                  </button>
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
    </>
  )
}

export default multilanguage(Users);