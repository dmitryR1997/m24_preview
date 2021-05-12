import {useEffect, useRef } from "react"
import Head from "next/head"

import { fetchStatic } from "@api/static"
import { fetchCategories } from "@api/category"

import Layout from "@components/Layout/Layout"
import Catalog from "@components/Utils/Catalog"
import RealetedProducts from "@components/Utils/RealetedProducts";

import ExpertsHelp from "@screens/ExpertsHelp"
import FiveReasons from "@screens/FiveReasons";
import ExplameMassager from "@screens/ExplameMassager"

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
        <div className="container">
          <h1 className="static-page__title">
            {pageContent.NAME}
          </h1>

          {slug === "o-magazine" &&
            <>
              <h3>Мы знаем о массажерах и массажных креслах ВСЁ!</h3>
              <div className="static-page__explame-massager">
                <ExplameMassager showHeader={false} />
              </div>
            </>
          }

          <div className="static-page__content" dangerouslySetInnerHTML={{ __html: pageContent.DETAIL_TEXT }} />
        </div>

        {slug === "credit_buy" &&
          <div className="static-page__catalog">
            <Catalog params={{ "credit": true, "update": true }} />
          </div>
        }

        <div className="static-page__five-reasons">
          <div className="container">
            <FiveReasons/>
          </div>
        </div>

        {/*<div className="static-page__official-waranty">*/}
        {/*  <OfficialWaranty/>*/}
        {/*</div>*/}

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
  const pageContent = await fetchStatic(params.slug)

  return {
    props: {
      slug: params.slug,
      categories: categories.data,
      pageContent: pageContent.data
    }
  }
}

export default StaticPage
