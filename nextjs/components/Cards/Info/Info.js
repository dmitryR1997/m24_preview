import React from "react"
import PropTypes from "prop-types"

import VideoPlayer from "@components/Surfaces/VideoPlayer"

import "./Info.scss"

const Info = ({ preText, title, videoId, styles }) => {
  return (
    <article
      className="info-card"
      style={{ ...styles }}
    >
      {videoId &&
      <div className="info-card__image-play">
        <VideoPlayer videoId={videoId}/>
      </div>
      }

      <div
        className="info-card__pre-text"
        dangerouslySetInnerHTML={{ __html: preText }}
      />
      <h3
        className="info-card__title"
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </article>
  )
}

Info.propTypes = {
  preText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  videoId: PropTypes.string,
  styles: PropTypes.object
}

export default Info
