import React from "react"
import PropTypes from "prop-types"

import VideoPlayer from "@components/Surfaces/VideoPlayer"

import "./VideoReview.scss"

const VideoReview = ({ video, image, styles, hideTitle, hideTags }) => {
  return (
    <article
      className="video-review-card"
      style={{ ...styles }}
    >
      <div className="video-review-card__image">
        {video && video.image &&
          <img src={video.image} alt="Video Review Image"/>
        }

        {image &&
          <img src={image} alt="Video Review Image"/>
        }

        {video && video.video_id &&
          <div className="video-review-card__image-play">
            <VideoPlayer videoId={video.video_id}/>
          </div>
        }
      </div>

      {!hideTags && video && video.tags.length &&
        <>
          <div className="video-review-card__tags-title">
            Теги
          </div>
          <div className="video-review-card__tags-list">
            {video.tags.map((tag, key) => (
              <div key={key} className="video-review-card__tags-list-item">
                {tag}
              </div>
            ))}
          </div>
        </>
      }

      {!hideTitle && video &&
      <h3
          className="video-review-card__title"
          dangerouslySetInnerHTML={{
            __html: video.title.length > 45 ? `${video.title.substr(0, 45)}...` : video.title
          }}
        />
      }
    </article>
  )
}

VideoReview.propTypes = {
  image: PropTypes.string,
  video: PropTypes.object,
  styles: PropTypes.object,
  hideTitle: PropTypes.bool,
  hideTags: PropTypes.bool
}

export default VideoReview
