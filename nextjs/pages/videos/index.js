import React, {useEffect, useRef, useState, useCallback} from "react"
import Head from "next/head"

import { connect } from "react-redux"
import { fetchVideos } from "@api/video"
import { fetchCategories } from "@api/category"

import Layout from "@components/Layout/Layout"
import CatalogFilterToggle from "@components/Utils/CatalogFilterToggle"
import Container from "@components/Layout/Container"
import SectionHeader from "@components/Display/SectionHeader"
import VideoReviewCard from "@components/Cards/VideoReview"
import Button from "@components/Forms/Button"

import ExpertsHelp from "@screens/ExpertsHelp"
import FiveReasons from "@screens/FiveReasons";
import OfficialWaranty from "@screens/OfficialWaranty";

import "@styles/pages/VideoReviews.scss"
import VideoFilter from "@components/Utils/VideoFilter/VideoFilter";

const PER_PAGE = 7

const VideosPage = ({ filter, categories }) => {
  const loader = useRef(null)

  const [videos, setVideos] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [firstLoaded, setFirstLoaded] = useState(false)
  const [end, setEnd] = useState(false)

  const loadVideos = useCallback((page) => {
    fetchVideos({
      page,
      ...filter
    }).then(({ data }) => {
      if (page === 1) {
        setVideos(data.data)
      } else {
        setVideos(prev => [...prev, ...data.data])
      }

      if (data.data.length < PER_PAGE) setEnd(true)

      if (!firstLoaded) setFirstLoaded(true)

      setTotal(data.total)
    })
  }, [filter, firstLoaded])

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
    loadVideos(page)
  }, [page])

  useEffect(() => {
    if (filter && Object.keys(filter).length <= 0) return

    setPage(1)
    loadVideos(1)

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [filter])

  return (
    <Layout categories={categories}>
      <Head>
        <title>Видеообзоры</title>
        <meta name="description" content="" />
      </Head>

      <VideoFilter total={total} />

      <div className="video-catalog-content">
        <div className="container">
          <div className="video-catalog-content__header">
            <SectionHeader
              title="Видеообзоры"
              description={`${total} видео`}
            />
          </div>

          <div className="video-catalog-content__filter">
            <div className="video-catalog-content__filter-item">
              <CatalogFilterToggle filterId="video" />
            </div>
          </div>

          <div className="video-catalog-content__list">
            {videos.map((video, key) => (
              <div key={key} className="video-catalog-content__list-item">
                <VideoReviewCard video={video} hideTitle={true} />
              </div>
            ))}
          </div>

          {videos.length > 0 &&
            <>
              {!end &&
              <div className="video-catalog-content__list-nav" ref={loader}>
                <Button
                  onClick={() => setPage(page + 1)}
                  label="Показать ещё"
                  size="xs"
                  outline
                />
              </div>
              }

              {/*<div className="video-catalog-content__list-total">*/}
              {/*  Всего 128 видео*/}
              {/*</div>*/}
            </>
          }
        </div>

        <div className="video-catalog-content__five-reasons">
          <div className="container">
            <FiveReasons/>
          </div>
        </div>

        {/*<div className="video-catalog-content__official-waranty">*/}
        {/*  <OfficialWaranty/>*/}
        {/*</div>*/}

        <div className="video-catalog-content__experts-help">
          <ExpertsHelp/>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToolProps = state => {
  return {
    filter: state.filter.videoItems
  }
}

export async function getStaticProps({ params }) {
  const categories = await fetchCategories()

  return {
    props: {
      categories: categories.data
    }
  }
}

export default connect(mapStateToolProps)(VideosPage)
