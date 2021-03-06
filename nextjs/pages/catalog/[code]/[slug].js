import Head from "next/head"
import Link from "next/link"

import { fetchCategories } from "@api/category"
import { fetchProduct } from "@api/product"

import { isServer } from "../../../env"

import Layout from "@components/Layout/Layout"
import Amount from "@components/Display/Amount"
import Slider from "@components/Surfaces/Slider"
import AddToCart from "@components/Utils/AddToCart"
import Accordion from "@components/Surfaces/Accordion"
import { Tabs, Tab } from "@components/Surfaces/Tabs/Tabs"
import ProductParamsList from "@components/Utils/ProductParamsList/ProductParamsList"
import Alert from "@components/Display/Alert"
import ReviewCard from "@components/Cards/Review"

import FiveReasons from "@screens/FiveReasons"
import ExpertsHelp from "@screens/ExpertsHelp"
import VideoReviews from "@screens/VideoReviews"

import num_word from "@utils/NumWord"

const ProductPage = ({ categories, details }) => {
  return (
    <Layout pageType="product" categories={categories}>
      <div className="single-product">
        <Head>
          <title>{details.seo_title}</title>
          <meta name="description" content={details.seo_description} />
          <meta name="keywords" content={details.seo_keywords} />
        </Head>

        <input type="hidden" className="gtm-product-id" value={details.old_id} />
        <input type="hidden" className="gtm-product-price" value={details.price} />

        <div className="single-product__header">
          <div className="container container--no-padding">
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
          </div>
        </div>

        <div className="container single-product__purchase">
          <div className="single-product__purchase-left">
            {details.credit_line &&
              <Link href={`/getcredit/${details.code}`}>
                <div className="single-product__credit-price">
                  <Amount
                    amount={parseInt((details.price / 12).toFixed(0))}
                    text=" / ??????. ?? ??????????????????"
                  />
                </div>
              </Link>
            }

            {details.discount_price > 0 &&
            <div className="single-product__old-price">
              ???????? <strike><Amount amount={details.price}/></strike>
            </div>
            }

            <div className="single-product__current-price">
              <Amount amount={details.discount_price > 0 ? details.discount_price : details.price}/>
            </div>
          </div>

          <div className="single-product__purchase-right">
            <AddToCart product={details} />
          </div>
        </div>

        <div className="container single-product__info">
          <div className="single-product__info-item">
            <div className="single-product__info-item-label">
              ??????????????
            </div>
            <div className="single-product__info-item-value">
              { (details.quantity > 0) || (details.can_buy_zero === "Y") ? "???? ????????????" : "?????? ??????????" }
            </div>
          </div>

          <div className="single-product__info-item">
            <div className="single-product__info-item-label">
              ????????????????
            </div>
            <div className="single-product__info-item-value">
              { details.quantity > 0 ? "1-2 ??????" : "-" }
            </div>
          </div>

          <div className="single-product__info-item">
            <div className="single-product__info-item-label">
              ??????????????
            </div>
            <div className="single-product__info-item-value">
              {details.sale_count}

              { num_word(details.sale_count, [" ??????????", " ??????????", " ????????"]) }
            </div>
          </div>
        </div>

        <div className="container single-product__video-reviews">
          <VideoReviews
            gallery={details.gallery}
            params={{ product_id: details.id }}
            hideHeader={true}
            hideTags={true}
            hideCatalogLink={true}
          />
        </div>

        <div className="container">
          <Tabs>
            <Tab id={1} label="????????????????">
              {details.detail_text && details.detail_text.length > 0 && details.detail_text[0] !== "" && !isServer &&
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

            <Tab id={2} label="????????????????????????????">
              {details.properties &&
              <ProductParamsList params={details.properties}/>
              }

              <div className="single-product__tab-alert">
                <Alert
                  mode="warning"
                  text="????????, ?????????? ?? ?????????? ?????????????????? ?????????????????? ?????????? ???????? ???????????????? ???? ???????????????????? ??????????????????????????"
                />
              </div>

              {details.features &&
              <Accordion>
                {Object.keys(details.features).map((feature, key) => (
                  <div
                    id={`tab-${key}`}
                    label={details.features[feature].name}
                    open={true}
                  >
                    <div className="single-product__advant-list">
                      {details.features[feature].elements.map((element, inner) => (
                        <div key={inner} className="single-product__advant-list-item">
                          <div className="single-product__advant-list-item-icon">
                            <img src={`/icons/types_massage/${element.icon}.png`} alt="Icon"/>
                          </div>
                          {element.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Accordion>
              }
            </Tab>

            <Tab id={3} label="????????????">
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

              {/*<div className="single-product__review-nav">*/}
              {/*  <Button*/}
              {/*    label="???????????????? ??????"*/}
              {/*    size="xs"*/}
              {/*    outline*/}
              {/*  />*/}
              {/*</div>*/}

              {/*<div className="single-product__review-total">*/}
              {/*  ?????????? 873 ??????????????*/}
              {/*</div>*/}

            </Tab>
          </Tabs>
        </div>

        <div className="single-product__five-reasons">
          <div className="container">
            <FiveReasons/>
          </div>
        </div>

        {/*<div className="single-product__official-waranty">*/}
        {/*  <OfficialWaranty/>*/}
        {/*</div>*/}

        <div className="single-product__experts-help">
          <ExpertsHelp hideText/>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const categories = await fetchCategories()
  const product = await fetchProduct(params.slug)

  return {
    props: {
      categories: categories.data,
      details: product.data
    }
  }
}

export default ProductPage
