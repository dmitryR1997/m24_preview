import React, { useState, useEffect } from "react"

import {fetchCategories} from "@api/category";

import Container from "@components/Layout/Container"
import SectionHeader from "@components/Display/SectionHeader"
import Slider from "@components/Surfaces/Slider"
import SliderProductCard from "@components/Cards/SliderProduct"

import "./CatalogSlider.scss"

const CatalogSlider = () => {
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories().then(({ data }) => {
      setCategories(data)
    })
  }, [])

  useEffect(() => {
    if (!categories) return

    const countTotal = categories.reduce((prev, cur) => {
      return parseInt(prev) + parseInt(cur.COUNT)
    }, 0)

    setTotal(countTotal)
  }, [categories])

  return (
    <section className="catalog-slider">
      <Container>
        <div className="catalog-slider__header">
          <SectionHeader
            title="Огромный ассортимент"
            description={`${total} наименований`}
          />
        </div>

        <Slider
          visibleHiddenSlides
          pagination
        >
          {categories.map((category, key) => {
            const data = {
              type: `${category.COUNT} товаров`,
              title: category.NAME,
              image: category.PICTURE
            }

            return (<SliderProductCard
              key={key}
              product={data}
              link={`/catalog/${category.CODE}`}
              xsHeight
            />)
          })}
        </Slider>
      </Container>
    </section>
  )
}

export default CatalogSlider
