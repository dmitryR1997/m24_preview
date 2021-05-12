import "./BeforeHeader.scss"

const BeforeHeader = () => {
  return (
    <div className="before-header">
      <div className="container">
        <div className="before-header__wrapper">
          <div className="before-header__free-delivery">
            Бесплатная<br/>
            доставка по России
          </div>
          <div className="before-header__info">
            <a href="tel:88005503269" className="before-header__info-tel d-block text-decoration-none roistat_phone">
              8 800 550-32-69
            </a>
            <div className="before-header__info-time-work">
              Ежедневно с 9.00 до 21.00
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeforeHeader
