import React, { useState, useEffect } from "react"
import Link from "next/link"
import classnames from "classnames"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Cookies from "js-cookie"
import { useForm, Controller  } from "react-hook-form"

import { useDispatch } from "react-redux"
import { openModal } from "@actions/layout"
import { callMe } from "@api/order"

import Message from "@components/Cards/Message/Message"
import Input from "@components/Forms/Input"
import Button from "@components/Forms/Button"

const icons = [
  require("../../../public/icons/call-v2.svg"),
  require("../../../public/icons/chat.svg"),
  require("../../../public/icons/whatsapp.svg"),
  require("../../../public/icons/telegram.svg"),
]

import CloseIcon from "../../../public/icons/close.svg"

import "./CallMe.scss"

const CallMeModal = () => {
  const { control, handleSubmit, errors } = useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const formHandler = (data) => {
    const initialForm = {
      link: window.location.href,
      pos: 0,
      roistat_visit: Cookies.get("roistat_visit")
    }

    const form = Object.assign(initialForm, data)

    // setLoading(true)

    callMe(form).then(({ data }) => {
      // setLoading(false)
    })

    dispatch(openModal(
      <Message
        title="Ваша заявка успешно отправлена!"
        description="Менеджер свяжется с Вами в ближайшее время"
      />
    ))
  }

  return  (
    <Message
      title="Заказать звонок"
      hideButton
    >
      <form className="call-me-form" onSubmit={handleSubmit(formHandler)}>
        <div className="call-me-form__input">
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ onChange, value }) =>
              <Input
                label="Ваше имя"
                id="name"
                handler={onChange}
                value={value}
                error={errors.name}
              />
            }
          />
        </div>

        <div className="call-me-form__input">
          <Controller
            name="phone"
            control={control}
            rules={{
              required: true,
              pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i
            }}
            defaultValue=""
            render={({ onChange, value }) =>
              <Input
                label="Ваш номер телефона"
                id="phone"
                mask="+7 (999) 999-99-99"
                handler={onChange}
                value={value}
                error={errors.phone}
              />
            }
          />
        </div>

        <div className="call-me-form__button">
          <Button label="Отправить" isLoading={loading} />
        </div>

        <div className="call-me-form__text">
          Оформляя заказ, вы даёте согласие на<br/>
          <Link href="/content/agree/">обработку персональных данных</Link>
        </div>
      </form>
    </Message>
  )
}

const CallMe = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [icon, setIcon] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setIcon(prev => {
        if (prev > 2) return 0

        return prev + 1
      })
    }, 5000)
  }, [])

  return (
    <>
      <div
        className={classnames("call-me", {
          "call-me--is-open": open
        })}
      >
        <div className="call-me__list">
          <div className="call-me__list-item" onClick={() => dispatch(openModal(<CallMeModal/>))}>
            <LazyLoadImage width={24} height={24} src={icons[0]} alt="Chat image" />
          </div>
          <div className="call-me__list-item" onClick={() => jivo_api.open()}>
            <img width={24} height={24} src={icons[1]} alt="Chat image" />
          </div>
          <div className="call-me__list-item">
            <a href="https://api.whatsapp.com/send?phone=+79253026880" target="_blank">
              <img width={24} height={24} src={icons[2]} alt="Chat image" />
            </a>
          </div>
          <div className="call-me__list-item">
            <a href="https://tele.click/Massagery24Bot" target="_blank">
              <img width={24} height={24} src={icons[3]} alt="Chat image" />
            </a>
          </div>
        </div>

        <div className="call-me__toggle" onClick={() => setOpen(!open)}>
          {!open
            ? <img width={24} height={24} src={icons[icon]} alt="Chat image" />
            : <CloseIcon/>
          }
        </div>
      </div>
    </>
  )
}

export default CallMe
