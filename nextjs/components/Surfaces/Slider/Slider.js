import React from "react"
import PropTypes from "prop-types"

import "./Slider.scss"

import SwiperCore, { Pagination, Lazy } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

SwiperCore.use([Pagination, Lazy])

const Slider = ({ children, visibleHiddenSlides, pagination }) => {
  const slides = []

  children.forEach((item, key) => {
    slides.push(
      <SwiperSlide
        key={key}
      >
        {item}
      </SwiperSlide>
    )
  })

  if(slides.length === 0) return null

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
      {slides}
    </Swiper>
  )
}

Slider.propTypes = {
  pagination: PropTypes.bool,
  visibleHiddenSlides: PropTypes.bool
}

export default Slider
