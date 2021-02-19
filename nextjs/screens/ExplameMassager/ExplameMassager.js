import React from "react"
import PropTypes from "prop-types"
import { Fade } from "react-awesome-reveal"

import Container from "@components/Layout/Container"
import Slider from "@components/Surfaces/Slider"
import InfoCard from "@components/Cards/Info"
import SectionHeader from "@components/Display/SectionHeader"

import ImageSlide from "./images/slide-1.jpg"

import "./ExplameMassager.scss"

const ExplameMassager = ({ showHeader }) => {
  return (
    <section className="explame-massager">
      <Fade>
        <Container>
          {showHeader &&
            <div className="explame-massager__header">
              <SectionHeader
                title="Попробуйте массажер"
                description="В нашем шоу-руме есть тест-драйв"
              />
            </div>
          }

          <div className="explame-massager__slider">
            <Slider
              visibleHiddenSlides
              pagination
            >
              <InfoCard
                preText="Видеообзор"
                title="Шоу-рум</br>Румянцево"

                styles={{
                  backgroundColor: "#E7EAF0",
                  backgroundImage: `url(${ImageSlide})`,
                  backgroundPosition: "right center",
                  backgroundSize: "50% auto"
                }}
              />
              <InfoCard
                preText="Видеообзор"
                title="Шоу-рум</br>Румянцево"

                styles={{
                  backgroundColor: "#E7EAF0",
                  backgroundImage: `url(${ImageSlide})`,
                  backgroundPosition: "right center",
                  backgroundSize: "50% auto"
                }}
              />
              <InfoCard
                preText="Видеообзор"
                title="Шоу-рум</br>Румянцево"

                styles={{
                  backgroundColor: "#E7EAF0",
                  backgroundImage: `url(${ImageSlide})`,
                  backgroundPosition: "right center",
                  backgroundSize: "50% auto"
                }}
              />
            </Slider>
          </div>
        </Container>
      </Fade>
    </section>
  )
}

ExplameMassager.defaultProps = {
  showHeader: true
}

ExplameMassager.propTypes = {
  showHeader: PropTypes.bool
}

export default ExplameMassager
