import React, { useEffect, useState } from "react"

import { fetchArticles } from "@api/article";

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import Article from "@components/Cards/Article/Article";
import SectionHeader from "@components/Display/SectionHeader"
import RealetedProducts from "@components/Utils/RealetedProducts"
import Button from "@components/Forms/Button"

import ExpertsHelp from "@screens/ExpertsHelp"
import FiveReasons from "@screens/FiveReasons"
import OfficialWaranty from "@screens/OfficialWaranty"

import "@styles/pages/Articles.scss"

const ArticlesPage = () => {
  const [articles, setArticles] = useState([])

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(1)

  useEffect(() => {
    fetchArticles({ page }).then(({ data }) => {
      setArticles(prev => [...prev, ...data.data])
      setTotal(data.total)
    })
  }, [page])

  return (
    <Layout>
      <div className="articles-page">
        <Container>
          <div className="articles-page__header">
            <SectionHeader
              title="Обзоры и советы"
              description={`${total} статьи`}
            />
          </div>

          <div className="articles-page__list">
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
          </div>

          {articles.length > 0 &&
            <>
              <div className="articles-page__nav">
                {!((page * 3) >= total) &&
                <Button
                  label="Показать ещё"
                  size="xs"
                  outline
                  onClick={() => setPage(page + 1)}
                />
                }
              </div>

              <div className="articles-page__total">
                {!((page * 3) >= total)
                  ? <>Показано {page * 3} из {total}</>
                  : <>Показано {total} из {total}</>
                }
              </div>
            </>
          }
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
