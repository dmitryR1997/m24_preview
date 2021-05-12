import Link from "next/link"

import SiteLogo from "../../public/icons/site-logo.svg"
import FB from "../../public/icons/fb.svg"
import VK from "../../public/icons/vk.svg"
import OK from "../../public/icons/ok.svg"
import Instagram from "../../public/icons/instagram.svg"
import YouTube from "../../public/icons/youtube.svg"

import "./Footer.scss"

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <p className="footer__pre-text">Хотите оставаться в курсе новинок?</p>

        <div className="footer__social">
          <a href="https://www.facebook.com/massagery24/" target="_blank" className="footer__social-link">
            <FB/>
          </a>
          <a href="https://vk.com/massagery24/" target="_blank" className="footer__social-link">
            <VK/>
          </a>
          <a href="https://ok.ru/group/54165989097650/" target="_blank" className="footer__social-link">
            <OK/>
          </a>
          <a href="https://www.instagram.com/massagery24.ru/" target="_blank" className="footer__social-link">
            <Instagram/>
          </a>
          <a href="https://www.youtube.com/channel/UCEc8g8X6nl0nsS32OWXn9kg/" target="_blank" className="footer__social-link">
            <YouTube/>
          </a>
        </div>

        <Link
          href="/content/agree"
        >
          <a href="/content/agree" className="footer__info-link">
            Согласие на обработку персональных данных
          </a>
        </Link>

        <Link
          href="/content/personaldata"
        >
          <a href="/content/personaldata" className="footer__info-link">
            Политика в отношении обработки персональных данных
          </a>
        </Link>

        <div className="footer__copyright">
          <div className="footer__copyright-img">
            <SiteLogo/>
          </div>

          <div className="footer__copyright-text">
            © 2015-2021. Массажеры24.РФ. Все права защищены
          </div>
        </div>

        <div className="footer__warning">
          Обращаем ваше внимание на&nbsp;то, что данный интернет-сайт носит исключительно информационный характер и&nbsp;ни&nbsp;при каких условиях не&nbsp;является публичной офертой, определяемой положениями&nbsp;ч.&nbsp;2&nbsp;ст.&nbsp;437 Гражданского кодекса Российской Федерации.
        </div>
      </div>
    </div>
  )
}

export default Footer
