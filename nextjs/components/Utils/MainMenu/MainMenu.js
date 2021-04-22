import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import classnames from "classnames"

import { connect, useDispatch } from "react-redux"
import { hideMainMenu } from "@actions/layout"
import { fetchCategories } from "@api/category"

import Accordion from "@components/Surfaces/Accordion"
import Container from "@components/Layout/Container"

import "./MainMenu.scss"

const MainMenu = ({ isOpenMainMenu, headerOffsetBottom, categories }) => {
  return (
    <div
      className={classnames("main-menu", {
        "main-menu--is-open": isOpenMainMenu
      })}
      style={{
        top: headerOffsetBottom,
        height: isOpenMainMenu ? `calc(100vh - ${headerOffsetBottom}px)` : false
      }}
    >
      <div className="main-menu__inner">
        <div className="container container--no-padding">
          <Accordion>
            <div
              id="tab-1"
              label="Каталог"
            >
              {categories &&
                <ul className="main-menu__list">
                  {categories.map((category, key) => (
                    <li
                      key={key}
                      className="main-menu__list-item">
                      <Link href={`/catalog/${category.CODE}`}>
                        <a href={`/catalog/${category.CODE}`}
                           className="main-menu__list-link">
                          {category.NAME}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              }
            </div>

            {/*<div*/}
            {/*  id="tab-2"*/}
            {/*  label="Акции"*/}
            {/*/>*/}

            <div
              id="tab-3"
              label="Обзоры и отзывы"
            >
              <ul className="main-menu__list">
                <li
                  className="main-menu__list-item">
                  <Link
                    href="/stati"
                  >
                    <a href="/stati" className="main-menu__list-link">
                      Обзоры
                    </a>
                  </Link>
                </li>
                <li
                  className="main-menu__list-item">
                  <Link
                    href="/videos"
                  >
                    <a href="/videos" className="main-menu__list-link">
                      Видеообзоры
                    </a>
                  </Link>
                </li>
                <li
                  className="main-menu__list-item">
                  <Link
                    href="/reviews/all/"
                  >
                    <a href="/reviews/all/" className="main-menu__list-link">
                      Отзывы
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div
              id="tab-4"
              label="Услуги"
              open={true}
            >
              <ul className="main-menu__list">
                <li
                  className="main-menu__list-item">
                  <Link
                    href="/content/pay_and_delivery"
                  >
                    <a href="/content/pay_and_delivery" className="main-menu__list-link">
                      Оплата и доставка
                    </a>
                  </Link>
                </li>
                <li
                  className="main-menu__list-item">
                  <Link
                    href="/content/card_buy"
                  >
                    <a href="/content/card_buy" className="main-menu__list-link">
                      Оплата картой
                    </a>
                  </Link>
                </li>
                <li
                  className="main-menu__list-item">
                  <Link
                    href="/content/credit_buy"
                  >
                    <a href="/content/credit_buy" className="main-menu__list-link">
                      Рассрочка
                    </a>
                  </Link>
                </li>
                <li
                  className="main-menu__list-item">
                  <Link
                    href="/content/warranty-and-service/"
                  >
                    <a href="/content/warranty-and-service/" className="main-menu__list-link">
                      Гарантия и сервис
                    </a>
                  </Link>
                </li>
                <li
                  className="main-menu__list-item">
                  <Link
                    href="/content/refund"
                  >
                    <a href="/content/refund" className="main-menu__list-link">
                      Возврат
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div
              id="tab-5"
              label="Магазин"
              open={true}
            >
              <ul className="main-menu__list">
                <li
                  className="main-menu__list-item">
                  <Link
                    href="/content/about"
                  >
                    <a href="/content/about" className="main-menu__list-link">
                      О нас
                    </a>
                  </Link>
                </li>
                <li
                  className="main-menu__list-item">
                  <Link
                    href="/contacts"
                  >
                    <a href="/contacts" className="main-menu__list-link">
                      Шоу-румы
                    </a>
                  </Link>
                </li>
                <li
                  className="main-menu__list-item">
                  <Link
                    href="/vendors"
                  >
                    <a href="/vendors" className="main-menu__list-link">
                      Бренды
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </Accordion>
        </div>

        <div className="container">
          <div className="main-menu__footer">
            <p>Наши консультанты с радостью ответят на ваши вопросы по контактному телефону</p>

            <a href="tel:88005503269" className="roistat_phone">8 800 550-32-69</a>
          </div>
        </div>
      </div>
    </div>
  )
}

MainMenu.propTypes = {
  isOpenMainMenu: PropTypes.bool.isRequired,
  headerOffsetBottom: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired
}

const mapStateToolProps = state => {
  return {
    isOpenMainMenu: state.layout.isOpenMainMenu,
    headerOffsetBottom: state.layout.headerOffsetBottom,
  }
}


export default connect(mapStateToolProps)(MainMenu)
