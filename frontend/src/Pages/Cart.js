import React, { useContext } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import UserContext from "../context/user/UserContext";
import { useToasts } from "react-toast-notifications";
import { multilanguage } from "redux-multilanguage";

const Cart = ({ strings }) => {
  const navigate = useNavigate();

  // for user context
  const uContext = useContext(UserContext);
  const { user } = uContext;
  const { addToast } = useToasts();

  const {
    isEmpty,
    totalItems,
    totalUniqueItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
    items,
  } = useCart();
  const removeItems = (id) => {
    if (addToast) {
      addToast(`${strings["Product removed success"]}`, { appearance: "success", autoDismiss: true });
    }
    removeItem(id)
  }
  const emptyCarts = () => {
    if (addToast) {
      addToast(`${strings["Product removed success"]}`, { appearance: "success", autoDismiss: true });
    }
    emptyCart()
  }
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      <Breadcrumb pageName="Cart" />
      { isEmpty ? (
        <div className="text-center my-5">
          <img src="https://bizweb.dktcdn.net/100/333/755/themes/688335/assets/empty_cart.png?1647314197820" alt="" />
          <h2 className=" my-3">{ strings["Your cart is empty"] }</h2>
          <button className="btn btn-secondary" onClick={ () => navigate("/shop") }>{ strings["come_back"] }</button>
        </div>
      ) : (
        <div className="site-section">
          <div className="container">
            <div className="row mb-5">
              <form className="col-md-12" method="post">
                {/* <div className="site-blocks-table"> */ }
                <h4>
                  { strings["Cart_Contains"] } : ( { totalUniqueItems } )  { strings["Product Type And Total Number Of Products Are"] }: (
                  { totalItems } )   { strings["In_Cart"] }
                </h4>


                <div className="content table-responsive table-full-width">
                  <table className="table table-hover">
                    <thead>
                      <th className="product-mahang"> { strings["In_Cart"] } </th>
                      <th className="product-tenhang">{ strings["SHOP"] }</th>
                      <th className="product-logo">{ strings["price_product"] }</th>
                      <th className="product-logo">{ strings["quantity"] }</th>
                      <th className="product-logo">{ strings["cart_grand_total"] }</th>
                      <th></th>
                    </thead>
                    <tbody>
                      {
                        <>
                          { items.map((item) => (
                            <tr key={ item._id }>
                              <td className="product-mahang">
                                <Link to={ `/shopSingle/${item._id}` }>
                                  <img src={ item.image } alt="img" className="img-fluid" id="img3" />
                                </Link>
                              </td>
                              <td className="product-tenhang">{ item.name }</td>
                              <td className="product-logo">{ formatter.format(item.price) }</td>
                              <td>
                                <div className="buttons_added">
                                  <input
                                    className="minus is-form"
                                    type="button"
                                    value="-"
                                    onClick={ () => {
                                      if (addToast) {
                                        addToast(`${strings["Delete the number of products successfully"]}`, { appearance: "success", autoDismiss: true });
                                      }; updateItemQuantity(item.id, item.quantity - 1)
                                    }
                                    }
                                  />
                                  <input
                                    aria-label="quantity"
                                    className="input-qty"
                                    type="number"
                                    value={ item.quantity }
                                    disabled
                                    onClick={ (e) => updateItemQuantity(item.id, e.target.value)
                                    }
                                  />
                                  <input
                                    className="plus is-form"
                                    type="button"
                                    value="+"
                                    onClick={ () => {
                                      if (addToast) {
                                        addToast(`${strings["Add the number of products successfully"]}`, { appearance: "success", autoDismiss: true });
                                      };
                                      updateItemQuantity(item.id, item.quantity + 1)
                                    } }
                                    disabled={ item.quantity >= item.Stock }
                                  />
                                </div>
                              </td>
                              <td>{ formatter.format(item.itemTotal) }</td>
                              <td>
                                <button onClick={ () => removeItems(item.id) } className="delete"><i className="fa fa-trash" ></i></button>
                              </td>
                            </tr>
                          )) }
                        </>
                      }
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
            <div className="row">
              <div className="col-md-7">
                <div className="row mb-5">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <button
                      onClick={ () => emptyCarts() }
                      className="btn btn-warning btn-sm btn-block">
                      { strings["Delete_all"] }
                    </button>
                  </div>
                  <div className="col-md-6">
                    <Link
                      to="/shop"
                      className="btn btn-outline-primary btn-sm btn-block"
                    >
                      { strings["Continue_shopping"] }
                    </Link>
                  </div>
                </div>

                <br></br>
              </div>

              <div className="col-md-5">
                <div className="row justify-content-end">
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-md-12 text-right border-bottom mb-5">
                        <h3 className="text-black h4 text-uppercase text-center">
                          { strings["cart_total"] }
                        </h3>
                      </div>
                    </div>
                    <div className="mb-3" id="mb-3">
                      <div className="col-md-6">
                        <span className="text-black">{ strings["subtotal"] }</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">0</strong>
                      </div>
                    </div>
                    <div className="mb-3" id="mb-3">
                      <div className="col-md-6">
                        <span className="text-black">{ strings["cart_grand_total"] }</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">{ formatter.format(cartTotal) }</strong>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-primary btn-lg py-3 btn-block"
                          onClick={ () =>
                            navigate(user ? "/checkout" : "/login")
                          }
                        >
                          { strings["Proceed to checkout"] }
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) }
    </>
  );
};
export default multilanguage(Cart);