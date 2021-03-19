import React, { useEffect, useState } from "react"
import Head from "next/head"

import { fetchSeoHome } from "@api/seo"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"

import ProductsList from "@screens/ProductsList"
import FiveReasons from "@screens/FiveReasons"
import WeTeachYou from "@screens/WeTeachYou"
import ExplameMassager from "@screens/ExplameMassager"
import CatalogSlider from "@screens/CatalogSlider"
import PreviewBrands from "@screens/PreviewBrands"
import ExpertsHelp from "@screens/ExpertsHelp"
import NewProductsSlider from "@screens/NewProductsSlider"

import "@styles/pages/home.scss"

const HomePage = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    fetchSeoHome().then(({ data }) => {
      setText(data.seobottom)
    })
  }, [])

  return (
    <Layout pageType="home" seoText={text}>
      <Head>
        <title>Интернет магазин массажеров - Массажёры24.РФ: массажные кресла накидки подушки коврики столы кровати</title>
        <meta name="description" content="Компания Массажеры24.рф - федеральный интернет магазин массажного оборудования с собственной сетью представительств по всей России. Официальный дилер. Доставка в дом. "/>
      </Head>

      <div className="home-page-content">
        <div className="home-page-content__slider">
          <NewProductsSlider />
        </div>

        <div className="home-page-content__products">
          <ProductsList />
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
          <CatalogSlider />
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

export default HomePage
