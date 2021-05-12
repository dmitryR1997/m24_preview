import {useState} from "react"
import PropTypes from "prop-types"
import Cookies from "js-cookie"

import {useDispatch} from "react-redux"
import {useRouter} from "next/router"

import {addToCart} from "@actions/cart"

import Amount from "@components/Display/Amount";
import CatalogProduct from "@components/Cards/CatalogProduct"
import Button from "@components/Forms/Button"

import "./Complect.scss"

const Complect = ({product}) => {
  const [showText, setShowText] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  const addToCartHandler = () => {
    product.complect.forEach(item => {
      dispatch(addToCart({
        id: parseInt(item.id),
        old_id: parseInt(item.old_id),
        quantity: 1,
        roistat_visit: Cookies.get("roistat_visit")
      }))
    })

    router.push("/cart")
  }

  return (
    <article
      className="complect-card"
    >
      <h3 className="complect-card__title">
        {product.name}
      </h3>

      <div className="complect-card__discount">
        Выгода&nbsp;<span><Amount amount={product.price - product.minimal_price}/></span>
      </div>

      <div className="complect-card__product-list">
        {product.complect.map((item, key) => (
          <div key={key} className="complect-card__product-item">
            <CatalogProduct
              product={item}
              size="xs"
            />
          </div>
        ))}
      </div>

      <div className="complect-card__old-price">
        <Amount amount={product.price} old/>
      </div>

      <div className="complect-card__price">
        <Amount amount={product.minimal_price}/>
      </div>

      <div className="complect-card__add-to-card">
        <Button
          label="Купить"
          onClick={addToCartHandler}
        />
      </div>

      <div className="complect-card__show-text" onClick={() => setShowText(!showText)}>
        Условия акции
      </div>

      {showText &&
      <div className="complect-card__text">
        <div className="complect-card__text-title">
          Срок проведения
        </div>
        <div className="complect-card__text-area">
          <b>{product.preview_text}</b>
        </div>

        <div className="complect-card__text-title">
          Условия акции
        </div>
        <div className="complect-card__text-area">
          {product.detail_text}
        </div>

        <div className="complect-card__text-alert">
          <div className="alert alert--warning">
            Количество товаров ограничено. Так же состав и цена комплектов может меняться на усмотрение продавца.
          </div>
        </div>
      </div>
      }
    </article>
  )
}

Complect.propTypes = {
  product: PropTypes.object.isRequired
}


export default Complect
