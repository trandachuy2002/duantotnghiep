import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../AdminComponents/Navbar";
import OrderContext from "../context/orders/orderContext";
// import SweetPagination from "sweetpagination";
import { Form, FormControl } from "react-bootstrap";
import Paginator from 'react-hooks-paginator';

import swal from "sweetalert";
import productContext from "../context/product/productContext";
import { Rating } from "@mui/material";
import { multilanguage } from "redux-multilanguage";


const Review = ({ strings }) => {
  const pContext = useContext(productContext);
  const { getProducts, products, getAllReviews } = pContext;

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");


  const [productId, setProductId] = useState("");


  const pageLimit = 5;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);


  useEffect(() => {
    if (productId.length === 24) {
      getAllReviews(productId);
    }
  }, []);

  useEffect(() => {
    setCurrentData(products.slice(offset, offset + pageLimit));
  }, [offset, products]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/reviews?${keyword}`);
    } else {
      navigate(`/reviews`)
    }
  }

  const handlerSearchChange = (e) => {
    setKeyword(e.target.value);
  }


  return (
    <>
      <Navbar />
      {/* HEADER */ }
      <header id="main-header" className="py-2 bg-danger text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="far fa-comment" /> Bình luận
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
              <Form className="d-flex" onSubmit={ searchHandler }>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  minLength={ 3 }
                  size="sm"
                  defaultValue={ keyword } onChange={ handlerSearchChange }
                />
                <button type="submit" className="btn btn-secondary mx-3">
                  Tìm kiếm
                </button>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <section id="users">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Danh sách bình luận</h4>
                </div>
                { currentData?.length ? (
                  <div className="content table-responsive table-full-width">
                    <table className="table table-hover">
                      <thead>
                        <th className="product-mahang1">Mã</th>
                        <th className="product-tenhang">Tên sản phẩm</th>
                        <th className="product-logo">Tổng bình luận</th>
                        <th className="product-logo">Tổng đánh giá</th>
                        <th>Thao tác</th>
                        <th></th>
                      </thead>
                      <tbody>
                        {
                          <>
                            { currentData && currentData.filter((value) => {
                              if (keyword === "") {
                                return value;
                              } else if (value._id.toLowerCase().includes(keyword.toLowerCase())) {
                                return value;
                              }
                            }).map((product, index) => (
                              <tr key={ product._id }>
                                <td className="product-mahang1">{ product._id }</td>
                                <td className="product-tenhang">{ product.name }</td>
                                <td className="product-logo">{ product.numOfReviews }</td>
                                <td><Rating name="half-rating-read" defaultValue={ product.ratings } precision={ 0.5 } readOnly /></td>
                                <td>
                                  <Link
                                    to={ `/reviews/${product._id}` }
                                    className="btn btn-secondary bg-primary text-white"
                                  >
                                    <i className="fas fa-angle-double-right" /> Chi tiết
                                  </Link>
                                </td>
                              </tr>
                            )) }
                          </>
                        }
                      </tbody>
                    </table>
                  </div>
                ) : (

                  <div className="col-md-12 text-center">
                    <img className="text-center" src="https://bizweb.dktcdn.net/100/333/755/themes/688335/assets/empty_cart.png?1647314197820" alt="" />
                    <h2>Không có bình luận nào !</h2>
                  </div>

                ) }
                <Paginator
                  totalRecords={ products.length }
                  pageLimit={ pageLimit }
                  pageNeighbours={ 2 }
                  setOffset={ setOffset }
                  currentPage={ currentPage }
                  setCurrentPage={ setCurrentPage }
                  pageContainerClass="mb-0 mt-0 d-flex"
                  pagePrevText="«"
                  pageNextText="»"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <br></br>
    </>
  );
};

export default multilanguage(Review);