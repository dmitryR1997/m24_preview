import React from "react"
import Link from "next/link"
import { Fade } from "react-awesome-reveal"

import Container from "@components/Layout/Container"

import "./OfficialWaranty.scss"

const OfficialWaranty = () => {
  return (
    <Container>
      <section className="official-waranty">
        <div className="official-waranty__title">
          Официальная<br/>
          гарантия
        </div>
        <div className="official-waranty__description">
          В нашем магазине мы продаем только сертифицированный товар с гарантией производителя. Все товары легально завезены в Россию, и имеют сертификаты соответствия.
        </div>
        <div className="official-waranty__link">
          <Link href="/">Подробее</Link>
        </div>
      </section>
    </Container>
  )
}

export default OfficialWaranty
