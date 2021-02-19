import React, { useEffect, useState } from "react"

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

const VideosPage = () => {
  const [videos, setVideos] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchVideos({
      page
    }).then(({ data }) => {
      setVideos(data)
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
            {videos.map(video => (
              <div className="video-catalog-content__list-item">
                <VideoReviewCard video={video} hideTitle={true} />
              </div>
            ))}
          </div>

          {videos.length > 0 &&
            <>
              <div className="video-catalog-content__list-nav">
                <Button
                  onClick={() => setPage(page + 1)}
                  label="Показать ещё"
                  size="xs"
                  outline
                />
              </div>

              <div className="video-catalog-content__list-total">
                Всего 128 видео
              </div>
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
