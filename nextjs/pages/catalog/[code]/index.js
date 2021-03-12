import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"
import { connect } from "react-redux"

import { hideMainMenu } from "@actions/layout"
import { updateFilter } from "@actions/filter"

import { fetchCategory } from "@api/category"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import CatalogFilterToggle from "@components/Utils/CatalogFilterToggle"
import SectionHeader from "@components/Display/SectionHeader"
import CatalogFilter from "@components/Utils/CatalogFilter"
import Catalog from "@components/Utils/Catalog"

import VideoReviews from "@screens/VideoReviews"
import ExpertsHelp from "@screens/ExpertsHelp"
import ExplameMassager from "@screens/ExplameMassager"

import "@styles/pages/catalog.scss"

const CatalogPage = ({ filter, isOpenMainMenu, hideMainMenu, updateFilter }) => {
  const router = useRouter()
  const { code } = router.query

  const [category, setCategory] = useState([])
  const [total, setTotal] = useState(0)

  const sortHandler = (e) => {
    const value = e.target.value

    updateFilter({
      field: "sort",
      value
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

  return (
    <Layout pageType="category">
      <div className="catalog-page-content">
        {category.ID &&
          <>
            <input type="hidden" className="gtm-category-name" value={category.NAME} />
            <input type="hidden" className="gtm-category-id" value={category.ID} />

            <CatalogFilter
              sectionId={category.ID} total={total}
            />
          </>
        }

        <Container>
          <div className="catalog-page-content__header">
            {category.NAME &&
            <div className="catalog-page-content__header-title">
              <SectionHeader
                title={category.NAME}
                description={total > 0 ? `${total} моделей` : ''}
              />
            </div>
            }

            {category.ID &&
            <div className="catalog-page-content__header-slider">
              <VideoReviews params={{ section_id: category.ID }} hideHeader={true} hideTags={true} />
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
        </Container>

        {category.ID &&
        <div className="catalog-page-content__products">
          <Catalog
            section_id={category.ID}
            params={filter.items}
            totalSetter={setTotal}
          />
        </div>
        }

        <div className="catalog-page-content__explame-massager">
          <Container>
            <ExplameMassager/>
          </Container>
        </div>

        <div className="catalog-page-content__experts-help">
          <ExpertsHelp/>
        </div>

        <div className="catalog-page-content__video-reviews">
          <Container>
            {category.NAME &&
            <VideoReviews
              params={{home_page: true}}
              hideTags={true}
            />
            }
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
  hideMainMenu: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired
}

const mapStateToolProps = state => {
  return {
    productsTotal: state.product.total,
    products: state.product.items,
    category: state.category.item,
    filter: state.filter,
    isOpenMainMenu: state.layout.isOpenMainMenu
  }
}

const mapDispatchToProps = {
  hideMainMenu,
  updateFilter
}

export default connect(mapStateToolProps, mapDispatchToProps)(CatalogPage)
