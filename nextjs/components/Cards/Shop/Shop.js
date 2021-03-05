import React from "react"
import PropTypes from "prop-types"

import "./Shop.scss"

const Shop = ({ image, title, workTime, styles }) => {
  return (
    <article
      className="shop"
      style={{ ...styles }}
    >
      {image &&
      <div className="shop__image">
        <img src={image} alt="Article Image"/>
      </div>
      }

      <h3
        className="shop__title"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      <div className="shop__work-time">{workTime}</div>
    </article>
  )
}

Shop.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  workTime: PropTypes.string.isRequired,
  styles: PropTypes.object
}

export default Shop
