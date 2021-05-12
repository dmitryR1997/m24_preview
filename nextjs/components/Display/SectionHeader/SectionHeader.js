import PropTypes from "prop-types"

import "./SectionHeader.scss"

const SectionHeader = ({ title, description }) => {
  return (
    <div
      className="section-header"
    >
      <h1
        className="section-header__title"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {description &&
        <div
          className="section-header__description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      }
    </div>
  )
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
}

export default SectionHeader
