import React, { useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useForm, Controller } from "react-hook-form"

import { connect, useDispatch } from "react-redux"
import { openModal } from "@actions/layout"
import { clearCart } from "@actions/cart"
import { addOrder, addToCrm } from "@api/order"
import { fetchCategories } from "@api/category"

import Layout from "@components/Layout/Layout"
import Message from "@components/Cards/Message"
import Input from "@components/Forms/Input"
import Button from "@components/Forms/Button"
import Checkbox from "@components/Forms/Checkbox/Checkbox"
import SingleRangeInput from "@components/Forms/SingleRangeInput"

import num_word from "@utils/NumWord"

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  delivery: 3,
  pay: 1
}

const GetcreditPage = ({ categories }) => {
  const { control, handleSubmit, errors } = useForm()
  const router = useRouter()
  const dispatch = useDispatch()

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
      <div className="getcredit-page">
        <div className="container">
          <h1 className="getcredit-page__title">
            Заявка на рассрочку
          </h1>

          <form onSubmit={handleSubmit(formHandler)} className="getcredit-page__form">
            <div className="getcredit-page__form-range">
              <Controller
                name="credit_sum"
                control={control}
                defaultValue={1}
                render={({ onChange, value }) =>
                  <SingleRangeInput min={1}
                                    max={24}
                                    value={parseInt(value)}
                                    label="Срок рассрочки"
                                    valueLabel={ num_word(value, [" месяц", " месяца", " месяцев"]) }
                                    setter={onChange}
                  />}
              />
            </div>

            <div className="getcredit-page__form-range">
              <Controller
                name="start_sum"
                control={control}
                defaultValue={1}
                render={({ onChange, value }) =>
                  <SingleRangeInput min={1}
                                    max={100}
                                    value={parseInt(value)}
                                    label="Первоначальный платеж"
                                    valueLabel="%"
                                    setter={onChange}
                  />}
              />
            </div>

            <div className="getcredit-page__form-group">
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

            <div className="getcredit-page__form-group">
              <Controller
                name="last_name"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ onChange, value }) =>
                  <Input  label="Фамилия"
                          id="last_name"
                          handler={onChange}
                          value={value}
                          error={errors.last_name}
                  />}
              />
            </div>

            <div className="getcredit-page__form-group">
              <Controller
                name="middle_name"
                control={control}
                render={({ onChange, value }) =>
                  <Input  label="Отчество"
                          id="middle_name"
                          handler={onChange}
                          value={value}
                  />}
              />
            </div>

            <div className="getcredit-page__form-group">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ onChange, value }) =>
                  <Input  label="Ваш email"
                          id="email"
                          handler={onChange}
                          value={value}
                          error={errors.email}
                  />}
              />
            </div>

            <div className="getcredit-page__form-group">
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

            <Controller
              name="agree-age"
              control={control}
              defaultValue={2}
              render={props =>
                <div className="getcredit-page__form-check">
                  <Checkbox label="Мне исполнилось 18 лет"
                            id="agree-age"
                            handler={e => props.onChange(parseInt(e.target.value))}
                  />
                </div>
                }
            />

            <Controller
              name="agree-policy"
              control={control}
              defaultValue={2}
              render={props =>
                <div className="getcredit-page__form-check">
                  <Checkbox label="Я даю согласие на обработку моих персональных данных"
                            id="agree-policy"
                            handler={e => props.onChange(parseInt(e.target.value))}
                  />
                </div>
              }
            />

            <div className="getcredit-page__form-button">
              <Button
                label="Отправить заявку"
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

GetcreditPage.propTypes = {
}

const mapStateToolProps = state => {
  return {
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

export default connect(mapStateToolProps)(GetcreditPage)
