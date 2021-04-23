import React from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import { hideModal } from "@actions/layout"

import Button from "@components/Forms/Button"

import "./Message.scss"

import ModalClose from "../../../public/icons/modal-close.svg"

const Message = ({ classes, title, description, styles, hideModal, hideButton, children, onClose }) => {
  const hideModalHandler = () => {
    hideModal()

    if (onClose) onClose()
  }

  return (
    <div
      className={`message-card ${classes}`}
      style={{ ...styles }}
    >
      <div className="message-card__close" onClick={hideModalHandler}>
        <ModalClose/>
      </div>

      {title &&
      <div
        className="message-card__title"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      }

      {description &&
      <div
        className="message-card__description"
        dangerouslySetInnerHTML={{__html: description}}
      />
      }

      {children &&
      <div className="message-card__content">
        {children}
      </div>
      }

      {!hideButton &&
      <div className="message-card__button">
        <Button
          label="Хорошо"
          onClick={hideModalHandler}
        />
      </div>
      }
    </div>
  )
}

Message.propTypes = {
  classes: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  styles: PropTypes.object,
  hideModal: PropTypes.func.isRequired,
  onClose: PropTypes.func
}

const mapDispatchToProps = {
  hideModal
}

export default  connect(null, mapDispatchToProps)(Message)
