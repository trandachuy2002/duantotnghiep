import { Box, Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Paginator from "react-hooks-paginator";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../AdminComponents/Navbar";
import productContext from "../context/product/productContext";
const ReviewById = () => {
  const pContext = useContext(productContext);
  const { getAllReviews } = pContext;
  const { id } = useParams();

  const [review, setReview] = useState({
    reviews: [],
  });
  useEffect(() => {
    const fetchOrder = async () => {
      const reviewData = await getAllReviews(id);
      setReview(reviewData);
    };
    fetchOrder();
    // eslint-disable-next-line
  }, []);

  const pageLimit = 2;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setCurrentData(review.reviews.slice(offset, offset + pageLimit));
  }, [offset, review.reviews]);
  return (
    <>
      <Navbar />
      <header id="main-header" className="py-2 bg-danger text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-users" /> Bình Luận
              </h1>
            </div>
          </div>
        </div>
      </header>


      <section className="h-100 gradient-custom">
        <div className="container-full py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-10 col-xl-8">
              <div className="card" style={ { borderRadius: "10px" } }>
                <div className="card-header px-4 py-5">
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p
                      className="lead fw-normal mb-0"
                      style={ { color: "#a8729a" } }
                    >
                      Danh sách bình luận của sản phẩm
                    </p>
                    <p className="small text-muted mb-0">
                      ID : <b>{ id }</b>
                    </p>
                  </div>

                  { currentData && currentData.map((reviews) => (
                    <div
                      key={ reviews._id }
                      className="card shadow-0 border mb-4"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-3">
                            <p>Tên người bình luận</p>
                            <span>{ reviews.name }</span>
                          </div>
                          <div className="col-3">
                            <p>Nội dung bình luận</p>
                            <span>{ reviews.comment }</span>
                          </div>
                          <div className="col-3">
                            <p>
                              Đánh giá *
                            </p>
                            <Box>
                              <Rating
                                name="rating" size="small"
                                defaultValue={ reviews.rating }
                                readOnly
                              />
                            </Box>
                          </div>
                          <div className="col-3">
                            <p>
                              Ngày bình luận
                            </p>
                            <span>{ new Date(reviews.createdAt).toLocaleString() }</span>
                          </div>
                        </div>
                        <hr
                          className="mb-4"
                          style={ { backgroundColor: "#e0e0e0", opacity: 1 } }
                        />
                      </div>
                    </div>
                  )) }
                  <Paginator
                    totalRecords={ review.reviews.length }
                    pageLimit={ pageLimit }
                    pageNeighbours={ 2 }
                    setOffset={ setOffset }
                    currentPage={ currentPage }
                    setCurrentPage={ setCurrentPage }
                    pageContainerClass="mb-0 mt-0  d-flex justify-content-center align-items-center"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewById;