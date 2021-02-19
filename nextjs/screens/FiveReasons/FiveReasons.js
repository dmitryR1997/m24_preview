import React from "react"
import { Fade } from "react-awesome-reveal"

import Slider from "@components/Surfaces/Slider"
import InfoCard from "@components/Cards/Info"
import SectionHeader from "@components/Display/SectionHeader"

import ImageSlide from "./images/slide-1.jpg"
import ImageSlide2 from "./images/slide-2.jpg"
import ImageSlide3 from "./images/slide-3.jpg"
import ImageSlide4 from "./images/slide-4.jpg"
import ImageSlide5 from "./images/slide-5.jpg"

import "./FiveReasons.scss"

const FiveReasons = ({ hideHeader }) => {
  return (
    <section className="five-reasons">
      <Fade triggerOnce>
        {!hideHeader &&
          <div className="five-reasons__header">
            <SectionHeader
              title="5 причин выбрать нас"
            />
          </div>
        }

        <div className="five-reasons__slider">
          <Slider
            visibleHiddenSlides
            pagination
          >
            <InfoCard
              preText="По всей России"
              title="Бесплатная<br/>доставка"

              styles={{
                backgroundColor: "#F7F7FC",
                backgroundImage: `url(${ImageSlide})`,
                backgroundPosition: "right center",
                backgroundSize: "50% auto"
              }}
            />
            <InfoCard
              preText="Нашли дешевле?"
              title="Дадим<br/>лучшую цену"

              styles={{
                backgroundColor: "#F7F7FC",
                backgroundImage: `url(${ImageSlide2})`,
                backgroundPosition: "right center",
                backgroundSize: "50% auto"
              }}
            />
            <InfoCard
              preText="Наличные, карта, безнал"
              title="Удобная<br/>оплата"

              styles={{
                backgroundColor: "#F7F7FC",
                backgroundImage: `url(${ImageSlide3})`,
                backgroundPosition: "right center",
                backgroundSize: "50% auto"
              }}
            />

            <InfoCard
              preText="Лучшие модели"
              title="Проверенные<br/>поставщики"

              styles={{
                backgroundColor: "#F7F7FC",
                backgroundImage: `url(${ImageSlide4})`,
                backgroundPosition: "right center",
                backgroundSize: "50% auto"
              }}
            />

            <InfoCard
              preText="Не подошёл товар?"
              title="Возврат<br/>14 дней"

              styles={{
                backgroundColor: "#F7F7FC",
                backgroundImage: `url(${ImageSlide5})`,
                backgroundPosition: "right center",
                backgroundSize: "50% auto"
              }}
            />
          </Slider>
        </div>
      </Fade>
    </section>
  )
}

export default FiveReasons
