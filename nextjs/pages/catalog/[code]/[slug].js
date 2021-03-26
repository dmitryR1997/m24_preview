import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import num_word from "@utils/NumWord"

import { fetchProduct } from "@api/product"
import { fetchSeo } from "@api/seo"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import Amount from "@components/Display/Amount"
import Slider from "@components/Surfaces/Slider"
import AddToCart from "@components/Utils/AddToCart"
import Accordion from "@components/Surfaces/Accordion"
import { Tabs, Tab } from "@components/Surfaces/Tabs/Tabs"
import ProductParamsList from "@components/Utils/ProductParamsList/ProductParamsList"
import Alert from "@components/Display/Alert"

import OfficialWaranty from "@screens/OfficialWaranty"
import FiveReasons from "@screens/FiveReasons"
import ExpertsHelp from "@screens/ExpertsHelp"
import VideoReviews from "@screens/VideoReviews"

import "@styles/pages/product.scss"
import {fetchCategories} from "@api/category";

const ProductPage = ({ categories }) => {
  const router = useRouter()
  const { code, slug } = router.query

  const [details, setDetails] = useState({})

  useEffect(() => {
    if(!slug) return

    fetchProduct(slug).then(({ data }) => {
      setDetails(data)
    })
  }, [slug])

  return (
    <Layout pageType="product" categories={categories}>
      <div className="single-product">
        {details.id &&
          <>
            <Head>
              <title>{details.seo_title}</title>
              <meta name="description" content={details.seo_description} />
              <meta name="keywords" content={details.seo_keywords} />
            </Head>

            <input type="hidden" className="gtm-product-id" value={details.id} />
            <input type="hidden" className="gtm-product-price" value={details.price} />

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
                {details.credit_line &&
                  <div className="single-product__credit-price">
                    <Amount
                      amount={parseInt((details.price / 12).toFixed(0))}
                      text=" / мес. в рассрочку"
                    />
                  </div>
                }

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
                <AddToCart product={details} />
              </div>
            </Container>

            <Container classes={["single-product__info"]}>
              <div className="single-product__info-item">
                <div className="single-product__info-item-label">
                  Наличие
                </div>
                <div className="single-product__info-item-value">
                  { details.quantity > 0 ? "На складе" : "Под заказ" }
                </div>
              </div>
              <div className="single-product__info-item">
                <div className="single-product__info-item-label">
                  Доставка
                </div>
                <div className="single-product__info-item-value">
                  { details.quantity > 0 ? "1-2 дня" : "-" }
                </div>
              </div>
              <div className="single-product__info-item">
                <div className="single-product__info-item-label">
                  Продано
                </div>
                <div className="single-product__info-item-value">
                  {details.sale_count}

                  { num_word(details.sale_count, [" штука", " штуки", " штук"]) }
                </div>
              </div>
            </Container>

            <Container classes={["single-product__video-reviews"]}>
              <VideoReviews
                gallery={details.gallery}
                params={{ product_id: details.id }}
                hideHeader={true}
                hideTags={true}
                hideCatalogLink={true}
              />
            </Container>

            <Container>
              <Tabs>
                <Tab id={1} label="Описание">
                  {details.detail_text && details.detail_text.length > 0 &&
                    <div className="single-product__description typography">
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
                      open={true}
                    >
                      {details.types_massage &&
                        <div className="single-product__advant-list">
                          {details.types_massage.map((type, key) => (
                            <div key={key} className="single-product__advant-list-item">
                              <div className="single-product__advant-list-item-icon">
                                <img src={`/icons/types_massage/${type.icon}.png`} alt="Icon"/>
                              </div>
                              {type.title}
                            </div>
                          ))}
                        </div>
                      }
                    </div>
                  </Accordion>
                </Tab>

                {/*<Tab id={3} label="Отзывы">*/}
                {/*  {details.reviews && details.reviews.length &&*/}
                {/*  <div className="single-product__review-list">*/}
                {/*    {details.reviews.map((review, key) => (*/}
                {/*      <div*/}
                {/*        key={key}*/}
                {/*        className="single-product__review-list-item"*/}
                {/*      >*/}
                {/*        <ReviewCard review={review}/>*/}
                {/*      </div>*/}
                {/*    ))}*/}
                {/*  </div>*/}
                {/*  }*/}

                {/*  <div className="single-product__review-nav">*/}
                {/*    <Button*/}
                {/*      label="Показать ещё"*/}
                {/*      size="xs"*/}
                {/*      outline*/}
                {/*    />*/}
                {/*  </div>*/}

                {/*  <div className="single-product__review-total">*/}
                {/*    Всего 873 моделей*/}
                {/*  </div>*/}

                {/*</Tab>*/}
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

export async function getServerSideProps({ params }) {
  const categories = await fetchCategories()

  return {
    props: {
      categories: categories.data
    }
  }
}

export default ProductPage
