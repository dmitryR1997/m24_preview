import PropTypes from "prop-types"
import Link from "next/link"

import "./Article.scss"

import TimeIcon from "../../../public/icons/time-circle.svg"
import EyeIcon from "../../../public/icons/eye.svg"

const Article = ({ href, image, text, title, styles }) => {
  return (
    <Link href={href}>
      <article
        className="article"
        style={{ ...styles }}
      >
        <div className="article__image">
          <img src={image} alt="Article Image" />
        </div>

        <h3
          className="article__title"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <div
          className="article__text"
          dangerouslySetInnerHTML={{ __html: `${text.slice(0, 120)}...` }}
        />

        <div className="article__nav">
          <Link href={href}>
            <a href={href} className="article__nav-more">
              Подробнее
            </a>
          </Link>

          <div className="article__nav-info">
            <TimeIcon/>
            7 мин
          </div>
          <div className="article__nav-info">
            <EyeIcon/>
            1 943
          </div>
        </div>
      </article>
    </Link>
  )
}

Article.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  styles: PropTypes.object
}

export default Article
