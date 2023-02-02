import React from 'react'
import { multilanguage } from 'redux-multilanguage';
import FeaturedProducts from '../components/FeaturedProducts'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import "../../src/App.css";
import SwiperCore, { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import { Link } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

const Home = ({ strings }) => {
  return (
    <>
      <Swiper
        loop={ true }
        autoplay={ {
          delay: 4000,
          disableOnInteraction: false
        } }
        effect='fade'
        fadeEffect={ {
          crossFade: true
        } }
        navigation
        pagination={ { clickable: true } }
        onSwiper={ (swiper) => console.log(swiper) }
        onSlideChange={ () => console.log('slide change') }
      >
        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner1.png" alt="" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner2.png" alt="" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner3.png" alt="" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner4.png" alt="" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner5.png" alt="" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner6.png" alt="" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner7.png" alt="" />
          </Link>
        </SwiperSlide>
      </Swiper>

      <div className="site-section site-section-sm site-blocks-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="list-box d-flex align-items-center">
                <div className="list-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <div className="content">
                  <h3>{ strings["FREE_SHIPPING"] }</h3>
                  <p>{ strings["Shop_Will_Support_Product_Delivery_For_Orders_Over_500000_VND_And_First_Time_Purchase_Orders_At_The_Shop"] }</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="list-box d-flex align-items-center">
                <div className="list-icon">
                  <i className="icon-refresh2"></i>
                </div>
                <div className="content">
                  <h3>{ strings["FREE_REFUND"] }</h3>
                  <p>{ strings["According_to_the_terms_set_forth_in_the_Terms_of_Service_the_Shop_guarantees_the_interests_of_the_buyer"] }</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="list-box d-flex justify-content-start align-items-center">
                <div className="list-icon">
                  <i className="icon-help"></i>
                </div>
                <div className="content">
                  <h3>{ strings["CUSTOMER_SUPPORT"] }</h3>
                  <p>{ strings["24/7_Support_Anytime_Customer_Needs_Support_Responding_to_Customer_Questions_and_Inquiries"] }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section site-blocks-2">
        <div className="container">
          <div className="row">
            <div
              className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0"
              data-aos="fade"
              data-aos-delay=""
            >
              <Link className="block-2-item" to={ "/shop" }>
                <figure className="image">
                  <img src="images/Avatar/thun.png" alt="" className="img-fluid" />
                </figure>
                <div className="text">
                  <span className="text-uppercase">{ strings["Trending"] }</span>
                  <h3>{ strings["Dynamic"] }</h3>
                </div>
              </Link>
            </div>
            <div
              className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0"
              data-aos="fade"
              data-aos-delay="100"
            >
              <Link className="block-2-item" to={ "/shop" }>
                <figure className="image">
                  <img src="images/Avatar/khoac.png" alt="" className="img-fluid" />
                </figure>
                <div className="text">
                  <span className="text-uppercase">{ strings["Trending"] }</span>
                  <h3>{ strings["Personalities"] }</h3>
                </div>
              </Link>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="200">
              <Link className="block-2-item" to={ "/shop" }>
                <figure className="image">
                  <img src="images/Avatar/polo.png" alt="" className="img-fluid" />
                </figure>
                <div className="text">
                  <span className="text-uppercase">{ strings["Trending"] }</span>
                  <h3>{ strings["Enthusiasm"] }</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FeaturedProducts />
      <div className="site-section block-8">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 site-section-heading text-center pt-4">
              <h2>{ strings["Brand_Cooperation"] }</h2>
            </div>
          </div>
          <Swiper watchSlidesProgress={ true } slidesPerView={ 4 } className="mySwiper">
            <SwiperSlide><img src="images/Logo/3.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="images/Logo/4.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="images/Logo/5.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="images/Logo/1.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="images/Logo/2.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="images/Logo/3.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="images/Logo/4.png" alt="" /></SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default multilanguage(Home);

