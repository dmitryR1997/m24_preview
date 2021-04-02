import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import VideoPlayer from "@components/Surfaces/VideoPlayer"

import "./Info.scss"
import BackgroundLazyLoad from "@utils/BackgroundLazyLoad";

const Info = ({ preText, title, videoId, link, styles, backgroundImage }) => {
  const content = (
    <BackgroundLazyLoad
      data-image-src={backgroundImage}
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
    </BackgroundLazyLoad>
  )

  if(link) {
    return <Link href={link}>{content}</Link>
  }

  return content
}

Info.propTypes = {
  preText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  videoId: PropTypes.string,
  link: PropTypes.string,
  styles: PropTypes.object
}

export default Info
