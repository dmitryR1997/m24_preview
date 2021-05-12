import { useState, useEffect } from "react"
import { connect } from "react-redux"

import { fetchCategories } from "@api/category"
import { fetchProducts } from "@api/product"

import Layout from "@components/Layout/Layout"
import { Tab, Tabs } from "@components/Surfaces/Tabs/Tabs"
import RealetedProducts from "@components/Utils/RealetedProducts"
import SectionHeader from "@components/Display/SectionHeader"
import Complect from "@components/Cards/Complect"
import Product from "@components/Cards/Product/Product"

import ExpertsHelp from "@screens/ExpertsHelp"
import FiveReasons from "@screens/FiveReasons"
import OfficialWaranty from "@screens/OfficialWaranty"

import num_word from "@utils/NumWord"

import "@styles/pages/PromotionsPage.scss"

const PromotionsPage = ({ categories }) => {
  const [complects, setComplects] = useState([])
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchProducts({
      "product_type": 2,
      page_size: 100
    }).then(({ data }) => {
      setComplects(data.data)
      setTotal(prev => prev + data.total)
    })

    fetchProducts({
      "type": "DISCOUNT",
      page_size: 10
    }).then(({ data }) => {
      console.log(data)
      setProducts(data.data)
      setTotal(prev => prev + data.total)
    })

  }, [])

  return (
    <Layout categories={categories}>
      <div className="promotions-page">
        <div className="container">
          <div className="promotions-page__header">
            <SectionHeader
              title="Акции"
              description={`${total} ${num_word(total, ["акция", "акции", "акций"])}`}
            />
          </div>

          <Tabs>
            <Tab id={1} label="Комплекты">
              <div className="promotions-page__complect-list">
                {complects.map((complect, key) => (
                  <div key={key} className="promotions-page__complect-item">
                    <Complect product={complect} />
                  </div>
                ))}
              </div>
            </Tab>
            <Tab id={2} label="Товары">
              <div className="promotions-page__product-list">
                {products.map((product, key) => (
                  <div className="promotions-page__product-item">
                    <Product key={key} product={product} />
                  </div>
                ))}
              </div>
            </Tab>
          </Tabs>

          <div className="promotions-page__five-reasons">
            <FiveReasons/>
          </div>
        </div>

        <div className="promotions-page__official-waranty">
          <OfficialWaranty/>
        </div>

        <div className="promotions-page__realeted-products">
          <RealetedProducts params={{ section_id: 69, random: true }}/>
        </div>

        <div className="promotions-page__experts-help">
          <ExpertsHelp hideText />
        </div>
      </div>
    </Layout>
  )
}

PromotionsPage.propTypes = {
}

const mapStateToolProps = state => {
  return {
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

export default connect(mapStateToolProps)(PromotionsPage)
