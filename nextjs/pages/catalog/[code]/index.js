import React, { useEffect, useState } from "react"
import Head from "next/head"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { setFilter, updateFilter } from "@actions/filter"
import { fetchCategories, fetchCategory } from "@api/category"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import CatalogFilterToggle from "@components/Utils/CatalogFilterToggle"
import SectionHeader from "@components/Display/SectionHeader"
import CatalogFilter from "@components/Utils/CatalogFilter"
import Catalog from "@components/Utils/Catalog"
import Loader from "@components/Layout/Loader"

import VideoReviews from "@screens/VideoReviews"
import ExpertsHelp from "@screens/ExpertsHelp"
import ExplameMassager from "@screens/ExplameMassager"

import filters from "@utils/filters"

import "@styles/pages/catalog.scss"
import CompareNav from "@components/Utils/CompareNav/CompareNav";

const CatalogPage = ({ code, category, filter, updateFilter, setFilter, categories }) => {
  const [total, setTotal] = useState(0)

  const sortHandler = (e) => {
    const value = e.target.value

    updateFilter({
      field: "sort",
      value
    })
  }

  useEffect(() => {
    setFilter({})
  }, [])

  return (
    <Layout pageType="category" seoText={category.seobottom} categories={categories}>
      <Head>
        <title>{category.title}</title>
        <meta name="description" content={category.description} />
        <meta name="keywords" content={category.keywrods} />
      </Head>
      <div className="catalog-page-content">
        <input type="hidden" className="gtm-category-name" value={category.NAME} />
        <input type="hidden" className="gtm-category-id" value={category.ID} />

        <CatalogFilter
          sectionId={category.ID}
          total={total}
          filters={filters[code]}
        />

        <div className="container">
          <div className="catalog-page-content__header">
            <div className="catalog-page-content__header-title">
              <SectionHeader
                title={category.h1 ? category.h1 : category.NAME}
                description={total > 0 ? `${total} моделей` : ''}
              />
            </div>

            <div className="catalog-page-content__header-slider">
              <VideoReviews
                params={{ section_id: category.ID }}
                hideHeader={true}
                hideTags={true}
              />
            </div>
          </div>

          <div className="catalog-page-content__product-filter">
            <div className="catalog-page-content__product-filter-item">
              <CatalogFilterToggle filterId="catalog" />
            </div>

            <div className="catalog-page-content__product-filter-item">
              <select onChange={sortHandler}>
                <option value={false}>По популярности</option>
                <option value="price-desc">По убыванию цены</option>
                <option value="price-asc">По возрастанию цены</option>
              </select>
            </div>
          </div>
        </div>

        <div className="catalog-page-content__products">
          <Catalog
            section_id={category.ID}
            params={filter.items}
            totalSetter={setTotal}
          />
        </div>

        <div className="catalog-page-content__explame-massager">
          <div className="container">
            <ExplameMassager/>
          </div>
        </div>

        <div className="catalog-page-content__experts-help">
          <ExpertsHelp/>
        </div>

        <div className="catalog-page-content__video-reviews">
          <div className="container">
            <VideoReviews
              params={{ home_page: true }}
              hideTags={true}
            />
          </div>
        </div>
      </div>

      <CompareNav/>
    </Layout>
  )
}

CatalogPage.propTypes = {
  code: PropTypes.string,
  category: PropTypes.object,
  filter: PropTypes.any,
  updateFilter: PropTypes.func.isRequired
}

const mapStateToolProps = state => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  updateFilter,
  setFilter
}

export async function getServerSideProps({ params }) {
  const categories = await fetchCategories()
  const category = await fetchCategory(params.code)

  return {
    props: {
      category: category.data,
      categories: categories.data
    }
  }
}


export default connect(mapStateToolProps, mapDispatchToProps)(CatalogPage)
