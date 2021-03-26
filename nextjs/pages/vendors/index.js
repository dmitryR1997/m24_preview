import React, { useEffect, useState } from "react"
import Link from "next/link"

import {fetchBrands} from "@api/brand"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import SectionHeader from "@components/Display/SectionHeader"
import BrandCard from "@components/Cards/Brand"
import RealetedProducts from "@components/Utils/RealetedProducts"

import ExpertsHelp from "@screens/ExpertsHelp"
import FiveReasons from "@screens/FiveReasons"
import OfficialWaranty from "@screens/OfficialWaranty"

import "@styles/pages/Brands.scss"
import {fetchCategories} from "@api/category";

const BrandPage = ({ categories }) => {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    fetchBrands({
      "page_size": 1000
    }).then(({ data }) => {
      setBrands(data)
    })
  }, [])

  return (
    <Layout categories={categories}>
      <div className="brands-page">
        <Container>
          <div className="brands-page__header">
            <SectionHeader title="Бренды" description="44 компании" />
          </div>

          <div className="brands-page__list">
            {brands.map((brand, key) => {
              const item = (
                <Link key={key} href={`/vendors/${brand.code}`}>
                  <div className="brands-page__list-item">
                    <BrandCard image={brand.image}/>
                  </div>
                </Link>
              )

              if (key === 5) {
                return (
                  <>
                    {item}
                    <div className="brands-page__five-reasons">
                      <FiveReasons hideHeader />
                    </div>
                  </>
                )
              }


              return item
            })}
          </div>
        </Container>

        <div className="brands-page__official-waranty">
          <OfficialWaranty/>
        </div>

        <div className="brands-page__realeted-products">
          <RealetedProducts params={{ section_id: 69, random: true }}/>
        </div>

        <div className="brands-page__experts-help">
          <ExpertsHelp/>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const categories = await fetchCategories()

  return {
    props: {
      categories: categories.data
    }
  }
}

export default BrandPage
