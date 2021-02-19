import React, { useEffect, useState } from "react"

import Reveal from "react-awesome-reveal"
import fadeInUpAnimation from "@utils/fadeInUp"

import { fetchArticles } from "@api/article";

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import Article from "@components/Cards/Article/Article";
import SectionHeader from "@components/Display/SectionHeader"
import RealetedProducts from "@components/Utils/RealetedProducts"

import ExpertsHelp from "@screens/ExpertsHelp"
import FiveReasons from "@screens/FiveReasons"
import OfficialWaranty from "@screens/OfficialWaranty"

import "@styles/pages/Articles.scss"

const ArticlesPage = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetchArticles().then(({ data }) => {
      setArticles(data)
    })
  }, [])

  return (
    <Layout>
      <div className="articles-page">
        <Container>
          <div className="articles-page__header">
            <SectionHeader title="Обзоры и советы" description="44 компании" />
          </div>

          <div className="articles-page__list">
            <Reveal cascade triggerOnce keyframes={fadeInUpAnimation}>
              {articles.map((article, key) => (
                <div key={key} className="articles-page__list-item">
                  <Article
                    text={article.text}
                    title={article.title}
                    image={article.image}
                    href={`/articles/${article.slug}`}
                  />
                </div>
              ))}
            </Reveal>
          </div>
        </Container>

        <div className="articles-page__five-reasons">
          <Container>
            <FiveReasons/>
          </Container>
        </div>

        <div className="articles-page__official-waranty">
          <OfficialWaranty/>
        </div>

        <div className="articles-page__realeted-products">
          <RealetedProducts params={{ section_id: 69, random: true }}/>
        </div>

        <div className="articles-page__experts-help">
          <ExpertsHelp/>
        </div>
      </div>
    </Layout>
  )
}

export default ArticlesPage
