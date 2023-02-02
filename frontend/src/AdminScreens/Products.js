import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import AddProductModal from "../AdminComponents/AddProductModal";
import Navbar from "../AdminComponents/Navbar";
import productContext from "../context/product/productContext";
// import Footer from '../AdminComponents/Footer'

const Products = ({ strings }) => {
  // for product context
  const pContext = useContext(productContext);
  const { getProducts, products } = pContext;

  const limit = 8;
  const [skip, setSkip] = useState(0);
  const [keyWord, setKeyWord] = useState("");
  // const [category, setCategory] = useState('')
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyWord));
    };
    populateProducts();
    // eslint-disable-next-line
  }, [skip, limit]);

  const handlePreviousClick = async () => {
    if (skip > 0) {
      setSkip(skip - limit);
    }
  };

  const handleNextClick = async () => {
    setSkip(skip + limit);
  };

  const handleChange = (e) => {
    setKeyWord(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyWord));
    };
    setSkip(0);
    populateProducts();
  };

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      <Navbar />
      {/* HEADER */ }
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-pencil-alt" /> { strings["Product"] }
              </h1>
            </div>
          </div>
        </div>
      </header>
      {/* SEARCH */ }
      <section id="search" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row" id="boxx2">
            <div className="col-md-6" >
              <a
                href="/"
                className="btn btn-primary btn-block"
                data-toggle="modal"
                data-target="#addProductModal">
                <i className="fas fa-plus" />  { strings["Add products"] }
              </a>
              <AddProductModal />
            </div>
            <div className="col-md-6 ml-auto" >
              <form onSubmit={ handleSearchSubmit } >
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={ strings["search_products"] }
                    value={ keyWord }
                    onChange={ handleChange }
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                      { strings["search"] }
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Products */ }
      <section id="posts">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4> { strings["list_products"] }</h4>
                </div>
                <div className="content table-responsive table-full-width">
                  { products?.length ? (
                    <>
                      <table className="table table-hover">
                        <thead>
                          <th className="product-mahang1">#</th>
                          <th className="product-tenhang"> { strings["Product name"] }</th>
                          <th className="product-logo">{ strings["price_product"] }</th>
                          <th className="product-logo">{ strings["Date"] }</th>
                          <th>{ strings["Manipulation"] }</th>
                        </thead>

                        <tbody>
                          {
                            <>
                              { products.map((product, i) => (
                                <tr key={ product._id }>
                                  <td className="product-mahang1">
                                    { i + 1 }
                                  </td>
                                  <td className="product-tenhang">{ product.name }</td>
                                  <td className="product-logo"> { product.price.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  }) }</td>
                                  <td>
                                    { new Date(product.createdAt).toLocaleDateString() }
                                  </td>
                                  <td>
                                    <Link
                                      to={ `/productDetailsAdmin/${product._id}` }
                                      className="btn btn-secondary bg-primary text-white">
                                      <i className="fas fa-angle-double-right" /> { strings["Detail"] }
                                    </Link>
                                  </td>
                                </tr>
                              )) }
                            </>
                          }
                        </tbody>
                      </table>
                      <div className="row mx-3">
                        <div className="col-md-12 text-center">
                          <div className="d-flex justify-content-between align-items-center my-3">
                            <Button
                              variant="success"
                              size="sm"
                              onClick={ handlePreviousClick }
                              disabled={ skip < 1 }>
                              &larr; { strings["Before"] }
                            </Button>

                            <div className="text-center mx-2">
                              { strings["Page"] } { skip / limit + 1 }
                              {/* <span className="text-muted"> */ }
                              {/* Hiển thị {products.length} hết {totalResults} */ }
                              {/* sản phẩm. */ }
                              {/* </span> */ }
                            </div>

                            <Button
                              variant="success"
                              size="sm"
                              onClick={ handleNextClick }
                              disabled={ totalResults - skip <= limit }>
                              { strings["After"] } &rarr;
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (

                    <div className="col-md-12 text-center">
                      <img className="text-center" src="https://bizweb.dktcdn.net/100/333/755/themes/688335/assets/empty_cart.png?1647314197820" alt="" />
                      <h2> { strings["No_products"] } </h2>
                    </div>

                  ) }
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */ }
    </>
  );
};

export default multilanguage(Products);