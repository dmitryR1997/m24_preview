import React, {useEffect, useState, useRef} from "react"
import { useRouter } from "next/router"

import { fetchStatic } from "@api/static";

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import Catalog from "@components/Utils/Catalog"
import RealetedProducts from "@components/Utils/RealetedProducts";

import ExpertsHelp from "@screens/ExpertsHelp"
import FiveReasons from "@screens/FiveReasons";
import OfficialWaranty from "@screens/OfficialWaranty";

import "@styles/pages/StaticPage.scss"
import {fetchArticle} from "@api/article";

const StaticPage = () => {
  const content = useRef()
  const router = useRouter()
  const { slug } = router.query

  const [pageContent, setPageContent] = useState([])

  const accordionClickHandler = (event) => {
    event.target.closest(".accordion-item").classList.toggle("accordion-item--is-open")
  }

  useEffect(() => {
    if (!slug) return

    console.log(slug)

    fetchArticle(slug).then(({ data }) => {
      setPageContent(data)
    })
  }, [slug])

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
    <Layout>
      <div className="static-page" ref={content}>
        <Container>
          <h1 className="static-page__title">
            {pageContent.NAME}
          </h1>

          <div className="static-page__content" dangerouslySetInnerHTML={{ __html: pageContent.DETAIL_TEXT }} />
        </Container>

        {slug === "oformit-rassrochku-na-sayte" &&
          <div className="static-page__catalog">
            <Catalog params={{ "credit": true }} />
          </div>
        }

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

export default StaticPage
