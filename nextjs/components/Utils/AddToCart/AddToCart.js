import React, {useCallback, useState} from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import PropTypes from "prop-types"

import { connect, useDispatch } from "react-redux"
import { hideModal, openModal } from "@actions/layout"
import { oneClickBuy } from "@api/order"
import { addToCart } from "@actions/cart"

import Message from "@components/Cards/Message/Message"
import ProductOneClick from "@components/Cards/ProductOneClick"
import Input from "@components/Forms/Input"
import Button from "@components/Forms/Button"

import CartIcon from "../../../public/icons/add-to-cart.svg"

import "./AddToCart.scss"

const initialForm = {
  NAME: "m24 mobile",
  TEL: "",
  METHOD: "boc",
  element_props: "",
  element_select_props: "",
  dubLetter: "a",
  paysystemId: 0,
  deliveryId: 0,
  personTypeId: 1,
  buyMode: "ONE",
  priceId: 1,
  currencyCode: "RUB",
  quantity: 1,
  REQUIRED: "NAME/TEL"
}

const OneClickModal = ({ product, inCart }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)

  const onFormChange = (event) => {
    setForm(prev => ({
      ...prev,
      [event.target.id]: event.target.value
    }))
  }

  const formHandler = (e) => {
    e.preventDefault()

    setLoading(true)

    oneClickBuy({
      ...form,
      ELEMENT_ID: product.id
    }).then(({ data }) => {
      setForm(initialForm)
      dispatch(openModal(
        <Message
          title="Ваша заявка успешно отправлена!"
          description="Менеджер свяжется с Вами в ближайшее время"
        />
      ))

      setLoading(false)
    })
  }

  const addToCartHandler = useCallback(() => {
    dispatch(hideModal())

    if(!inCart) {
      dispatch(addToCart({
        id: parseInt(product.id),
        quantity: 1
      }))
    }

    router.push("/cart")
  }, [inCart, product])

  return (
    <Message hideButton={true}>
      <ProductOneClick
        product={product}
      />
      <form className="one-click-form" onSubmit={formHandler}>
        <div className="one-click-form__input">
          <Input label="Ваш номер телефона" id="TEL" mask="+7 (999) 999-99-99" handler={onFormChange} />
        </div>
        <div className="one-click-form__button">
          <Button label="Купить в один клик" isLoading={loading} />
        </div>
      </form>
      <div className="one-click-form__add-to-cart">
        <Button label="В корзину" onClick={addToCartHandler} transparent={true}/>
      </div>
      <div className="one-click-form__text">
        Оформляя заказ, вы даёте согласие на<br/>
        <Link href="/content/agree/">обработку персональных данных</Link>
      </div>
    </Message>
  )
}

const AddToCart = ({ product, text, cartList }) => {
  const dispatch = useDispatch()

  const openModalHandler = () => {
    dispatch(openModal(
      <OneClickModal
        product={product}
        inCart={cartList.some(item => item.id === parseInt(product.id))}
      />
    ))
  }

  return (
    <div className="add-to-cart">
      <Button
        onClick={openModalHandler}
        label={text ? text : <CartIcon/>}
      />
    </div>
  )
}


AddToCart.propTypes = {
  product: PropTypes.object.isRequired,
  cartList: PropTypes.array.isRequired,
  text: PropTypes.string
}

const mapStateToolProps = state => {
  return {
    cartList: state.cart.list
  }
}

export default connect(mapStateToolProps)(AddToCart)
