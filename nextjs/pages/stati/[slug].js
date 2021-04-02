import React, {useEffect, useRef} from "react"
import Head from "next/head"

import { fetchArticle } from "@api/article"
import { fetchCategories } from "@api/category"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import Catalog from "@components/Utils/Catalog"
import RealetedProducts from "@components/Utils/RealetedProducts";

import ExpertsHelp from "@screens/ExpertsHelp"
import FiveReasons from "@screens/FiveReasons";
import OfficialWaranty from "@screens/OfficialWaranty";

import "@styles/pages/StaticPage.scss"

const StaticPage = ({ categories, pageContent, slug }) => {
  const content = useRef()

  const accordionClickHandler = (event) => {
    event.target.closest(".accordion-item").classList.toggle("accordion-item--is-open")
  }


  useEffect(() => {
    if (!pageContent) return

    const accordionItems = content.current.querySelectorAll(".accordion-item__label")

    accordionItems.forEach(item => {
      item.addEventListener("click", accordionClickHandler)
    })

    return () => {
      accordionItems.forEach(item => {
        item.addEventListener("click", accordionClickHandler)
      })
    }
  }, [pageContent])

  return (
    <Layout categories={categories}>
      <Head>
        <title>{pageContent.seo_title}</title>
        <meta name="description" content={pageContent.seo_description} />
        <meta name="keywords" content={pageContent.seo_keywords} />
      </Head>

      <div className="static-page" ref={content}>
        <Container>
          <h1 className="static-page__title">
            {pageContent.NAME}
          </h1>

          <div className="static-page__content" dangerouslySetInnerHTML={{ __html: pageContent.DETAIL_TEXT }} />
        </Container>

        {/*{slug === "oformit-rassrochku-na-sayte" &&*/}
        {/*  <div className="static-page__catalog">*/}
        {/*    <Catalog params={{ "credit": true }} />*/}
        {/*  </div>*/}
        {/*}*/}

        <div className="static-page__five-reasons">
          <Container>
            <FiveReasons/>
          </Container>
        </div>

        <div className="static-page__official-waranty">
          <OfficialWaranty/>
        </div>

        <div className="static-page__realeted-products">
          <RealetedProducts params={{ section_id: 69, random: true }}/>
        </div>

        <div className="static-page__experts-help">
          <ExpertsHelp/>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const categories = await fetchCategories()
  const pageContent = await fetchArticle(params.slug)

  return {
    props: {
      slug: params.slug,
      categories: categories.data,
      pageContent: pageContent.data
    }
  }
}


export default StaticPage
