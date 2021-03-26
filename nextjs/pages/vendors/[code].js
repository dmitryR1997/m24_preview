import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { fetchBrand } from "@api/brand"
import { fetchCategories } from "@api/category"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import SectionHeader from "@components/Display/SectionHeader"
import Catalog from "@components/Utils/Catalog"

import ExpertsHelp from "@screens/ExpertsHelp"
import ExplameMassager from "@screens/ExplameMassager"

import "@styles/pages/catalog.scss"

const BrandPage = ({ categories }) => {
  const router = useRouter()
  const { code } = router.query

  const [brand, setBrand] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!code) return

    fetchBrand(code).then(({ data }) => {
      setBrand(data)
    })
  }, [code])

  return (
    <Layout pageType="category" categories={categories}>
      <div className="catalog-page-content">
        <Container>
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
        </Container>

        {brand.ID &&
        <div className="catalog-page-content__products">
          <Catalog
            brand_id={brand.ID}
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
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const categories = await fetchCategories()

  return {
    props: {
      categories: categories.data
    }
  }
}


export default BrandPage
