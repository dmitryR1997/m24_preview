import React, { useState } from "react"
import classnames from "classnames"

import CallIcon from "../../../public/icons/call-v2.svg"
import ChatIcon from "../../../public/icons/chat.svg"
import WhatsappIcon from "../../../public/icons/whatsapp.svg"
import TelegramIcon from "../../../public/icons/telegram.svg"

import CloseIcon from "../../../public/icons/close.svg"

import "./CallMe.scss"
import Message from "@components/Cards/Message/Message";
import Input from "@components/Forms/Input";
import Button from "@components/Forms/Button";
import {openModal} from "@actions/layout";
import {useDispatch} from "react-redux";
import {callMe} from "@api/order";

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

  return (
    <>
      <div
        className={classnames("call-me", {
          "call-me--is-open": open
        })}
      >
        <div className="call-me__list">
          <div className="call-me__list-item" onClick={() => dispatch(openModal(<CallMeModal/>))}>
            <CallIcon/>
          </div>
          <div className="call-me__list-item" onClick={() => jivo_api.open()}>
            <ChatIcon/>
          </div>
          <div className="call-me__list-item">
            <WhatsappIcon/>
          </div>
          <div className="call-me__list-item">
            <TelegramIcon/>
          </div>
        </div>

        <div className="call-me__toggle" onClick={() => setOpen(!open)}>
          {!open ? <CallIcon/> : <CloseIcon/>}
        </div>
      </div>
    </>
  )
}

export default CallMe
