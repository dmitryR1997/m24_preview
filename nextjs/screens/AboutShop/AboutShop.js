import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import Container from "@components/Layout/Container"
import Accordion from "@components/Surfaces/Accordion"
import SectionHeader from "@components/Display/SectionHeader"

import "./AboutShop.scss"

const AboutShop = ({ text, showText }) => {
  return (
    <section className="about-shop">
      {showText &&
        <Container>
          <div className="about-shop__text typography" dangerouslySetInnerHTML={{ __html: text }}/>
          {/*<div className="about-shop__header">*/}
          {/*  <SectionHeader*/}
          {/*    title="Покупка<br/>массажного кресла"*/}
          {/*  />*/}
          {/*</div>*/}

          {/*<div className="about-shop__description">*/}
          {/*  Массажные кресла являются одними из&nbsp;самых популярных предметов для релаксации и&nbsp;отдыха после*/}
          {/*  тяжёлого трудового дня, длительной поездки или активных занятий спортом. Прямое воздействие*/}
          {/*  на&nbsp;&laquo;нагруженные&raquo; участки тела позволяет достигать эффекта полного расслабления, придаёт сил,*/}
          {/*  бодрит и&nbsp;создаёт непередаваемое ощущение лёгкости и&nbsp;комфорта.*/}
          {/*</div>*/}
        </Container>
      }

      <Container disablePadding>
        <Accordion>
          <div
            id="tab-1"
            label="О магазине"
          >
            <p>С 2015 года мы продали более 14 000 массажёров и массажных кресел по всей России. Наши менеджеры помогут подобрать нужный массажёр, т.к. разбираются во всех тонкостях и деталях. Все менеджеры регулярно обучаются в шоу-румах производителей и в наших розничных магазинах, где есть возможность попробовать практически весь ассортимен массажных кресел массажёров. Кроме того, мы единственный магазин, который делает подробные видео-обзоры массажного оборудования, помогая вам ориентироваться в этом сложном оборудовании. В Москве у нас 5 шоу-румов, где вы можете абсолютно бесплатно протестировать любое устройство.</p>
            <p>Позвоните нам или приходите в один <Link href="/contacts">из магазинов.</Link> Пробуйте массажёры и сделайте свою жизнь легче.</p>
          </div>

          <div
            id="tab-2"
            label="Сервис"
          >
            <ul className="about-shop__menu">
              <li className="about-shop__menu-item">
                <Link href="/content/pay_and_delivery">
                  <a className="about-shop__menu-link" href="/">
                    Оплата и доставка
                  </a>
                </Link>
              </li>
              <li className="about-shop__menu-item">
                <Link href="/content/card_buy">
                  <a className="about-shop__menu-link" href="/">
                    Оплата картой
                  </a>
                </Link>
              </li>
              <li className="about-shop__menu-item">
                <Link href="/content/credit_buy">
                  <a href="/content/credit_buy" className="about-shop__menu-link">
                    Рассрочка
                  </a>
                </Link>
              </li>
              <li className="about-shop__menu-item">
                <Link href="/content/warranty-and-service/">
                  <a href="/content/warranty-and-service/" className="about-shop__menu-link">
                    Гарантия и сервис
                  </a>
                </Link>
              </li>
              <li className="about-shop__menu-item">
                <Link href="/cart">
                  <a cart="/cart" className="about-shop__menu-link">
                    Корзина
                  </a>
                </Link>
              </li>
              <li className="about-shop__menu-item">
                <Link href="/content/refund">
                  <a href="/content/refund" className="about-shop__menu-link">
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
            <p>Позвоните нам или приходите в один <Link href="/contacts">из магазинов.</Link> Пробуйте массажёры и сделайте свою жизнь легче.</p>
          </div>

          <div
            id="tab-4"
            label="Свяжитесь с нами"
          >
            <p><a href="tel:88002221690" className="roistat_phone">8 (800) 222-16-90</a></p>
            <p>Ежедневно с 9.00 до 21.00 по московскому времени.</p>
          </div>
        </Accordion>
      </Container>
    </section>
  )
}

AboutShop.propTypes = {
  text: PropTypes.string,
  showText: PropTypes.bool
}

export default AboutShop
