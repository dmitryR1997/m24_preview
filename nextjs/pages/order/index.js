import React, { useState } from "react"
import PropTypes from "prop-types"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useForm, Controller } from "react-hook-form"

import { connect, useDispatch } from "react-redux"
import { openModal } from "@actions/layout"
import { clearCart } from "@actions/cart"
import { addOrder, addToCrm } from "@api/order"
import { fetchCategories } from "@api/category"

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

const OrderPage = ({ cartList, categories }) => {
  const { control, handleSubmit, errors } = useForm()
  const router = useRouter()
  const dispatch = useDispatch()

  if(cartList.length === 0 && !isServer) {
    router.push("/")
  }

  const [loading, setLoading] = useState(false)

  const formHandler = (data) => {
    const form = Object.assign(initialForm, data)

    setLoading(true)

    addOrder({
      ...form,
      ids: cartList.map(item => item.id),
      roistat_visit: Cookies.get("roistat_visit")
    }).then(({ data }) => {
      if (data.status) {
        dispatch(clearCart())
        setLoading(false)
        addToCrm(data.id, data.roistat_visit)
        router.push("/")
        setTimeout(() => {
          dispatch(openModal(
            <Message
              classes="order-success"
              title="Ваша заявка успешно отправлена!"
              description="Менеджер свяжется с Вами в ближайшее время"
            />
          ))
        }, 0)
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
        <div className="container">
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

                    {props.value === 1 &&
                    <div className="order-page__form-group">
                      <Controller
                        name="address"
                        control={control}
                        rules={{
                          required: true
                        }}
                        defaultValue=""
                        render={({onChange, value}) =>
                          <Input label="Адрес"
                                 id="address"
                                 handler={onChange}
                                 value={value}
                                 error={errors.address}
                          />}
                      />
                    </div>
                    }
                  </>
                  }
              />

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
                isBlock={true}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

OrderPage.propTypes = {
  cartList: PropTypes.array.isRequired
}

const mapStateToolProps = state => {
  return {
    cartList: state.cart.list
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
