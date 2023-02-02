import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import productContext from "../context/product/productContext";
import { useCart } from "react-use-cart";
import UserContext from "../context/user/UserContext";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
// import Paginator from 'react-hooks-paginator';
import { Pagination } from "@mui/material";
import usePagination from "../helpers/Pagination"
import { useToasts } from "react-toast-notifications";
import { multilanguage } from "redux-multilanguage";

const ShopSingle = ({ strings }) => {
  // for product context
  const pContext = useContext(productContext);
  const { getOneProduct, newReview } = pContext;
  // user context
  const userContext = useContext(UserContext)
  const { user } = userContext

  const { addItem } = useCart();
  const { addToast } = useToasts();
  const [quantity, setQuantity] = useState(1);
  const [productReview, setProductReview] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [product, setProduct] = useState({ brand: {} });
  const [page, setPage] = useState(1);

  const { id } = useParams();
  const PER_PAGE = 5;
  const count = Math.ceil(productReview.length / PER_PAGE);
  const data = usePagination(productReview, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    data.jump(p);
  };

  useEffect(() => {
    const fetctProduct = async () => {
      const fetchedProduct = await getOneProduct(id);
      setProduct(fetchedProduct);
      setProductReview(fetchedProduct.reviews)
    };
    fetctProduct();
    // eslint-disable-next-line
  }, []);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    const payload = { rating, comment, productId: product._id, user: user._id, name: user.name };
    newReview(payload);
    if (addToast) {
      addToast(`${strings["Thank you for rating the product"]}`, { appearance: "success", autoDismiss: true });
    }
    setTimeout(() => {
      window.location.reload(`/shopSingle/${id}`)
    }, 1500)
  };

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      <Breadcrumb pageName={ product.name } />
      <div className="container11">
        <div className="imgBx">
          <img src={ product.image } alt="" />
        </div>
        <div className="details">
          <div className="content">
            <h2>{ product.name }<br></br>
              <span>{ strings["brands"] }: { product.brand.local }</span>
            </h2>

            <div className="product-colors">
              <input className="minus is-form" type="button" value="-" disabled={ quantity < 2 } onClick={ () => setQuantity(quantity - 1) } />
              <input aria-label="quantity" className="input-qty" type="number" value={ quantity } disabled onChange={ (e) => setQuantity(e.target.value) } />
              <input className="plus is-form" type="button" value="+" onClick={ () => setQuantity(quantity + 1) } disabled={ quantity >= product.Stock } />
            </div>
            <div className=""><span>{ product.Stock } { strings["products_available"] }</span></div>
            { product.Stock >= 0 ? (
              <>
                <span>{ strings["Total_reviews"] }: { product?.ratings.toFixed(1) }</span>
                <div id="start">
                  <h3>{ formatter.format(product.price) }</h3>
                  <Rating name="rating" readOnly defaultValue={ product.ratings } precision={ 0.5 } />
                </div>
                <Link to={ `/cart` }>
                  <button onClick={ () => {
                    let item = { ...product, id: product._id, };
                    if (addToast) {
                      addToast(`${strings["Added_to_cart"]}`, { appearance: "success", autoDismiss: true });
                    };
                    addItem(item, quantity);
                  } }
                    disabled={ product.Stock <= 0 }
                    type="button">{ product.Stock <= 0 ? "Hết Hàng" : "Mua Ngay" }</button>
                </Link>

                <br></br>
                <small>{ strings["Product_code"] }: { product.sku }</small>
              </>) : (<>
                <button className="buy-now btn btn-sm btn-primary">{ strings["out_of_stock"] }</button>
              </>
            ) }
            <h6 className="pt-2">{ strings["Product_Description"] }: { product.description }</h6>
          </div>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-5 col-md-6 col-12 pb-4">
              <h1>{ strings["comment"] }</h1>
              { data.currentData().map((review, key) => (
                <div className="comment mt-4 text-justify float-left col-122">
                  <div className="box1">
                    <h4>{ review.name }</h4> &ensp;
                    <span className="text-secondary">
                      { new Date(
                        review.createdAt
                      ).toLocaleString() }
                    </span>
                  </div>
                  <Box>
                    <Rating
                      name="rating" size="small"
                      defaultValue={ review.rating }
                      readOnly
                    />
                  </Box>
                  <p>{ review.comment }</p>
                  <hr></hr>
                </div>
              )) }
              <Pagination
                count={ count }
                size="large"
                page={ page }
                variant="outlined"
                shape="rounded"
                onChange={ handleChange }
              />
            </div>

            <div className="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4">
              <form id="algin-form" onSubmit={ reviewSubmitHandler }>
                <h4>{ strings["Leave a comment"] }</h4>
                { user ? (<>
                  <div className="form-group">
                    <label>{ strings["Rating"] }:</label>
                    <Box
                      sx={ {
                        '& > legend': { mt: 1 },
                      } }
                    >
                      <Rating
                        name="rating"
                        value={ rating }
                        onChange={ (event, newValue) => {
                          setRating(newValue);
                        } }
                      />
                    </Box>

                    <label htmlFor="message">{ strings["Content"] }</label>
                    <textarea
                      name="msg"
                      cols="30"
                      rows="5"
                      className="form-control"
                      required
                      value={ comment }
                      onChange={ (e) => setComment(e.target.value) }
                    ></textarea>
                  </div>
                  <input className="btn btn-secondary" type="submit" />
                </>) : (
                  <p>{ strings["You need to login to comment"] }<Link to="/login">{ strings["here"] }</Link></p>
                ) }
              </form>
              <br></br>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default multilanguage(ShopSingle);
