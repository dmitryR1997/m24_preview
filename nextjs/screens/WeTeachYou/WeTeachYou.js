import { useState } from "react"
import VisibilitySensor from "react-visibility-sensor"

import SectionHeader from "@components/Display/SectionHeader"
import ProgressCircle from "@components/Display/ProgressCircle"

import VideoReviews from "@screens/VideoReviews"

import "./WeTeachYou.scss"

const initStateList = [
  {
    title: "Смотрят видео перед покупкой",
    precent_start: 0,
    precent: 51
  },
  {
    title: "Видео помогает с выбором",
    precent_start: 0,
    precent: 89
  },
  {
    title: "Довольны покупкой",
    precent_start: 0,
    precent: 95
  }
]

const WeTeachYou = () => {
  const [animated, setAnimated] = useState(false)

  const animateHandler = (isVisible) => {
    if (isVisible) {
      setAnimated(true)
    }
  }

  return (
    <section className="we-teach-you">
      <div className="container">
        <div className="we-teach-you__header">
          <SectionHeader
            title="Видеообзоры"
            description="научим правильно выбирать массажеры"
          />
        </div>

        <VisibilitySensor onChange={animateHandler}>
          <div className="we-teach-you__advant-list">
            {initStateList.map((item, key) => (
              <div key={key} className="we-teach-you__advant-list-item">
                <ProgressCircle
                  precent={animated ? item.precent : 0}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </VisibilitySensor>

        <div className="we-teach-you__slider">
          <VideoReviews params={{ home_page: true }} hideHeader={true} hideTags={true} />
        </div>
      </div>
    </section>
  )
}

export default WeTeachYou
