import React, { useState } from "react"
import { fetchBrand } from "@api/brand"
import { fetchCategories } from "@api/category"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import SectionHeader from "@components/Display/SectionHeader"
import Catalog from "@components/Utils/Catalog"

import ExpertsHelp from "@screens/ExpertsHelp"
import ExplameMassager from "@screens/ExplameMassager"

import "@styles/pages/catalog.scss"
import Head from "next/dist/next-server/lib/head";

const BrandPage = ({ categories, brand }) => {
  const [total, setTotal] = useState(0)

  return (
    <Layout categories={categories}>
      <Head>
        <title>{brand.seo_title}</title>
        <meta name="description" content={brand.seo_description} />
        <meta name="keywords" content={brand.seo_keywrods} />
      </Head>

      <div className="catalog-page-content">
        <div className="container">
          <div className="catalog-page-content__header">
            {brand.NAME &&
            <div className="catalog-page-content__header-title">
              <SectionHeader
                title={`Производитель: ${brand.NAME}`}
                description={total > 0 ? `${total} моделей` : ''}
              />
            </div>
            }
          </div>
        </div>

        {brand.ID &&
        <div className="catalog-page-content__products">
          <Catalog
            brand_id={brand.ID}
            totalSetter={setTotal}
            params={{
              sort: "price-desc",
              update: true
            }}
          />
        </div>
        }

        <div className="catalog-page-content__explame-massager">
          <div className="container">
            <ExplameMassager/>
          </div>
        </div>

        <div className="catalog-page-content__experts-help">
          <ExpertsHelp/>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const categories = await fetchCategories()
  const brand = await fetchBrand(params.code)

  return {
    props: {
      categories: categories.data,
      brand: brand.data
    }
  }
}


export default BrandPage
