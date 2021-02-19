import React from "react"
import PropTypes from "prop-types"

import "./Info.scss"

const Info = ({ preText, title, styles }) => {
  return (
    <article
      className="info-card"
      style={{ ...styles }}
    >
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
  styles: PropTypes.object
}

export default Info
