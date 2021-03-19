import React, { useEffect, useState } from "react"
import Link from "next/link"
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"

import { fetchVideos } from "@api/video"

import Slider from "@components/Surfaces/Slider"
import VideoReviewCard from "@components/Cards/VideoReview"
import SectionHeader from "@components/Display/SectionHeader"
import Button from "@components/Forms/Button"

import "./VideoReviews.scss"

const endSlide = () => {
  return (
    <Link href="/videos">
      <div className="video-review-card__nav">
        <Button
          label="Все видеообзоры"
          outline
        />
      </div>
    </Link>
  )
}

const VideoReviews = ({ params, hideHeader, hideTags, hideCatalogLink, gallery }) => {
  const [videos, setVideos] = useState(false)

  useEffect(() => {
    fetchVideos(params).then(({ data }) => {
      if (!data.data.length || data.data.length === 0) return

      const result = []

      data.data.forEach((video, key) => {
        const slide = (
          <VideoReviewCard
            key={key}
            video={video}
            hideTags={hideTags}
          />
        )

        result.push(slide)

        if (key === data.length - 1 && !hideCatalogLink) result.push(endSlide)
      })

      if (gallery) {
        gallery.forEach((src, key) => {
          const image = (
            <VideoReviewCard
              key={result.length + key}
              image={src.original}
              hideTags={hideTags}
            />
          )

          result.push(image)
        })
      }

      setVideos(result)
    })
  }, [])

  return (
    <section className="video-reviews">
      {!hideHeader &&
        <div className="video-reviews__header">
          <SectionHeader
            title="Видеообзоры"
          />
        </div>
      }

      <SimpleReactLightbox>
        <SRLWrapper>
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
        </SRLWrapper>
      </SimpleReactLightbox>
    </section>
  )
}

export default VideoReviews
