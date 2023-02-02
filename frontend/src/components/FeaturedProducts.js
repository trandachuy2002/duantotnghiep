import { Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import CategoryContext from "../context/category/categoryContext";
import productContext from "../context/product/productContext";
import usePagination from "../helpers/Pagination";
// import { Pagination } from "@material-ui/lab";
import { useToasts } from "react-toast-notifications";


import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import "../../src/index.css";
import { Pagination, Navigation } from "swiper";
import { multilanguage } from "redux-multilanguage";




const FeaturedProducts = ({ strings }) => {
  const pContext = useContext(productContext);
  const { getProducts, products } = pContext;
  // for category context
  const cContext = useContext(CategoryContext);
  const { getCategories } = cContext;

  const [skip, setSkip] = useState(0);
  const [keyWord, setKeyWord] = useState("");
  const [category, setCategory] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { addToast } = useToasts();
  const limit = 3;

  // const [page, setPage] = useState(1);
  // const PER_PAGE = 3;
  // const count = Math.ceil(products.length / PER_PAGE);
  // const data = usePagination(products, PER_PAGE);

  // const handleChange = (e, p) => {
  //   setPage(p);
  //   data.jump(p);
  // };
  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getProducts(skip, keyWord, category));
    };
    populateProducts();
    getCategories();
    // eslint-disable-next-line
  }, [skip, category]);

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return (
    <div>
      <div className="col-md-7 site-section-heading text-center pt-4">
        <h2>{ strings["Featured_products"] }</h2>
      </div>
      <Swiper
        slidesPerView={ 1 }
        spaceBetween={ 3 }
        pagination={ {
          clickable: true,
        } }
        breakpoints={ {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        } }
        modules={ [Pagination] }
        className="mySwiper"
      >
        {
          products.map((product) => (
            <>
              { product.ratings >= 3 ? (
                <>
                  <SwiperSlide>
                    <div className="block-4 text-center border" key={ product._id }>
                      <div className="product-img">
                        <Link to={ `/shopSingle/${product._id}` }>
                          <img src={ product.image } alt="" />
                        </Link>
                        <Link to={ `/cart` }>
                          <div>
                            <button class="icon btn" onClick={ () => {
                              let item = { ...product, id: product._id, }; if (addToast) {
                                addToast(`${strings["Added_to_cart"]}`, { appearance: "success", autoDismiss: true });
                              }
                              addItem(item, quantity);
                            } }
                              disabled={ product.Stock <= 0 } >{ product.Stock <= 0 ? `${strings["Out_of_stock"]}` : `${strings["Buy_now"]}` }
                            </button>
                          </div>
                        </Link>
                      </div>
                      <div className="block-4-text p-4">
                        <p id="name"><Link to={ `/shopSingle/${product._id}` }>{ product.name }</Link></p>
                        <p className="text-black font-weight-bold"><Rating name="half-rating-read" defaultValue={ product.ratings } precision={ 0.5 } readOnly /></p>
                        <p id="price">{ formatter.format(product.price) }</p>
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              ) : "" }
            </>
          )
          ) }
      </Swiper>
    </div>
  );
};

export default multilanguage(FeaturedProducts);
