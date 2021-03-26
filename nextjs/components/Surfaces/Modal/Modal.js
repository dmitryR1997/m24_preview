import React from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"

import { connect } from "react-redux"
import { hideModal } from "@actions/layout"

import "./Modal.scss"

Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.75)"

const styles = {
  content: {
    top: "24px",
    left: "24px",
    right: "24px",
    bottom: "auto",
    padding: "0",
    background: "transparent",
    border: "none"
  }
}

const ModalComponent = ({ modalContent, isOpenModal, hideModal }) => {
  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={hideModal}
      style={styles}
      ariaHideApp={false}
    >
      {modalContent}
    </Modal>
  )
}

ModalComponent.propTypes = {
  modalContent: PropTypes.any.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
}

const mapStateToolProps = state => {
  return {
    isOpenModal: state.layout.isOpenModal,
    modalContent: state.layout.modalContent
  }
}
const mapDispatchToProps = {
  hideModal
}

export default connect(mapStateToolProps, mapDispatchToProps)(ModalComponent)
