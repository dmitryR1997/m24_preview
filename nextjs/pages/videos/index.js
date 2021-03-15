import React, {useEffect, useRef, useState} from "react"

import { fetchVideos } from "@api/video"

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

const PER_PAGE = 7

const VideosPage = () => {
  const loader = useRef(null)

  const [videos, setVideos] = useState([])
  const [page, setPage] = useState(1)
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
    fetchVideos({
      page
    }).then(({ data }) => {
      if (page === 1) {
        setVideos(data)
      } else {
        setVideos(prev => [...prev, ...data])
      }
      if (data.length < PER_PAGE) setEnd(true)

      if (!firstLoaded) setFirstLoaded(true)
    })
  }, [page])

  return (
    <Layout>
      <div className="video-catalog-content">
        <Container>
          <div className="video-catalog-content__header">
            <SectionHeader
              title="Видеообзоры"
              description="389 видео"
            />
          </div>

          <div className="video-catalog-content__filter">
            <div className="video-catalog-content__filter-item">
              <CatalogFilterToggle/>
            </div>

            <div className="video-catalog-content__filter-item">
              <select>
                <option value={false}>По популярности</option>
                <option value="price-desc">По убыванию цены</option>
                <option value="price-asc">По возрастанию цены</option>
              </select>
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
        </Container>

        <div className="video-catalog-content__five-reasons">
          <Container>
            <FiveReasons/>
          </Container>
        </div>

        <div className="video-catalog-content__official-waranty">
          <OfficialWaranty/>
        </div>

        <div className="video-catalog-content__experts-help">
          <ExpertsHelp/>
        </div>
      </div>
    </Layout>
  )
}

export default VideosPage
