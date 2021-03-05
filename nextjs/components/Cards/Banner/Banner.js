import React from "react"
import PropTypes from "prop-types"

import "./Banner.scss"

const Banner = ({ type, title, description, image }) => {
  return (
    <article
      className={`banner`}
    >
      <div className="banner__header">
        {type &&
        <div
          className="banner__type"
          dangerouslySetInnerHTML={{__html: type}}
        />
        }

        {title &&
        <div
          className="banner__title"
          dangerouslySetInnerHTML={{__html: title}}
        />
        }

        {description &&
        <div className="banner__description">
          {description}
        </div>
        }
      </div>
      <div className="banner__image">
        <img src={image} alt="Banner image" />
      </div>
    </article>
  )
}

Banner.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
}

export default Banner
