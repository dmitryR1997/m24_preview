import React, { useEffect, useState } from "react"
import { Fade } from "react-awesome-reveal"

import Slider from "@components/Surfaces/Slider"
import Container from "@components/Layout/Container"
import SliderProductCard from "@components/Cards/SliderProduct"

import api from "@api/index"

import "./NewProductsSlider.scss"
import Banner from "@components/Cards/Banner/Banner";

const NewProductsSlider = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.get("https://dev.massagery24.ru/api/slider/list.php").then((response) => {
      setProducts(response.data)
    })
  }, [])

  return (
    <section className="new-products-slider">
      <Container>
        <Slider
          visibleHiddenSlides
          pagination
        >
          {products.map((product, key) => (
            product.view === "product" ?
              <SliderProductCard
                key={key}
                product={product}
              /> :
              <Banner
                key={key}
                type={product.type}
                title={product.title}
                description={product.title_second}
                image={product.image}
              />
          ))}
        </Slider>
      </Container>
    </section>
  )
}

export default NewProductsSlider
