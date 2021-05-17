import PropTypes from "prop-types"
import Link from "next/link"

import Arrow from "../../../public/icons/accordion-arrow.svg"

import "./AccordionSection.scss"

const sectionClass = "accordion-item"

const AccordionSection = ({ children, isOpen, label, onClick, isLink, href }) => {
  if (isLink) {
    return (
      <div
        className={`${sectionClass}`}
      >
        <div
          className={`${sectionClass}__label`}
        >
          <div
            className={`${sectionClass}__label-text`}
          >
            <Link href={href}>
              <div dangerouslySetInnerHTML={{ __html: label }} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${sectionClass} ${isOpen ? `${sectionClass}--is-open` : ""}`}
    >
      <div
        className={`${sectionClass}__label`}
        onClick={onClick}
      >
        <div
          className={`${sectionClass}__label-text`}
          dangerouslySetInnerHTML={{ __html: label }}
        />
        <div
          className={`${sectionClass}__label-icon`}
        >
          <Arrow/>
        </div>
      </div>

      <div
        className={`${sectionClass}__inner`}
      >
        <div
          className={`${sectionClass}__content`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

AccordionSection.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLink: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default AccordionSection
