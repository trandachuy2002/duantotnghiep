import React from "react"
import Breadcrumb from "../components/Breadcrumb"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'

import 'swiper/components/pagination/pagination.min.css'
import "../../src/App.css";
// import { FreeMode, Pagination } from "swiper";
import SwiperCore, { Pagination } from 'swiper';
SwiperCore.use([Pagination]);

const About = () => {
  return (
    <>
      <Breadcrumb pageName="About" />

      <div className="site-section border-bottom" data-aos="fade">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-6">
              <div className="block-16">
                <figure>
                  <img
                    src="images/Baner/About.png"
                    alt="placeholder"
                    className="img-fluid rounded"
                  />
                  <a href="https://vimeo.com/channels/staffpicks/93951774" className="play-button popup-vimeo">
                  <span><iconify-icon icon="ion:caret-back-circle-outline" rotate="180deg"></iconify-icon></span>
                    <span className="ion-md-play"></span>
                  </a>
                </figure>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5">
              <div className="site-section-heading pt-3 mb-4">
                <h2 className="text-black ">Chúng tôi đã bắt đầu như thế nào?</h2>
              </div>
              <p>
                  - Trong thế giới ngày nay, nhiều người tiêu dùng nghĩ về mua sắm trực tuyến khi họ nghe thuật ngữ “bán lẻ”. 
                Trong khi các nhà bán lẻ nhỏ hơn đang tìm kiếm thành công trực tuyến, thì vẫn có thị trường cho các cửa hàng bán lẻ truyền thống. 
                Hầu hết các doanh nghiệp này cũng duy trì sự hiện diện trên web, nhưng có điều gì đó về trải nghiệm mua sắm trực tiếp không thể sao chép trực tuyến.
              </p>
              <p>
               - Một số nghiên cứu cho thấy rằng việc mua hàng tại cửa hàng không phải là quá khứ và bán lẻ trực tuyến và tại cửa hàng có thể cùng tồn tại.
               Nếu bạn quan tâm đến việc mở một doanh nghiệp bán lẻ, thì việc lập kế hoạch cho sự kiện là rất quan trọng. 
              Chúng tôi đã nói chuyện với các chuyên gia trong ngành để tìm hiểu thêm về cách mở một cửa hàng bán lẻ.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section border-bottom" data-aos="fade">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 site-section-heading text-center pt-4">
              <h2>TEAM MEN4MEN</h2>
            </div>
          </div>

          <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img src="images/Avatar/Tien.jpg" alt="placeholder" className="mb"/><p>Phạm Anh Tiến (Leader)</p></SwiperSlide>
        <SwiperSlide><img src="images/Avatar/Truyen.jpg" alt="placeholder" className="mb"/><p>Phan Ngọc Truyền (Developer)</p></SwiperSlide>
        <SwiperSlide><img src="images/Avatar/Dinh.jpg" alt="placeholder" className="mb"/><p>Phan Công Đỉnh (Developer)</p></SwiperSlide>
        <SwiperSlide><img src="images/Avatar/Huy.jpg" alt="placeholder" className="mb"/><p>Trần Đắc Huy (Developer)</p></SwiperSlide>
        <SwiperSlide><img src="images/Avatar/Chuong.jpg" alt="placeholder" className="mb"/><p>Huỳnh Quốc Chương (Developer)</p></SwiperSlide>
      </Swiper>
        </div>
      </div>

      <div
        className="site-section site-section-sm site-blocks-1 border-0"
        data-aos="fade"
      >
        <div className="container">
          <div className="row">
            <div
              className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4"
              data-aos="fade-up"
              data-aos-delay=""
            >
              <div className="icon mr-4 align-self-start">
                <span className="icon-truck"></span>
              </div>
              <div className="text">
                <h2 className="text-uppercase">Miễn Phí Vận Chuyển</h2>
                <p>
                  Shop sẽ hỗ trợ giao sản phẩm cho các đơn hàng trên 500k và các đơn hàng mua lần đầu tại shop .
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="icon mr-4 align-self-start">
                <span className="icon-refresh2"></span>
              </div>
              <div className="text">
                <h2 className="text-uppercase">MIỄN PHÍ HOÀN TRẢ </h2>
                <p>
                  Theo các điều lệ được quy định trong Điều khoản dịch vụ, Shop đảm
                  bảo quyền lợi của Người mua .
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="icon mr-4 align-self-start">
                <span className="icon-help"></span>
              </div>
              <div className="text">
                <h2 className="text-uppercase">HỖ TRỢ KHÁCH HÀNG</h2>
                <p>
                  Hỗ trợ 24/7 bất cứ lúc nào mà khách hàng cần hỗ trợ :
                  Luôn đáp ứng các câu hỏi và thắc mắc của khách hàng 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
