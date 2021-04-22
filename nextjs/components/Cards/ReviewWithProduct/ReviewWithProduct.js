import React from "react"
import PropTypes from "prop-types"

import Stars from "@components/Forms/Stars"

import "./ReviewWithProduct.scss"

const ReviewWithProduct = ({ review }) => {
  return (
    <article className="review-with-product">
      <div className="review-with-product__header">
        {review.object_image &&
        <div className="review-with-product__product-image">
          <img src={review.object_image}/>
        </div>
        }
        <div className="review-with-product__details-list">
          <div className="review-with-product__details-list-title">
            {review.product}
          </div>
          <div className="review-with-product__details-list-date">
            {review.date}
          </div>
          <div className="review-with-product__details-list-author">
            {review.user_name}
          </div>
          <div className="review-with-product__details-list-rating">
            <Stars value={review.rating} />
          </div>
        </div>
      </div>
      <div className="review-with-product__content">
        <div className="review-with-product__content-title">
          Достоинства
        </div>
        <div className="review-with-product__content-plus" dangerouslySetInnerHTML={{ __html: review.advantage }} />
        <div className="review-with-product__content-title">
          Недостатки
        </div>
        <div className="review-with-product__content-minus" dangerouslySetInnerHTML={{ __html: review.disadvantage }} />
        <div className="review-with-product__content-title">
          Общее впечатление
        </div>
        <div className="review-with-product__content-common" dangerouslySetInnerHTML={{ __html: review.repute }} />
      </div>
    </article>
  )
}

ReviewWithProduct.propTypes = {
  review: PropTypes.object.isRequired
}

export default ReviewWithProduct
