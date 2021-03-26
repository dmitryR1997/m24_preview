import React from "react"
import Head from "next/head"
import loadable from "@loadable/component"

import api from "@api/index"
import { fetchProducts } from "@api/product"
import { fetchSeoHome } from "@api/seo"
import { fetchVideos } from "@api/video"
import { fetchCategories } from "@api/category"


import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"

import NewProductsSlider from "@screens/NewProductsSlider"
import ProductsList from "@screens/ProductsList"

const FiveReasons = loadable(() => import("@screens/FiveReasons"))
const WeTeachYou = loadable(() => import("@screens/WeTeachYou"))
import ExplameMassager from "@screens/ExplameMassager"
import CatalogSlider from "@screens/CatalogSlider"
import PreviewBrands from "@screens/PreviewBrands"
import ExpertsHelp from "@screens/ExpertsHelp"

// const FiveReasons = loadable(() =>  import("@screens/FiveReasons"))
// const WeTeachYou = loadable(() =>  import("@screens/WeTeachYou"))
// const ExplameMassager = loadable(() =>  import("@screens/ExplameMassager"))
// const CatalogSlider = loadable(() =>  import("@screens/CatalogSlider"))
// const PreviewBrands = loadable(() =>  import("@screens/PreviewBrands"))
// const ExpertsHelp = loadable(() =>  import("@screens/ExpertsHelp"))

import "@styles/pages/home.scss"

const HomePage = ({ text, slides, products, videos, categories, brands }) => {
  return (
    <Layout pageType="home" categories={categories} seoText={text}>
      <Head>
        <title>Интернет магазин массажеров - Массажёры24.РФ: массажные кресла накидки подушки коврики столы кровати</title>
        <meta name="description" content="Компания Массажеры24.рф - федеральный интернет магазин массажного оборудования с собственной сетью представительств по всей России. Официальный дилер. Доставка в дом. "/>
        <link rel="preload" as="image" href="https://dev.massagery24.ru/upload/iblock/445/44565e384096a366625095d6cc87a671.jpg" />
      </Head>
      <div className="home-page-content">
        <div className="home-page-content__slider">
          <NewProductsSlider
            slides={slides}
          />
        </div>

        <div className="home-page-content__products">
          <ProductsList fetchedProducts={products} />
        </div>

        <div className="home-page-content__five-reasons">
          <Container>
            <FiveReasons />
          </Container>
        </div>

        <div className="home-page-content__we-teach-you">
          <WeTeachYou />
        </div>

        <div className="home-page-content__explame-massager">
          <Container>
            <ExplameMassager/>
          </Container>
        </div>

        <div className="home-page-content__catalog-slider">
          <CatalogSlider
            categories={categories}
          />
        </div>

        <div className="home-page-content__preview-brands">
          <PreviewBrands
            brands={brands}
          />
        </div>

        <div className="home-page-content__experts-help">
          <ExpertsHelp />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const seo = await fetchSeoHome()
  const slides = await api.get("https://dev.massagery24.ru/api/slider/list.php")
  const products = await fetchProducts({ "nav-products": "page-1", type: "NEWPRODUCT", page_size: 4 })
  const videos = await fetchVideos({ home_page: true })
  const categories = await fetchCategories()
  const brands = await api.get("https://dev.massagery24.ru/api/brand/list.php")

  return {
    props: {
      text: seo.data.seobottom ? seo.data.seobottom : false,
      slides: slides.data,
      products: products.data.data,
      videos: videos.data.data,
      categories: categories.data,
      brands: brands.data
    }
  }
}

export default HomePage
