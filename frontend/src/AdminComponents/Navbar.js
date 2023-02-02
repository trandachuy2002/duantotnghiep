import React from 'react'
import { Link } from 'react-router-dom'
import { multilanguage } from 'redux-multilanguage'
import Breadcrumb from '../components/Breadcrumb'

const Navbar = ({ strings }) => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
        <div className="container">
          <Link to="/adminDashboard" className="navbar-brand">
            { strings["Admin DashBoard"] }
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav">
              <li className="nav-item px-2">
                <Link to="/adminDashboard" className="nav-link active">
                  { strings["Dashboard"] }
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/products" className="nav-link">
                  { strings["Product"] }
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/categories" className="nav-link">
                  { strings["Category"] }

                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/brands" className="nav-link">
                  { strings["brands"] }
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/users" className="nav-link">
                  { strings["Account"] }
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/orders" className="nav-link">
                  { strings["Order"] }
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/reviews" className="nav-link">
                  { strings["Comment"] }
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Breadcrumb pageName="Admin Panel" />
    </>
  )
}

export default multilanguage(Navbar);