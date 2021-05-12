import { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Controller, Pagination, Navigation } from "swiper"

import { connect, useDispatch } from "react-redux"
import { fetchCompare, fetchProducts } from "@api/product"
import { fetchCategories } from "@api/category"
import { removeFromCompare } from "@actions/compare"

import Layout from "@components/Layout/Layout"
import CatalogProduct from "@components/Cards/CatalogProduct"

import "@styles/pages/ComparePage.scss"
import "@components/Surfaces/Slider/Slider.scss"

import CloseIcon from "../../public/icons/close.svg"

SwiperCore.use([Pagination, Controller, Navigation])

const CartPage = ({ compareListIds, categories }) => {
  const dispatch = useDispatch()
  const compareListRef = useRef()
  const [products, setProducts] = useState([])
  const [compareList, setCompareList] = useState([])
  const [loaded, setLoaded] = useState(false)

  const [firstSwiper, setFirstSwiper] = useState(null)
  const [secondSwiper, setSecondSwiper] = useState(null)

  useEffect(() => {
    if(compareListIds.length === 0) return

    fetchProducts({ ids: compareListIds.map(item => item.id) }).then(({ data }) => {
      setProducts(data.data)
    })

    fetchCompare({ ids: compareListIds.map(item => item.id) }).then(({ data }) => {
      setCompareList(data)
      setLoaded(true)
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

    const titles = compareListRef.current.querySelectorAll(".compare-page__compare-titles-item")

    titles.forEach((li, inner) => {
      li.style.height = `${rowHeight[inner]}px`;
    })


    const stickyElements = document.querySelectorAll(".js-sticky-element")

    const observer = new IntersectionObserver(
      ([e]) => {
        e.target.parentElement.classList.toggle("is-pinned", e.intersectionRatio < 1)
      },
      {threshold: [1]}
    )

    if(stickyElements) {
      stickyElements.forEach(el => observer.observe(el))
    }
  }, [compareList])

  useEffect(() => {
    const oldIds = products.map(product => product.id)
    const currentIds = compareListIds.map(id => id.id)

    const difference = oldIds.filter(id => !currentIds.includes(id))

    const transformProducts = products.filter(product => !difference.includes(product.id))
    const transformCompareList = compareList.filter(list => !difference.includes(list.product_id))

    setProducts(transformProducts)
    setCompareList(transformCompareList)
  }, [compareListIds])

  return (
    <Layout categories={categories} isOverflowInitial={true}>
      <div className="compare-page">
        <div className="container">
          <h1 className="compare-page__title">
            Сравнение
          </h1>

          {compareListIds.length === 0 &&
          <div className="compare-page__empty-list">
            Ваш список сравнений пуст
          </div>
          }
        </div>

        {compareListIds.length > 0 &&
          <>
            <div className="compare-page__list">
              <div className="container">
                <Swiper
                  className="swiper-container--visible-hidden-slides swiper-container--with-pagination"
                  spaceBetween={24}
                  slidesPerView={2}
                  onSwiper={setFirstSwiper}
                  controller={{ control: secondSwiper }}
                  pagination={{ clickable: true }}
                  navigation
                >
                  {products.map((product, key) => {
                    return (
                      <SwiperSlide key={key}>
                        <div className="compare-page__list-item">
                          <div className="compare-page__list-item-close" onClick={() => dispatch(removeFromCompare(product.id))}>
                            <CloseIcon/>
                          </div>
                          <CatalogProduct
                            product={product}
                            size="xs"
                          />
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            </div>

            <div className="container">
              <div ref={compareListRef} className="compare-page__compare">
                <Swiper
                  spaceBetween={24}
                  slidesPerView={2}
                  onSwiper={setSecondSwiper}
                  controller={{control: firstSwiper}}
                >
                  {compareList.map((list, key) => {
                    return (
                      <SwiperSlide key={key}>
                        <div className="compare-page__compare-values">
                          <div className="compare-page__compare-values-item">
                            <div
                              className="compare-page__compare-values-item-label compare-page__compare-values-item-label--title">
                              Общие параметры
                            </div>
                          </div>
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

                          {list["lists"].map((item, key) => (
                            <React.Fragment key={key}>
                              <div className="compare-page__compare-values-item">
                                <div
                                  className="compare-page__compare-values-item-label compare-page__compare-values-item-label--title">
                                  {item.name}
                                </div>
                              </div>

                              {Object.keys(item.value).map((value, inner) => (
                                <div key={inner} className="compare-page__compare-values-item">
                                  <div className="compare-page__compare-values-item-label">
                                    {item.value[inner].label}
                                  </div>
                                  <div className="compare-page__compare-values-item-value">
                                    {item.value[inner].value ? "Да" : "Нет"}
                                  </div>
                                </div>
                              ))}
                            </React.Fragment>
                          ))}
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>

                {compareList[0] &&
                <div className="compare-page__compare-titles">
                  <div className="sticky">
                    <div className="compare-page__compare-titles-item compare-page__compare-titles-item--title">
                      <div className="js-sticky-element"/>
                      <span>Общие параметры</span>
                    </div>

                    {compareList[0]["general"].map((item, inner) => (
                      <div key={inner} className="compare-page__compare-titles-item">
                        {item.name}
                      </div>
                    ))}
                  </div>

                  {compareList[0]["lists"].map((item, key) => (
                    <div key={key} className="sticky">
                      <div className="compare-page__compare-titles-item compare-page__compare-titles-item--title">
                        <div className="js-sticky-element"/>
                        <span>{item.name}</span>
                      </div>
                      {Object.keys(item.value).map((value, inner) => (
                        <div key={inner} className="compare-page__compare-titles-item">
                          {item.value[inner].label}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                }
              </div>
            </div>
          </>
        }
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
