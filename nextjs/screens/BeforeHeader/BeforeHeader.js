import React from "react"
import { Zoom } from "react-awesome-reveal"

import Container from "@components/Layout/Container"

import "./BeforeHeader.scss"

const BeforeHeader = () => {
  return (
    <div className="before-header">
      <Zoom duration={400} triggerOnce>
        <Container>
          <div className="before-header__wrapper">
            <div className="before-header__free-delivery">
              Бесплатная<br/>
              доставка по России
            </div>
            <div className="before-header__info">
              <a href="tel:88005503269" className="before-header__info-tel d-block text-decoration-none">
                8 800 550-32-69
              </a>
              <div className="before-header__info-time-work">
                Ежедневно с 9.00 до 21.00
              </div>
            </div>
          </div>
        </Container>
      </Zoom>
    </div>
  )
}

export default BeforeHeader
