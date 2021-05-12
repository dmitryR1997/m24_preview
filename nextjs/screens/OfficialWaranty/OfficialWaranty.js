import Link from "next/link"

import "./OfficialWaranty.scss"

const OfficialWaranty = () => {
  return (
    <div className="container">
      <Link href="/content/warranty-and-service">
        <section className="official-waranty">
          <div className="official-waranty__title">
            Официальная<br/>
            гарантия
          </div>
          <div className="official-waranty__description">
            В нашем магазине мы продаем только сертифицированный товар с гарантией производителя. Все товары легально завезены в Россию, и имеют сертификаты соответствия.
          </div>
          <div className="official-waranty__link">
            <Link href="/content/warranty-and-service">Подробее</Link>
          </div>
        </section>
      </Link>
    </div>
  )
}

export default OfficialWaranty
