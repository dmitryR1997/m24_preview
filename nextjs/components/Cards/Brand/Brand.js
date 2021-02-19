import React from "react"
import PropTypes from "prop-types"

import "./Brand.scss"

const Brand = ({ image }) => {
  return (
    <article
      className="brand-card"
    >
      <div className="brand-card__image">
        <img src={image} alt="Brand Image" />
      </div>
    </article>
  )
}

Brand.propTypes = {
  image: PropTypes.string.isRequired
}

export default Brand
