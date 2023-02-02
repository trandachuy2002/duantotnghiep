import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import { useCart } from 'react-use-cart'
import { changeLanguage, multilanguage } from 'redux-multilanguage'
import PropTypes from "prop-types";
import { useToasts } from "react-toast-notifications";


const Header = ({
  currentLanguageCode,
  dispatch,
  strings
}) => {
  // const dispatch = useDispatch();
  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    localStorage.setItem("lang", languageCode)
    dispatch(changeLanguage(languageCode));
  };

  const navigate = useNavigate()
  const { addToast } = useToasts();

  const { totalUniqueItems, items } = useCart()

  // for user context
  const userContext = useContext(UserContext)
  const { logout, user } = userContext

  const logoutHandler = () => {

    logout(items, addToast, totalUniqueItems)

    // navigate('/login')
  }


  // eslint-disable-next-line no-undef
  ScrollOut({
    cssProps: true,
    threshold: 0.2
  });


  return (
    <header className="site-navbar" role="banner" data-scroll>
      <div className="site-navbar">
        <div className="container">
          <div className="row align-items-center">
            {/* <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2"> */ }
            <div className="logo">
              <a href='/'>
                <img src="images/logo6.png" alt="placeholder"></img>
              </a>
            </div>
            {/* </div> */ }
            <div className='dinh'>
              <nav className="site-navigation text-right text-md-center" role="navigation">
                <div className="container">
                  <ul className="site-menu js-clone-nav d-none d-md-block">
                    <li className="active">
                      <Link to="/">
                        { strings["HOME"] }
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop">
                        { strings["SHOP"] }
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact">
                        { strings["CONTACT_US"] }
                      </Link>
                    </li>
                    <span>
                      <ul>
                        { user && user.role === 'admin' && (
                          <li>
                            <Link to="/adminDashboard">
                              <i className='fas fa-user-cog'>&ensp;</i> { strings["ADMIN_DASHBOARD"] }
                            </Link>
                          </li>
                        ) }
                        { user ? (
                          <>
                            <li>
                              <Link to="/profile">
                                <i className='fas fa-user-edit'>&ensp;</i>
                                { user.name }
                              </Link>
                            </li>
                            <li>
                              <Link to="/" onClick={ logoutHandler }>
                                <i className='fas fa-sign-in-alt'>&ensp;</i>
                                { strings["LOGOUT"] }
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link to="/login">
                                <i className="fas fa-sign-in-alt"> &ensp;</i>{ strings["LOGIN"] }
                              </Link>
                            </li>
                            <li>
                              <Link to="/signup">
                                <i className="fas fa-user-plus">&ensp;</i>{ strings["SIGNUP"] }
                              </Link>
                            </li>
                          </>
                        ) }
                        <li>
                          <Link to="/cart" className="site-cart">

                            <div className="main-icon">
                              <a className="main-bag">
                                <i className="icon icon-shopping_cart" aria-hidden="true"></i>
                                { totalUniqueItems && totalUniqueItems > 0 ? (
                                  <span className="count-item" id="cart-total">{ totalUniqueItems }</span>
                                ) : (
                                  ''
                                ) }
                              </a>
                            </div>

                          </Link>
                        </li>
                      </ul>
                    </span>
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        { currentLanguageCode === "vn"
                          ? "Việt Nam" :
                          currentLanguageCode === "en"
                            ? "English"
                            : "" }
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <p className="btn btn-primary w-100" value="en" onClick={ e => changeLanguageTrigger(e) }>
                            { strings["english"] }
                          </p>
                        </li>
                        <li className="text-danger mt-2 ">
                          <button className="btn btn-primary w-100" value="vn" onClick={ e => changeLanguageTrigger(e) }>
                            { strings["vietnamese"] }
                          </button>
                        </li>
                      </ul>
                    </div>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="col-6 col-md-4 order-3 order-md-3 text-right">
              <div className="dropdown2">
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    { currentLanguageCode === "vn"
                      ? "Việt Nam" :
                      currentLanguageCode === "en"
                        ? "English"
                        : "" }
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="btn btn-primary w-100" value="en" onClick={ e => changeLanguageTrigger(e) }>
                        { strings["english"] }
                      </button>
                    </li>
                    <li className="text-danger mt-2 ">
                      <button className="btn btn-primary w-100" value="vn" onClick={ e => changeLanguageTrigger(e) }>
                        { strings["vietnamese"] }
                      </button>
                    </li>
                  </ul>
                </div>
                { user ? (
                  <>
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Hello { user.name }</button>
                  </>
                ) : (<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Hello ?</button>)
                }
                <ul className="dropdown-menu">
                  <ul>
                    { user && user.role === 'admin' && (
                      <li>
                        <Link to="/adminDashboard">
                          <i className='fas fa-user-cog'>&ensp;</i> { strings["ADMIN_DASHBOARD"] }
                        </Link>
                      </li>
                    ) }
                    { user ? (
                      <>
                        <li>
                          <Link to="/profile">
                            <i className='fas fa-user-edit'>&ensp;</i>
                            { user.name }
                          </Link>
                        </li>
                        <li>
                          <Link to="/" onClick={ logoutHandler }>
                            <i className='fas fa-sign-in-alt'> &ensp;</i>
                            { strings["LOGOUT"] }
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/login">
                            <i className="fa fa-user"> &ensp;</i>{ strings["LOGIN"] }
                          </Link>
                        </li>
                        <li>
                          <Link to="/signup">
                            <i className="fas fa-user-plus">&ensp;</i>{ strings["SIGNUP"] }
                          </Link>
                        </li>
                      </>
                    ) }
                  </ul>
                </ul>
                <div className='box2'>
                  <Link to="/cart" className="site-cart">

                    <div className="main-icon">
                      <a className="main-bag">
                        <i className="icon icon-shopping_cart" aria-hidden="true"></i>
                        { totalUniqueItems && totalUniqueItems > 0 ? (
                          <span className="count-item" id="cart-total">{ totalUniqueItems }</span>
                        ) : (
                          ''
                        ) }
                      </a>
                    </div>


                    {/* <span className="icon icon-shopping_cart">&ensp;</span> */ }
                    {/* {totalUniqueItems && totalUniqueItems > 0 ? ( */ }
                    {/* // <span className="count">{totalUniqueItems}</span> */ }
                    {/* // ) : ( */ }
                    {/* // '' */ }
                    {/* // )} */ }
                  </Link>
                </div>
              </div>
            </div>
            <div className="site-top-icons">
              <span className='icon'>
                <li className="d-inline-block d-md-none ml-md-0">
                  <a href="/" className="site-menu-toggle js-menu-toggle">
                    <span className="icon-menu"></span>
                  </a>
                </li>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
Header.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};
export default multilanguage(Header);
