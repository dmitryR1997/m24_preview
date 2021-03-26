import React, { useState } from "react"
import { useRouter } from "next/router"
import PropTypes from "prop-types"

import { connect, useDispatch } from "react-redux"
import { openModal } from "@actions/layout"
import { clearCart } from "@actions/cart"
import { addOrder, addToCrm } from "@api/order"
import { getCartQuantity } from "../../selectors/cart"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import Message from "@components/Cards/Message"
import Input from "@components/Forms/Input"
import Radio from "@components/Forms/Radio"
import Button from "@components/Forms/Button"

import { isServer } from '../../env'

import "@styles/pages/OrderPage.scss"
import { fetchCategories } from "@api/category";

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  delivery: 3,
  pay: 1
}

const OrderPage = ({ cartList, cartQuantity, categories }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  if(cartList.length === 0 && !isServer) {
    router.push("/")
  }

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

    addOrder({
      ...form,
      ids: cartList.map(item => item.id)
    }).then(({ data }) => {
      if (data.status) {
        setForm(initialForm)
        dispatch(clearCart())
        dispatch(openModal(
          <Message
            title="Ваша заявка успешно отправлена!"
            description="Менеджер свяжется с Вами в ближайшее время"
          />
        ))

        setLoading(false)

        addToCrm(data.id)

        router.push("/")
      } else {
        dispatch(openModal(
          <Message
            title="Что-то пошло не так :("
            description="Повторите попыпытку позже"
          />
        ))
      }
    })
  }

  return (
    <Layout categories={categories}>
      <div className="order-page">
        <Container>
          <h1 className="order-page__title">
            Оформление заказа
          </h1>

          <form onSubmit={formHandler}>
            <div className="order-page__form">
              <div className="order-page__form-title">
                Ваши данные
              </div>
              <div className="order-page__form-group">
                <Input label="Ваше имя"
                       id="first_name"
                       handler={onFormChange}
                       value={form.first_name}
                />
              </div>
              {/*<div className="order-page__form-group">*/}
              {/*  <Input label="Ваша фамилия"*/}
              {/*         id="last_name"*/}
              {/*         handler={onFormChange}*/}
              {/*         value={form.last_name}*/}
              {/*  />*/}
              {/*</div>*/}
              {/*<div className="order-page__form-group">*/}
              {/*  <Input label="Ваш email"*/}
              {/*         id="email"*/}
              {/*         handler={onFormChange}*/}
              {/*         value={form.email}*/}
              {/*  />*/}
              {/*</div>*/}
              <div className="order-page__form-group">
                <Input label="Номер телефона"
                       id="phone"
                       handler={onFormChange}
                       value={form.phone}
                       mask="+7 (999) 999-99-99"
                />
              </div>

              <div className="order-page__form-title">
                Способы доставки
              </div>
              <div className="order-page__form-group">
                <Radio  label="Самовывоз"
                        id="delivery"
                        value={3}
                        handler={onFormChange}
                        checked={parseInt(form.delivery) === 3}
                />
              </div>
              <div className="order-page__form-group">
                <Radio  label="Доставка курьером"
                        id="delivery"
                        value={2}
                        handler={onFormChange}
                        checked={parseInt(form.delivery) === 2}
                />
              </div>
              {parseInt(form.delivery) === 2 &&
              <div className="order-page__form-group">
                <Input label="Адрес"
                       id="address"
                       handler={onFormChange}
                       value={form.address}
                />
              </div>
              }

              <div className="order-page__form-title">
                Способ оплаты
              </div>
              <div className="order-page__form-group">
                <Radio  label="Наличными курьеру"
                        id="pay"
                        value={1}
                        handler={onFormChange}
                        checked={parseInt(form.pay) === 1}
                />
              </div>
              <div className="order-page__form-group">
                <Radio  label="Курьеру банковской картой"
                        id="pay"
                        value={10}
                        handler={onFormChange}
                        checked={parseInt(form.pay) === 10}
                />
              </div>
            </div>
            <div className="order-page__continue">
              <Button
                label="Оформить"
                isLoading={loading}
              />
            </div>
          </form>
        </Container>
      </div>
    </Layout>
  )
}

OrderPage.propTypes = {
  cartList: PropTypes.array.isRequired,
  cartQuantity: PropTypes.number.isRequired
}

const mapStateToolProps = state => {
  return {
    cartList: state.cart.list,
    cartQuantity: getCartQuantity(state)
  }
}

export async function getStaticProps({ params }) {
  const categories = await fetchCategories()

  return {
    props: {
      categories: categories.data
    }
  }
}

export default connect(mapStateToolProps)(OrderPage)
