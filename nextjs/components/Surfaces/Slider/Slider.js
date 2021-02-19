import React from "react"
import PropTypes from "prop-types"

import "./Slider.scss"

import SwiperCore, { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

SwiperCore.use([Pagination])

const Slider = ({ children, visibleHiddenSlides, pagination }) => {
  return (
    <Swiper
      className={`${visibleHiddenSlides ? "swiper-container--visible-hidden-slides" : ""} ${pagination ? "swiper-container--with-pagination" : ""}`}
      {...
        {
          observer: "true",
          slidesPerView: "auto",
          spaceBetween: 24,
          pagination: pagination ? { clickable: true } : false
        }
      }
    >
      {children.map((item, key) => (
        <SwiperSlide
          key={key}
        >
          {item}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

Slider.propTypes = {
  pagination: PropTypes.bool,
  visibleHiddenSlides: PropTypes.bool
}

export default Slider
