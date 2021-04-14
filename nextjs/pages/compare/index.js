import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import SwiperCore, { Controller } from 'swiper';

import { connect } from "react-redux"
import { fetchCompare, fetchProducts } from "@api/product"
import { fetchCategories } from "@api/category"

import Layout from "@components/Layout/Layout"
import Slider from "@components/Surfaces/Slider"
import CatalogProduct from "@components/Cards/CatalogProduct"

import "@styles/pages/ComparePage.scss"

const CartPage = ({ compareListIds, categories }) => {
  const compareListRef = useRef()
  const [products, setProducts] = useState([])
  const [compareList, setCompareList] = useState([])
  const [controlledSwiper, setControlledSwiper] = useState(null);

  useEffect(() => {
    fetchProducts({ ids: compareListIds.map(item => item.id) }).then(({ data }) => {
      setProducts(data.data)
    })

    fetchCompare({ ids: compareListIds.map(item => item.id) }).then(({ data }) => {
      setCompareList(data)
    })
  }, [])

  useEffect(() => {
    if(!compareListRef.current) return

    const lists = compareListRef.current.querySelectorAll(".compare-page__compare-values")
    const matrix = []

    lists.forEach((list, key) => {
      list.childNodes.forEach((li, inner) => {
        if(!Array.isArray(matrix[inner])) {
          matrix[inner] = []
        }

        matrix[inner][key] = li.getBoundingClientRect().height;
      })
    })

    const rowHeight = matrix.map(item => {
      let height = 0

      item.forEach(inner => {
        height = inner > height ? inner : height
      })

      return  height
    })

    lists.forEach((list, key) => {
      list.childNodes.forEach((li, inner) => {
        li.style.height = `${rowHeight[inner]}px`;
      })
    })

    const titles = compareListRef.current.querySelectorAll(".compare-page__compare-titles")

    titles.forEach((list, key) => {
      list.childNodes.forEach((li, inner) => {
        li.style.height = `${rowHeight[inner]}px`;
      })
    })
  }, [compareList])

  return (
    <Layout categories={categories}>
      <div className="compare-page">
        <div className="container">
          <h1 className="compare-page__title">
            Сравнение
          </h1>

          <div className="compare-page__list">
            <Slider
              slidesPerView={2}
              controller={controlledSwiper}
            >
              {products.map((product, key) => {
                return (
                  <div key={key} className="compare-page__list-item">
                    <CatalogProduct
                      product={product}
                      size="xs"
                    />
                  </div>
                )
              })}
            </Slider>

            <div ref={compareListRef} className="compare-page__compare">
              <Slider
                slidesPerView={2}
                setController={setControlledSwiper}
              >
                {compareList.map((list, key) => {
                  return (
                    <div key={key} className="compare-page__compare-values">
                      {list["general"].map((item, inner) => (
                        <div key={inner} className="compare-page__compare-values-item">
                          <div className="compare-page__compare-values-item-label">
                            {item.name}
                          </div>
                          <div className="compare-page__compare-values-item-value">
                            {item.value ? item.value : "—"}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </Slider>

              {compareList[0] &&
              <div className="compare-page__compare-titles">
                {compareList[0]["general"].map((item, inner) => (
                  <div key={inner} className="compare-page__compare-titles-item">
                    {item.name}
                  </div>
                ))}
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

CartPage.propTypes = {
  compareListIds: PropTypes.array.isRequired
}

const mapStateToolProps = state => {
  return {
    compareListIds: state.compare.list,
  }
}

export async function getStaticProps({ params }) {
  const categories = await fetchCategories()

  return {
    props: {
      categories: categories.data
    }
  }
}

export default connect(mapStateToolProps)(CartPage)
