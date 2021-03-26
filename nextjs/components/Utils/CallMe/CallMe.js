import React, { useState, useEffect } from "react"
import classnames from "classnames"
import { LazyLoadImage } from "react-lazy-load-image-component"

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
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    link: window.location.href,
    pos: 0
  })

  const onFormChange = (event) => {
    setForm(prev => ({
      ...prev,
      [event.target.id]: event.target.value
    }))
  }

  const formHandler = (e) => {
    e.preventDefault()

    setLoading(true)
    callMe(form).then(({ data }) => {
      setLoading(false)

      dispatch(openModal(
        <Message
          title="Ваша заявка успешно отправлена!"
          description="Менеджер свяжется с Вами в ближайшее время"
        />
      ))
    })
  }

  return  (
    <Message
      title="Заказать звонок"
      hideButton
    >
      <form className="calll-me-form" onSubmit={formHandler}>
        <div className="calll-me-form__input">
          <Input label="Ваше имя" id="name" handler={onFormChange} />
        </div>
        <div className="calll-me-form__input">
          <Input label="Ваш номер телефона" id="phone" mask="+7 (999) 999-99-99" handler={onFormChange} />
        </div>
        <div className="calll-me-form__button">
          <Button label="Отправить" isLoading={loading} />
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
            <img width={24} height={24} src={icons[2]} alt="Chat image" />
          </div>
          <div className="call-me__list-item">
            <img width={24} height={24} src={icons[3]} alt="Chat image" />
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
