import React from "react"
import PropTypes from "prop-types"
import { LazyLoadImage } from "react-lazy-load-image-component"

import "./Brand.scss"

const Brand = ({ image }) => {
  return (
    <article
      className="brand-card"
    >
      <div className="brand-card__image">
        <LazyLoadImage
          src={image}
          alt="Brand Image"
        />
      </div>
    </article>
  )
}

Brand.propTypes = {
  image: PropTypes.string.isRequired
}

export default Brand
