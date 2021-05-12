import { useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head"

import { fetchBrands } from "@api/brand"
import { fetchCategories } from "@api/category"

import Layout from "@components/Layout/Layout"
import SectionHeader from "@components/Display/SectionHeader"
import BrandCard from "@components/Cards/Brand"
import RealetedProducts from "@components/Utils/RealetedProducts"

import ExpertsHelp from "@screens/ExpertsHelp"
import FiveReasons from "@screens/FiveReasons"

import "@styles/pages/Brands.scss"

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
      <Head>
        <title>Производители массажного оборудования. Купить массажеры</title>
        <meta name="description" content="Каталог современных производителей массажного оборудования для дома, офиса, салона представленного на нашем сайте. Массажное оборудование по низкой цене с доставкой" />
        <meta name="keywords" content="Производители массажного оборудования" />
      </Head>

      <div className="brands-page">
        <div className="container">
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
        </div>

        {/*<div className="brands-page__official-waranty">*/}
        {/*  <OfficialWaranty/>*/}
        {/*</div>*/}

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
