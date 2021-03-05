import React from "react"

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
  return (
    <Layout>
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
