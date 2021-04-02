import React, { useEffect, useState } from "react"
import { Fade } from "react-awesome-reveal"

import Slider from "@components/Surfaces/Slider"
import Container from "@components/Layout/Container"
import SliderProductCard from "@components/Cards/SliderProduct"

import api from "@api/index"

import "./NewProductsSlider.scss"
import Banner from "@components/Cards/Banner/Banner"

const NewProductsSlider = ({ slides }) => {
  return (
    <section className="new-products-slider">
      <Container>
        <Slider
          visibleHiddenSlides
          pagination
        >
          {slides.map((slide, key) => (
            slide.view === "product" ?
              <SliderProductCard
                key={key}
                product={product}
              /> :
              <Banner
                key={key}
                type={slide.type}
                title={slide.title}
                description={slide.title_second}
                image={slide.image}
                view={slide.view}
                link={slide.link}
              />
          ))}
        </Slider>
      </Container>
    </section>
  )
}

export default NewProductsSlider
