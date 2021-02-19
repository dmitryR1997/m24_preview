import React, { useEffect, useState } from "react"

import { fetchVideos } from "@api/video"

import Slider from "@components/Surfaces/Slider"
import VideoReviewCard from "@components/Cards/VideoReview"
import SectionHeader from "@components/Display/SectionHeader"
import Button from "@components/Forms/Button"

import "./VideoReviews.scss"

const endSlide = () => {
  return (
    <div className="video-review-card__nav">
      <Button
        label="Все видеообзоры"
        outline
      />
    </div>
  )
}

const VideoReviews = ({ params, hideHeader }) => {
  const [videos, setVideos] = useState(false)

  useEffect(() => {
    fetchVideos(params).then(({ data }) => {
      if (!data.length || data.length === 0) return

      const result = []

      data.forEach((video, key) => {
        const slide = (
          <VideoReviewCard
            key={key}
            video={video}
          />
        )

        result.push(slide)

        if (key === data.length - 1) result.push(endSlide)
      })

      setVideos(result)
    })
  }, [params])

  return (
    <section className="video-reviews">
      {!hideHeader &&
        <div className="video-reviews__header">
          <SectionHeader
            title="Видеообзоры"
          />
        </div>
      }

      <div className="video-reviews__slider">
        {videos &&
          <Slider
            visibleHiddenSlides
            pagination
          >
            {videos}
          </Slider>
        }
      </div>
    </section>
  )
}

export default VideoReviews
