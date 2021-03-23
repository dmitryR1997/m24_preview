import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import { LazyLoadImage } from "react-lazy-load-image-component"

import "./Banner.scss"

const Banner = ({ type, title, description, image, view, link }) => {
  return (
    <Link href={link ? link : '/'}>
      <article
        className={`banner`}
      >
        {title && view === "banner" &&
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
        }

        <div className="banner__image">
          <LazyLoadImage
            src={image}
            height={402}
            alt="Banner image"
          />
        </div>
      </article>
    </Link>
  )
}

Banner.propTypes = {
  link: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
}

export default Banner
