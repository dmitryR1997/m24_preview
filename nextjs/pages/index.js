import React from "react"
import Head from "next/head"
import dynamic from "next/dynamic"

import api from "@api/index"
import { fetchSeoHome } from "@api/seo"
import { fetchCategories } from "@api/category"

const Layout = dynamic(() =>  import("@components/Layout/Layout"))
const Container = dynamic(() => import("@components/Layout/Container"))

const NewProductsSlider = dynamic(() =>  import("@screens/NewProductsSlider"))
const ProductsList = dynamic(() => import("@screens/ProductsList"))
const FiveReasons = dynamic(() => import("@screens/FiveReasons"))
const WeTeachYou = dynamic(() => import("@screens/WeTeachYou"))
const ExplameMassager = dynamic(() => import("@screens/ExplameMassager"))
const CatalogSlider = dynamic(() => import("@screens/CatalogSlider"))
const PreviewBrands = dynamic(() => import("@screens/PreviewBrands"))
const ExpertsHelp = dynamic(() => import("@screens/ExpertsHelp"))

import "@styles/pages/home.scss"

const HomePage = ({ text, slides, categories }) => {
  return (
    <Layout pageType="home" categories={categories} seoText={text}>
      <Head>
        <title>Интернет магазин массажеров - Массажёры24.РФ: массажные кресла накидки подушки коврики столы кровати</title>
        <meta name="description" content="Компания Массажеры24.рф - федеральный интернет магазин массажного оборудования с собственной сетью представительств по всей России. Официальный дилер. Доставка в дом. "/>
        <link rel="preload" href="https://dev.massagery24.ru/upload/iblock/445/44565e384096a366625095d6cc87a671.jpg" as="image"/>
      </Head>

      <div className="home-page-content">
        <div className="home-page-content__slider">
          <NewProductsSlider
            slides={slides}
          />
        </div>

        <div className="home-page-content__products">
          <ProductsList/>
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
          <PreviewBrands />
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
  const categories = await fetchCategories()

  return {
    props: {
      text: seo.data.seobottom ? seo.data.seobottom : false,
      slides: slides.data,
      categories: categories.data,
    }
  }
}

export default HomePage
