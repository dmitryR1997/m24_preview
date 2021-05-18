import Head from "next/head"

import api from "@api/index"
import { fetchSeoHome } from "@api/seo"
import { fetchCategories } from "@api/category"

import Layout from "@components/Layout/Layout/Layout"

import NewProductsSlider from "@screens/NewProductsSlider"
import ProductsList from "@screens/ProductsList"
import FiveReasons from "@screens/FiveReasons"
import WeTeachYou from "@screens/WeTeachYou"
import ExplameMassager from "@screens/ExplameMassager"
import CatalogSlider from "@screens/CatalogSlider"
import PreviewBrands from "@screens/PreviewBrands"
import ExpertsHelp from "@screens/ExpertsHelp"


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
          <div className="container">
            <FiveReasons />
          </div>
        </div>

        <div className="home-page-content__we-teach-you">
          <WeTeachYou />
        </div>

        <div className="home-page-content__explame-massager">
          <div className="container">
            <ExplameMassager/>
          </div>
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
