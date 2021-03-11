import React from "react"
import PropTypes from "prop-types"

import Container from "@components/Layout/Container"

import { ReactComponent as CallIcon } from "../../public/icons/call.svg"
import { ReactComponent as CommentIcon } from "../../public/icons/comment.svg"

import "./ExpertsHelp.scss"

const ExpertsHelp = ({ hideText }) => {
  return (
    <div className="experts-help">
      <Container>
        <div className="experts-help__expert">
          <div className="experts-help__expert-description">
            Бесплатная консультация
          </div>
          <div className="experts-help__expert-title">
            Эксперты<br/>
            помогут
          </div>

          <div className="experts-help__expert-contact">
            <div className="experts-help__expert-contact-item">
              <a href="tel:+7(800)2221690">
                <CallIcon/>
              </a>
            </div>
            <div className="experts-help__expert-contact-item" onClick={() => jivo_api.open()}>
              <CommentIcon/>
            </div>
          </div>
        </div>

        {!hideText &&
          <>
            <div className="experts-help__text">
              Консультанты с&nbsp;радостью ответят на&nbsp;ваши вопросы по&nbsp;контактному телефону
            </div>

            <a href="tel:+78002221690" className="experts-help__tel">
              +7 (800) 222-16-90
            </a>

            <div className="experts-help__text">
              и&nbsp;непременно помогут подобрать самую удобную для вас модель, конфигурацию, более того, вы&nbsp;всегда можете заказать звонок, тогда вам перезвонят и&nbsp;окажут исчерпывающую консультацию!
            </div>
          </>
        }
      </Container>
    </div>
  )
}

ExpertsHelp.propTypes = {
  hideText: PropTypes.bool
}

export default ExpertsHelp
