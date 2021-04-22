import React from "react"
import PropTypes from "prop-types"

import "./Review.scss"

const Review = ({ review }) => {
  return (
    <article className="review-card">
      <div className="review-card__date">
        {review.date}
      </div>
      <div className="review-card__name">
        {review.user_name}
      </div>

      <div className="review-card__content">
        <div className="review-card__content-title">
          Достоинства
        </div>
        <div className="review-card__content-text">
          {review.advantage}
        </div>
      </div>

      <div className="review-card__content">
        <div className="review-card__content-title">
          Недостатки
        </div>
        <div className="review-card__content-text">
          {review.disadvantage}
        </div>
      </div>

      <div className="review-card__content">
        <div className="review-card__content-title">
          Общее впечатление
        </div>
        <div className="review-card__content-text">
          {review.repute}
        </div>
      </div>

      {review.image &&
        <div className="review-card__image">
          <img src={review.image} alt="Review Image"/>
        </div>
      }
    </article>
  )
}

Review.propTypes = {
  review: PropTypes.object.isRequired
}

export default Review
