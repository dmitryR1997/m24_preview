import {useEffect, useRef, useState} from "react"
import Head from "next/head"

import { fetchCategories } from "@api/category"
import { fetchArticles } from "@api/article"

import Layout from "@components/Layout/Layout"
import Article from "@components/Cards/Article/Article"
import SectionHeader from "@components/Display/SectionHeader"
import RealetedProducts from "@components/Utils/RealetedProducts"
import Button from "@components/Forms/Button"

import ExpertsHelp from "@screens/ExpertsHelp"
import FiveReasons from "@screens/FiveReasons"

const PER_PAGE = 4

const ArticlesPage = ({ categories }) => {
  const loader = useRef(null)

  const [articles, setArticles] = useState([])

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(1)
  const [firstLoaded, setFirstLoaded] = useState(false)
  const [end, setEnd] = useState(false)

  const handleObserver = (entities) => {
    const target = entities[0]

    if (target.isIntersecting) {
      setPage((page) => page + 1)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      threshold: 1.0
    })


    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [firstLoaded])

  useEffect(() => {
    fetchArticles({ page }).then(({ data }) => {
      if (page === 1) {
        setArticles(data.data)
      } else {
        setArticles(prev => [...prev, ...data.data])
      }

      if (data.data.length < PER_PAGE) setEnd(true)

      if (!firstLoaded) setFirstLoaded(true)

      setTotal(data.total)
    })
  }, [page])

  return (
    <Layout categories={categories}>
      <Head>
        <title>Обзоры и советы</title>
        <meta name="description" content="Каталог обзоров и советов от нашего интернет магазина Массажёры24.РФ." />
      </Head>

      <div className="articles-page">
        <div className="container">
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
                  href={`/stati/${article.slug}`}
                />
              </div>
            ))}
          </div>

          {articles.length > 0 &&
            <>
              {!end &&
              <div className="articles-page__nav" ref={loader}>
                <Button
                  label="Показать ещё"
                  size="xs"
                  outline
                  onClick={() => setPage(page + 1)}
                />
              </div>
              }

              {/*<div className="articles-page__total">*/}
              {/*  {!((page * 3) >= total)*/}
              {/*    ? <>Показано {page * 3} из {total}</>*/}
              {/*    : <>Показано {total} из {total}</>*/}
              {/*  }*/}
              {/*</div>*/}
            </>
          }
        </div>

        <div className="articles-page__five-reasons">
          <div className="container">
            <FiveReasons/>
          </div>
        </div>

        {/*<div className="articles-page__official-waranty">*/}
        {/*  <OfficialWaranty/>*/}
        {/*</div>*/}

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

export async function getStaticProps({ params }) {
  const categories = await fetchCategories()

  return {
    props: {
      categories: categories.data
    }
  }
}

export default ArticlesPage
