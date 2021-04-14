import React from "react"
import PropTypes from "prop-types"

import "./Slider.scss"

import SwiperCore, {Pagination, Lazy, Controller} from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

SwiperCore.use([Pagination, Lazy, Controller])

const Slider = ({ children, visibleHiddenSlides, pagination, slidesPerView, controller, setController }) => {
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
          slidesPerView: slidesPerView ? slidesPerView : "auto",
          spaceBetween: 24,
          pagination: pagination ? { clickable: true } : false,
          controller: controller ? { control: controller } : false,
          onSwiper: setController ? setController : false
        }
      }
    >
      {slides}
    </Swiper>
  )
}

Slider.propTypes = {
  pagination: PropTypes.bool,
  visibleHiddenSlides: PropTypes.bool,
  slidesPerView: PropTypes.number
}

export default Slider
