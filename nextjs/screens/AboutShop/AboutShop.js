import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import Container from "@components/Layout/Container"
import Accordion from "@components/Surfaces/Accordion"
import SectionHeader from "@components/Display/SectionHeader"

import "./AboutShop.scss"

const AboutShop = ({ showText }) => {
  return (
    <section className="about-shop">
      {showText &&
        <Container>
          <div className="about-shop__header">
            <SectionHeader
              title="Покупка<br/>массажного кресла"
            />
          </div>

          <div className="about-shop__description">
            Массажные кресла являются одними из&nbsp;самых популярных предметов для релаксации и&nbsp;отдыха после
            тяжёлого трудового дня, длительной поездки или активных занятий спортом. Прямое воздействие
            на&nbsp;&laquo;нагруженные&raquo; участки тела позволяет достигать эффекта полного расслабления, придаёт сил,
            бодрит и&nbsp;создаёт непередаваемое ощущение лёгкости и&nbsp;комфорта.
          </div>
        </Container>
      }

      <Container disablePadding>
        <Accordion>
          <div
            id="tab-1"
            label="О магазине"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat lacinia quam, id porttitor tellus auctor quis. Cras id neque velit. Nulla facilisis ac ligula quis blandit. Nunc bibendum at est rhoncus varius. In felis arcu, porta rutrum tristique sed, gravida id lorem. Nullam ut risus vitae diam tincidunt dapibus vel ac elit. Nunc accumsan ornare pellentesque.
          </div>

          <div
            id="tab-2"
            label="Сервис"
          >
            <ul className="about-shop__menu">
              <li className="about-shop__menu-item">
                <Link href="/">
                  <a className="about-shop__menu-link" href="/">
                    Оплата и доставка
                  </a>
                </Link>
              </li>
              <li className="about-shop__menu-item">
                <Link href="/">
                  <a className="about-shop__menu-link" href="/">
                    Оплата картой
                  </a>
                </Link>
              </li>
              <li className="about-shop__menu-item">
                <Link href="/">
                  <a className="about-shop__menu-link" href="/">
                    Рассрочка
                  </a>
                </Link>
              </li>
              <li className="about-shop__menu-item">
                <Link href="/">
                  <a className="about-shop__menu-link" href="/">
                    Гарантия и сервис
                  </a>
                </Link>
              </li>
              <li className="about-shop__menu-item">
                <Link href="/">
                  <a className="about-shop__menu-link" href="/">
                    Корзина
                  </a>
                </Link>
              </li>
              <li className="about-shop__menu-item">
                <Link href="/">
                  <a className="about-shop__menu-link" href="/">
                    Возврат
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div
            id="tab-3"
            label="Где купить?"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat lacinia quam, id porttitor tellus auctor quis. Cras id neque velit. Nulla facilisis ac ligula quis blandit. Nunc bibendum at est rhoncus varius. In felis arcu, porta rutrum tristique sed, gravida id lorem. Nullam ut risus vitae diam tincidunt dapibus vel ac elit. Nunc accumsan ornare pellentesque.
          </div>

          <div
            id="tab-4"
            label="Свяжитесь с нами"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat lacinia quam, id porttitor tellus auctor quis. Cras id neque velit. Nulla facilisis ac ligula quis blandit. Nunc bibendum at est rhoncus varius. In felis arcu, porta rutrum tristique sed, gravida id lorem. Nullam ut risus vitae diam tincidunt dapibus vel ac elit. Nunc accumsan ornare pellentesque.
          </div>
        </Accordion>
      </Container>
    </section>
  )
}

AboutShop.propTypes = {
  showText: PropTypes.bool
}

export default AboutShop
