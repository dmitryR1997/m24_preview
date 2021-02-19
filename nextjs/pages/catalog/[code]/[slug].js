import React, { useEffect, useState } from "react"
import {useRouter} from "next/router";

import { fetchProduct } from "@api/product"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import Amount from "@components/Display/Amount"
import Slider from "@components/Surfaces/Slider"
import AddToCart from "@components/Utils/AddToCart"
import Accordion from "@components/Surfaces/Accordion"
import { Tabs, Tab } from "@components/Surfaces/Tabs/Tabs"
import ReviewCard from "@components/Cards/Review"
import ProductParamsList from "@components/Utils/ProductParamsList/ProductParamsList"
import Alert from "@components/Display/Alert"
import Button from "@components/Forms/Button"

import OfficialWaranty from "@screens/OfficialWaranty"
import FiveReasons from "@screens/FiveReasons"
import ExpertsHelp from "@screens/ExpertsHelp"
import VideoReviews from "@screens/VideoReviews"

import "@styles/pages/product.scss"

const ProductPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const [details, setDetails] = useState({})

  useEffect(() => {
    if(!slug) return

    fetchProduct(slug).then(response => {
      setDetails(response.data)
    })
  }, [slug])

  return (
    <Layout productPage>
      <div className="single-product">
        {details.id &&
          <>
            <div className="single-product__header">
              <Container
                disablePadding
              >
                <div className="single-product__header-inner">
                  <div className="single-product__header-category">
                    {details.category}
                  </div>

                  <div className="single-product__header-name">
                    {details.name}
                  </div>

                  {details.images && details.images.length > 0
                    ? <div className="single-product__header-slider">
                        <Slider
                          pagination
                        >
                          {details.images.map((image, key) => (
                            <img key={key} src={image} alt="Product Image"/>
                          ))}
                        </Slider>
                      </div>
                    : <div className="single-product__image-none">
                        <img src="/images/image-not-found.svg" alt="Product Image None"/>
                      </div>
                  }

                  {details.brand &&
                    <div className="single-product__header-brand">
                      <img src={details.brand} alt="Brand Image"/>
                    </div>
                  }
                </div>
              </Container>
            </div>

            <Container classes={["single-product__purchase"]}>
              <div className="single-product__purchase-left">
                <div className="single-product__credit-price">
                  134 800 ₽/мес. в рассрочку
                </div>
                {details.discount_price &&
                <div className="single-product__old-price">
                  Цена <strike><Amount amount={details.discount_price}/></strike>
                </div>
                }
                <div className="single-product__current-price">
                  <Amount amount={details.price}/>
                </div>
              </div>

              <div className="single-product__purchase-right">
                <AddToCart/>
              </div>
            </Container>

            <Container classes={["single-product__info"]}>
              <div className="single-product__info-item">
                <div className="single-product__info-item-label">
                  Наличие
                </div>
                <div className="single-product__info-item-value">
                  На складе
                </div>
              </div>
              <div className="single-product__info-item">
                <div className="single-product__info-item-label">
                  Доставка
                </div>
                <div className="single-product__info-item-value">
                  Завтра
                </div>
              </div>
              <div className="single-product__info-item">
                <div className="single-product__info-item-label">
                  Продано
                </div>
                <div className="single-product__info-item-value">
                  18 штук
                </div>
              </div>
            </Container>

            <Container classes={["single-product__video-reviews"]}>
              <VideoReviews params={{ product_id: details.id }} hideHeader={true}/>
            </Container>

            <Container>
              <Tabs>
                <Tab id={1} label="Описание">
                  {details.detail_text && details.detail_text.length > 0 &&
                    <div className="single-product__description">
                      <Accordion>
                        {details.detail_text.map((p, key) => {
                          const container = document.createElement("div")
                          container.innerHTML = p
                          const label = container.querySelector("h2")
                          if (label) label.parentElement.removeChild(label)

                          return (
                            <div
                              key={key}
                              id={`tab-${key}`}
                              label={label.innerHTML}
                              open={label.classList.contains("open")}
                            >
                              <div dangerouslySetInnerHTML={{ __html: container.innerHTML }}/>
                            </div>
                          )
                        })}
                      </Accordion>
                    </div>
                  }
                </Tab>

                <Tab id={2} label="Характеристики">
                  <ProductParamsList params={details.properties}/>

                  <div className="single-product__tab-alert">
                    <Alert
                      mode="warning"
                      text="Цвет, ткань и форма массажных элементов могут быть изменены на усмотрение производителя"
                    />
                  </div>

                  <Accordion>
                    <div
                      id="tab-1"
                      label="Виды массажа"
                    >
                      {details.types_massage &&
                        <div className="single-product__advant-list">
                          {details.types_massage.map((type, key) => (
                            <div key={key} className="single-product__advant-list-item">
                              <img src="https://massagery24.ru/upload/pictovar/119.png" alt="Icon"/>
                              {type}
                            </div>
                          ))}
                        </div>
                      }
                    </div>
                  </Accordion>
                </Tab>

                <Tab id={3} label="Отзывы">
                  {details.reviews && details.reviews.length &&
                  <div className="single-product__review-list">
                    {details.reviews.map((review, key) => (
                      <div
                        key={key}
                        className="single-product__review-list-item"
                      >
                        <ReviewCard review={review}/>
                      </div>
                    ))}
                  </div>
                  }

                  <div className="single-product__review-nav">
                    <Button
                      label="Показать ещё"
                      size="xs"
                      outline
                    />
                  </div>

                  <div className="single-product__review-total">
                    Всего 873 моделей
                  </div>

                </Tab>
              </Tabs>
            </Container>

            <div className="single-product__five-reasons">
              <Container>
                <FiveReasons/>
              </Container>
            </div>

            <div className="single-product__official-waranty">
              <OfficialWaranty/>
            </div>

            <div className="single-product__experts-help">
              <ExpertsHelp hideText/>
            </div>
          </>
        }
      </div>
    </Layout>
  )
}

export default ProductPage
