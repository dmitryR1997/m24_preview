import React from "react"

import Slider from "@components/Surfaces/Slider"
import InfoCard from "@components/Cards/Info"
import SectionHeader from "@components/Display/SectionHeader"

import ImageSlide from "./images/slide-1.jpg"
import ImageSlide2 from "./images/slide-2.jpg"
import ImageSlide3 from "./images/slide-3.jpg"
import ImageSlide4 from "./images/slide-4.jpg"
import ImageSlide5 from "./images/slide-5.jpg"
import ImageSlide6 from "./images/slide-6.png"

import "./FiveReasons.scss"

const FiveReasons = ({ hideHeader }) => {
  return (
    <section className="five-reasons">
      {!hideHeader &&
        <div className="five-reasons__header">
          <SectionHeader
            title="6 причин выбрать нас"
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
            link="/content/pay_and_delivery/"

            backgroundImage={ImageSlide}
            styles={{
              backgroundColor: "#F7F7FC",
              backgroundPosition: "right center"
            }}
          />

          <InfoCard
            preText="Нашли дешевле?"
            title="Дадим<br/>лучшую цену"
            link="/content/dadim-luchshuyu-tsenu"

            backgroundImage={ImageSlide2}
            styles={{
              backgroundColor: "#F7F7FC",
              backgroundPosition: "right center"
            }}
          />

          <InfoCard
            preText="Наличные, карта, безнал"
            title="Удобная<br/>оплата"
            link="/content/pay_and_delivery/"

            backgroundImage={ImageSlide3}
            styles={{
              backgroundColor: "#F7F7FC",
              backgroundPosition: "right center"
            }}
          />

          <InfoCard
            preText="Сертифицированный товар"
            title="Официальная<br/>гарантия"
            link="/content/warranty-and-service/"

            backgroundImage={ImageSlide6}
            styles={{
              backgroundColor: "#F7F7FC",
              backgroundPosition: "right center"
            }}
          />

          <InfoCard
            preText="Не подошёл товар?"
            title="Возврат<br/>14 дней"
            link="/content/refund/"

            backgroundImage={ImageSlide5}
            styles={{
              backgroundColor: "#F7F7FC",
              backgroundPosition: "right center"
            }}
          />

          <InfoCard
            preText="Лучшие модели"
            title="Проверенные<br/>поставщики"
            link="/vendors/"

            backgroundImage={ImageSlide4}
            styles={{
              backgroundColor: "#F7F7FC",
              backgroundPosition: "right center"
            }}
          />
        </Slider>
      </div>
    </section>
  )
}

export default FiveReasons
