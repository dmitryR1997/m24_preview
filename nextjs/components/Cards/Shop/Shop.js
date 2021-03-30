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

      {brands.length > 0 &&
        <Accordion>
          <div id="brand" label="Представленные бренды" open={true}>
            <div className="shop__brands-list">
              {brands.map((brand, key) => (
                <div key={key} className="shop__brands-list-item">
                  <div className="shop__brands-list-item-title">
                    {brand.title} ({brand.country})
                  </div>

                  <div className="shop__brands-list-item-description">
                    {brand.description}
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
