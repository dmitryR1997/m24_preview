import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import Cookies from "js-cookie"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm, Controller } from "react-hook-form"

import { connect, useDispatch } from "react-redux"
import { hideModal, openModal } from "@actions/layout"
import { oneClickBuy, addPreOrder } from "@api/order"
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
  const { control, handleSubmit, errors } = useForm()

  const router = useRouter()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)


  const formHandler = (data) => {
    const form = Object.assign(initialForm, data)

    // setLoading(true)

    oneClickBuy({
      ...form,
      ELEMENT_ID: parseInt(product.old_id),
      roistat_visit: Cookies.get("roistat_visit")
    }).then(({ data }) => {
      // setLoading(false)
    })

    dispatch(openModal(
      <Message
        classes="order-success"
        title="Ваша заявка успешно отправлена!"
        description="Менеджер свяжется с Вами в ближайшее время"
      />
    ))
  }

  const addToCartHandler = useCallback(() => {
    dispatch(hideModal())

    if(!inCart) {
      dispatch(addToCart({
        id: parseInt(product.id),
        old_id: parseInt(product.old_id),
        quantity: 1,
        roistat_visit: Cookies.get("roistat_visit")
      }))
    }

    router.push("/cart")
  }, [inCart, product])

  return (
    <Message hideButton={true}>
      <ProductOneClick
        product={product}
      />

      <form className="one-click-form" onSubmit={handleSubmit(formHandler)}>
        <div className="one-click-form__input">
          <Controller
            name="TEL"
            control={control}
            rules={{
              required: true,
              pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i
            }}
            defaultValue=""
            render={({ onChange, value }) =>
              <Input
                label="Ваш номер телефона"
                id="TEL"
                mask="+7 (999) 999-99-99"
                handler={onChange}
                value={value}
                error={errors.TEL}
              />
            }
          />
        </div>
        <div className="one-click-form__button">
          <Button label="Купить в один клик" isLoading={loading} />
        </div>
      </form>

      <div className="one-click-form__add-to-cart">
        <Button
          classes="add-to-cart-button"
          label="В корзину"
          onClick={addToCartHandler}
          transparent={true}
        />
      </div>

      <div className="one-click-form__text">
        Оформляя заказ, вы даёте согласие на<br/>
        <Link href="/content/agree/">обработку персональных данных</Link>
      </div>
    </Message>
  )
}

const PreOrderModal = ({ product }) => {
  const { control, handleSubmit, errors } = useForm()

  const router = useRouter()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const formHandler = (data) => {
    const form = Object.assign({
      name: "m24_mobile",
      product: product.name,
      product_id: product.old_id,
      price: product.price,
      roistat_visit: Cookies.get("roistat_visit")
    }, data)

    // setLoading(true)

    addPreOrder({
      ...form,
      ELEMENT_ID: parseInt(product.old_id)
    }).then(({ data }) => {
      // setLoading(false)
    })

    dispatch(openModal(
      <Message
        classes="preorder-success"
        title="Ваша заявка успешно отправлена!"
        description="Менеджер свяжется с Вами в ближайшее время"
      />
    ))
  }

  return (
    <Message hideButton={true}>
      <ProductOneClick
        product={product}
      />
      <form className="one-click-form" onSubmit={handleSubmit(formHandler)}>
        <div className="one-click-form__input">
          <Controller
            name="tel"
            control={control}
            rules={{
              required: true,
              pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i
            }}
            defaultValue=""
            render={({ onChange, value }) =>
              <Input
                label="Ваш номер телефона"
                id="tel"
                mask="+7 (999) 999-99-99"
                handler={onChange}
                value={value}
                error={errors.tel}
              />
            }
          />
        </div>
        <div className="one-click-form__button">
          <Button label="Предзаказ" isLoading={loading} />
        </div>
      </form>

      <div className="one-click-form__text">
        Заказывая товар, вы даёте согласие на<br/>
        <Link href="/content/agree/">обработку персональных данных</Link>
      </div>
    </Message>
  )
}

const AddToCart = ({ product, text, cartList }) => {
  const dispatch = useDispatch()

  const openModalHandler = () => {
    if((product.quantity > 0) || (product.can_buy_zero === "Y")) {
      dispatch(openModal(
        <OneClickModal
          product={product}
          inCart={cartList.some(item => item.id === parseInt(product.id))}
        />
      ))
    } else {
      dispatch(openModal(
        <PreOrderModal
          product={product}
        />
      ))
    }
  }

  return (
    <Button
      onClick={openModalHandler}
      label={text ? text : <CartIcon/>}
    />
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
