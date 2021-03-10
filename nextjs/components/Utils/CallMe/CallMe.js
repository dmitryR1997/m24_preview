import React, { useState } from "react"
import classnames from "classnames"

import CallIcon from "../../../public/icons/call-v2.svg"
import ChatIcon from "../../../public/icons/chat.svg"
import WhatsappIcon from "../../../public/icons/whatsapp.svg"
import TelegramIcon from "../../../public/icons/telegram.svg"

import CloseIcon from "../../../public/icons/close.svg"

import "./CallMe.scss"

const CallMe = () => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={classnames("call-me", {
        "call-me--is-open": open
      })}
    >
      <div className="call-me__list">
        <div className="call-me__list-item">
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
  )
}

export default CallMe
