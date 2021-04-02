import React from "react"
import PropTypes from "prop-types"

import "./Shop.scss"
import Accordion from "@components/Surfaces/Accordion";

const Shop = ({ image, title, workTime, brands, styles }) => {
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

      {Object.keys(brands).length > 0 &&
        <Accordion>
          <div id="brand" label="Представленные бренды">
            <div className="shop__brands-list">
              {Object.keys(brands).map((key, i) => (
                <div key={key} className="shop__brands-list-item">
                  <div className="shop__brands-list-item-title">
                    {brands[key].title} ({brands[key].country})
                  </div>

                  <div className="shop__brands-list-item-description">
                    {brands[key].description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Accordion>
      }
  </article>
  )
}

Shop.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  workTime: PropTypes.string.isRequired,
  brands: PropTypes.any,
  styles: PropTypes.object
}

export default Shop
