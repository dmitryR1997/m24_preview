import React, { useEffect, useState } from "react"
import { Fade } from "react-awesome-reveal"

import Slider from "@components/Surfaces/Slider"
import Container from "@components/Layout/Container"
import SliderProductCard from "@components/Cards/SliderProduct"

import api from "@api/index"

import "./NewProductsSlider.scss"

const NewProductsSlider = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.get("https://dev.massagery24.ru/api/slider/list.php").then((response) => {
      setProducts(response.data)
    })
  }, [])

  return (
    <section className="new-products-slider">
      <Fade delay={600} triggerOnce>
        <Container>
          <Slider
            visibleHiddenSlides
            pagination
          >
            {products.map((product, key) => (
              <SliderProductCard
                key={key}
                product={product}
              />
            ))}
          </Slider>
        </Container>
      </Fade>
    </section>
  )
}

export default NewProductsSlider
