import React, {useState, useEffect, useRef} from "react"
import {connect} from "react-redux"
import Head from "next/head"

import {fetchCategories} from "@api/category"
import {fetchProducts} from "@api/product"

import Layout from "@components/Layout/Layout"
import {Tab, Tabs} from "@components/Surfaces/Tabs/Tabs"
import RealetedProducts from "@components/Utils/RealetedProducts"
import SectionHeader from "@components/Display/SectionHeader"
import Complect from "@components/Cards/Complect"
import Product from "@components/Cards/Product/Product"
import Button from "@components/Forms/Button"

import ExpertsHelp from "@screens/ExpertsHelp"
import FiveReasons from "@screens/FiveReasons"
import OfficialWaranty from "@screens/OfficialWaranty"

import num_word from "@utils/NumWord"

const PromotionsPage = ({categories}) => {
  const loader = useRef(null)

  const [complects, setComplects] = useState([])
  const [products, setProducts] = useState([])
  const [productTotal, setProductTotal] = useState(0)
  const [complectTotal, setComplectTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    fetchProducts({
      "product_type": 2,
      page_size: 100
    }).then(({data}) => {
      setComplects(data.data)
      setComplectTotal(data.total)
    })

    setIsRendered(true)
  }, [])

  const handleObserver = (entities) => {
    const target = entities[0]

    if (target.isIntersecting) {
      setPage((page) => page + 1)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      threshold: 1.0
    })

    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [isRendered])

  useEffect(() => {
    fetchProducts({
      "type": "DISCOUNT",
      "nav-products": `page-${page}`,
    }).then(({data}) => {
      setProducts(prev => [...prev, ...data.data])
      setProductTotal(data.total)
    })

  }, [page])


  return (
    <Layout categories={categories}>
      <Head>
        <title>Акции и скидки</title>
      </Head>

      <div className="promotions-page">
        <div className="container">
          <div className="promotions-page__header">
            <SectionHeader
              title="Акции"
              description={`${productTotal + complectTotal} ${num_word(productTotal + complectTotal, ["акция", "акции", "акций"])}`}
            />
          </div>

          {complects.length > 0 ?
            <Tabs>
              <Tab id={1} label="Комплекты" disabled={complects.length === 0}>
                <div className="promotions-page__complect-list">
                  {complects.map((complect, key) => (
                    <div key={key} className="promotions-page__complect-item">
                      <Complect product={complect}/>
                    </div>
                  ))}
                </div>
              </Tab>
              <Tab id={2} label="Товары">
                <div className="promotions-page__product-list">
                  {products.map((product, key) => (
                    <div key={key} className="promotions-page__product-item">
                      <Product product={product}/>
                    </div>
                  ))}
                </div>
                <div className="promotions-page__load-more" ref={loader}>
                  <Button
                    onClick={() => setPage(page + 1)}
                    label="Показать ещё"
                    size="xs"
                    outline
                  />
                </div>
              </Tab>
            </Tabs>
            :
            <>
              <div className="promotions-page__product-list">
                {products.map((product, key) => (
                  <div key={key} className="promotions-page__product-item">
                    <Product product={product}/>
                  </div>
                ))}
              </div>
              <div className="promotions-page__load-more" ref={loader}>
                <Button
                  onClick={() => setPage(page + 1)}
                  label="Показать ещё"
                  size="xs"
                  outline
                />
              </div>
            </>
          }

          <div className="promotions-page__five-reasons">
            <FiveReasons/>
          </div>
        </div>

        <div className="promotions-page__official-waranty">
          <OfficialWaranty/>
        </div>

        <div className="promotions-page__realeted-products">
          <RealetedProducts params={{section_id: 69, random: true}}/>
        </div>

        <div className="promotions-page__experts-help">
          <ExpertsHelp hideText/>
        </div>
      </div>
    </Layout>
  )
}

PromotionsPage.propTypes = {}

const mapStateToolProps = state => {
  return {}
}

export async function getServerSideProps({params}) {
  const categories = await fetchCategories()

  return {
    props: {
      categories: categories.data
    }
  }
}

export default connect(mapStateToolProps)(PromotionsPage)
