import React, { useState } from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"
import { useForm, Controller } from "react-hook-form"

import { connect, useDispatch } from "react-redux"
import { openModal } from "@actions/layout"
import { clearCart } from "@actions/cart"
import { addOrder, addToCrm } from "@api/order"
import { fetchCategories } from "@api/category"
import { getCartQuantity } from "../../selectors/cart"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import Message from "@components/Cards/Message"
import Input from "@components/Forms/Input"
import Radio from "@components/Forms/Radio"
import Button from "@components/Forms/Button"

import { isServer } from '../../env'

import "@styles/pages/OrderPage.scss"

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
  const { control, handleSubmit, errors } = useForm()
  const router = useRouter()
  const dispatch = useDispatch()

  if(cartList.length === 0 && !isServer) {
    // router.push("/")
  }

  const [loading, setLoading] = useState(false)

  const formHandler = (data) => {
    const form = Object.assign(initialForm, data)

    addOrder({
      ...form,
      ids: cartList.map(item => item.id)
    }).then(({ data }) => {
      if (data.status) {
        setForm(initialForm)

        dispatch(clearCart())
        dispatch(openModal(
          <Message
            classes="order-success"
            title="Ваша заявка успешно отправлена!"
            description="Менеджер свяжется с Вами в ближайшее время"
          />
        ))

        setLoading(false)

        addToCrm(data.id)

        // router.push("/")
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

          <form onSubmit={handleSubmit(formHandler)}>
            <div className="order-page__form">
              <div className="order-page__form-title">
                Ваши данные
              </div>

              <div className="order-page__form-group">
                <Controller
                  name="first_name"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                  render={({ onChange, value }) =>
                    <Input  label="Ваше имя"
                            id="first_name"
                            handler={onChange}
                            value={value}
                            error={errors.first_name}
                  />}
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
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i
                  }}
                  defaultValue=""
                  render={({ onChange, value }) =>
                    <Input label="Номер телефона"
                           id="phone"
                           handler={onChange}
                           value={value}
                           mask="+7 (999) 999-99-99"
                           error={errors.phone}
                    />}
                />
              </div>

              <div className="order-page__form-title">
                Способы доставки
              </div>
              <Controller
                name="delivery"
                control={control}
                defaultValue={2}
                render={props =>
                  <>
                    <div className="order-page__form-group">
                      <Radio  label="Самовывоз"
                              id="delivery"
                              value={2}
                              handler={e => props.onChange(parseInt(e.target.value))}
                              checked={props.value === 2}
                      />
                    </div>
                    <div className="order-page__form-group">
                      <Radio  label="Доставка курьером"
                              id="delivery"
                              value={1}
                              handler={e => props.onChange(parseInt(e.target.value))}
                              checked={props.value === 1}
                      />
                    </div>
                  </>
                  }
              />

              {/*{parseInt(form.delivery) === 2 &&*/}
              {/*<div className="order-page__form-group">*/}
              {/*  <Input label="Адрес"*/}
              {/*         id="address"*/}
              {/*         handler={onFormChange}*/}
              {/*         value={form.address}*/}
              {/*  />*/}
              {/*</div>*/}
              {/*}*/}

              <div className="order-page__form-title">
                Способ оплаты
              </div>
              <Controller
                name="pay"
                control={control}
                defaultValue={1}
                render={props =>
                  <>
                    <div className="order-page__form-group">
                      <Radio  label="Наличными курьеру"
                              id="pay"
                              value={1}
                              handler={e => props.onChange(parseInt(e.target.value))}
                              checked={props.value === 1}
                      />
                    </div>
                    <div className="order-page__form-group">
                      <Radio  label="Курьеру банковской картой"
                              id="pay"
                              value={12}
                              handler={e => props.onChange(parseInt(e.target.value))}
                              checked={props.value === 12}
                      />
                    </div>
                  </>
                }
              />
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
