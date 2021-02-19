import React, { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import { connect, useDispatch } from "react-redux"

import { hideMainMenu } from "@actions/layout"
import { setFilter, updateFilter } from "@actions/filter"

import { fetchCategory } from "@api/category"
import { fetchProducts } from "@api/product"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import CatalogFilterToggle from "@components/Utils/CatalogFilterToggle"
import SectionHeader from "@components/Display/SectionHeader"
import ProductCard from "@components/Cards/Product"
import CatalogFilter from "@components/Utils/CatalogFilter"
import Button from "@components/Forms/Button"

import VideoReviews from "@screens/VideoReviews"
import ExpertsHelp from "@screens/ExpertsHelp"
import ExplameMassager from "@screens/ExplameMassager"

import "@styles/pages/catalog.scss"

const CatalogPage = ({ filter, isOpenMainMenu, hideMainMenu }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { code } = router.query

  const [currentPage, setCurrentPage] = useState(1)
  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([])
  const [productsTotal, setProductsTotal] = useState(0)

  const sortHandler = (event) => {
    setProducts([])
    setCurrentPage(1)

    dispatch(updateFilter({
      field: "sort",
      value: event.target.value
    }))
  }

  const loadProducts = (filter) => {
    fetchProducts(filter).then(({ data }) => {
      setProducts(prev => [...prev, ...data.data])
      setProductsTotal(data.total)
    })
  }

  useEffect(() => {
    if (!code) return

    if (isOpenMainMenu) {
      hideMainMenu()
    }

    fetchCategory(code).then(({ data }) => {
      setCategory(data)
    })
  }, [code])

  useEffect(() => {
    if (!category.ID) return

    setProducts([])
    setCurrentPage(1)

    dispatch(setFilter({
      section_id: category.ID,
      "nav-products": `page-1`
    }))
  }, [category])

  useEffect(() => {
    if (currentPage === 1) return

    dispatch(updateFilter({
      field: "nav-products",
      value: `page-${currentPage}`
    }))
  }, [currentPage])

  useEffect(() => {
    if (filter.length === 0) return

    loadProducts(filter)
  }, [filter])

  useEffect( () => () => dispatch(setFilter([])), [] )

  return (
    <Layout>
      <div className="catalog-page-content">
        {category.ID &&
        <CatalogFilter sectionId={category.ID}/>
        }

        <Container>
          <div className="catalog-page-content__header">
            {category.NAME &&
            <div className="catalog-page-content__header-title">
              <SectionHeader
                title={category.NAME}
                description={`${category.COUNT} моделей`}
              />
            </div>
            }

            {category.ID &&
            <div className="catalog-page-content__header-slider">
              <VideoReviews params={{ section_id: category.ID }} hideHeader={true}/>
            </div>
            }
          </div>

          <div className="catalog-page-content__product-filter">
            <div className="catalog-page-content__product-filter-item">
              <CatalogFilterToggle/>
            </div>

            <div className="catalog-page-content__product-filter-item">
              <select onChange={sortHandler}>
                <option value={false}>По популярности</option>
                <option value="price-desc">По убыванию цены</option>
                <option value="price-asc">По возрастанию цены</option>
              </select>
            </div>
          </div>

          <div className="catalog-page-content__product-list">
            {products.map((product, key) => (
              <div key={key}
                   className="catalog-page-content__product-list-item"
              >
                <ProductCard
                  product={product}
                />
              </div>
            ))}
          </div>

          {products.length > 0 &&
            <>
              <div className="catalog-page-content__product-nav">
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  label="Показать ещё"
                  size="xs"
                  outline
                />
              </div>

              <div className="catalog-page-content__product-total">
                Всего {productsTotal} моделей
              </div>
            </>
          }
        </Container>

        <div className="catalog-page-content__explame-massager">
          <ExplameMassager/>
        </div>

        <div className="catalog-page-content__experts-help">
          <ExpertsHelp/>
        </div>

        <div className="catalog-page-content__video-reviews">
          <Container>
            <VideoReviews params={{ home_page: true }}/>
          </Container>
        </div>
      </div>
    </Layout>
  )
}

CatalogPage.propTypes = {
  productsTotal: PropTypes.number.isRequired,
  products: PropTypes.array,
  category: PropTypes.object,
  filter: PropTypes.any,
  isOpenMainMenu: PropTypes.bool.isRequired,
  hideMainMenu: PropTypes.func.isRequired
}

const mapStateToolProps = state => {
  return {
    productsTotal: state.product.total,
    products: state.product.items,
    category: state.category.item,
    filter: state.filter.items,
    isOpenMainMenu: state.layout.isOpenMainMenu
  }
}

const mapDispatchToProps = {
  hideMainMenu
}

export default connect(mapStateToolProps, mapDispatchToProps)(CatalogPage)
