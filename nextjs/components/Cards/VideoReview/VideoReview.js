import React, { useState } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import { connect } from "react-redux"
import { updateVideoFilter } from "@actions/filter"

import VideoPlayer from "@components/Surfaces/VideoPlayer"

import "./VideoReview.scss"

const VideoReview = ({ filter, updateVideoFilter, video, image, styles, hideTitle, hideTags }) => {
  const [showTags, setShowTags] = useState(4)

  const tagHandler = (value, isChecked) => {
    let newValue

    if (!isChecked) {
      const list = filter.tag || []
      list.push(value)
      newValue = list
    } else {
      const list = filter.tag
      const index = list.indexOf(value)

      if (index > -1) {
        list.splice(index, 1)
        newValue = list
      }
    }

    if (!newValue) return

    updateVideoFilter({
      field: "tag",
      value: newValue
    })
  }

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
            {video.tags.slice(0, video.tags.length <= showTags ? video.tags.length : showTags).map((tag, key) => (
              <div key={key}
                   className={classnames("video-review-card__tags-list-item", {
                     "video-review-card__tags-list-item--active": filter.tag && filter.tag.includes(tag)
                   })}
                   onClick={() => tagHandler(tag, filter.tag && filter.tag.includes(tag))}
              >
                {tag}
              </div>
            ))}
            {video.tags.length > 4 && showTags !== 100 &&
            <div className="video-review-card__tags-list-all" onClick={() => setShowTags(100)}>
              Показать все
            </div>
            }
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
  filter: PropTypes.object,
  image: PropTypes.string,
  video: PropTypes.object,
  styles: PropTypes.object,
  hideTitle: PropTypes.bool,
  hideTags: PropTypes.bool
}

const mapStateToolProps = state => {
  return {
    filter: state.filter.videoItems
  }
}

const mapDispatchToProps = {
  updateVideoFilter
}

export default connect(mapStateToolProps, mapDispatchToProps)(VideoReview)
