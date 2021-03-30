import React, {useCallback, useEffect, useState} from "react"
import Head from "next/head"
import Link from "next/link"
import { YMaps, Map, Clusterer, Placemark } from "react-yandex-maps"
import { useDispatch } from "react-redux"

import { openModal} from "@actions/layout"
import { fetchShops, getShopAddress } from "@api/shop"
import { fetchCategories } from "@api/category"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import { Tabs, Tab } from "@components/Surfaces/Tabs/Tabs"
import ShopCard from "@components/Cards/Shop"
import RealetedProducts from "@components/Utils/RealetedProducts"
import Message from "@components/Cards/Message/Message"
import Input from "@components/Forms/Input"
import Button from "@components/Forms/Button"

import FiveReasons from "@screens/FiveReasons"
import OfficialWaranty from "@screens/OfficialWaranty"
import ExpertsHelp from "@screens/ExpertsHelp"

import "@styles/pages/StaticPage.scss"
import "@styles/pages/Contacts.scss"


const GetShopAddresModal = ({ activeShop }) => {
  const dispatch = useDispatch()

  const [form, setForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const onFormChange = (event) => {
    const id = event.target.id
    let value = event.target.value

    if(id === "phone") {
      value = value.replace(/[^\d]/g, '').slice(1)
    }


    setForm(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const formHandler = (e) => {
    e.preventDefault()

    setLoading(true)

    getShopAddress({
      ...form,
      city: activeShop.city,
      shop_name: activeShop.title,
      adress: activeShop.address
    }).then(({ data }) => {
      setForm({})

      dispatch(openModal(
        <Message
          title="Ваша заявка успешно отправлена!"
          description="Менеджер свяжется с Вами в ближайшее время"
        />
      ))

      setLoading(false)
    })
  }


  return (
    <Message
      title="Получить адрес салона<br/>по sms"
      hideButton={true}
    >
      <form className="get-address-form" onSubmit={formHandler}>
        <div className="get-address-form__input">
          <Input label="Ваше имя" id="name" handler={onFormChange} />
        </div>
        <div className="get-address-form__input">
          <Input label="Ваш номер телефона" id="phone" mask="+7 (999) 999-99-99" handler={onFormChange} />
        </div>
        <div className="get-address-form__button">
          <Button label="Получить адрес салона" isLoading={loading} />
        </div>

        <div className="get-address-form__text">
          Оформляя заказ, вы даёте согласие на<br/>
          <Link href="/content/agree/">обработку персональных данных</Link>
        </div>
      </form>
    </Message>
  )
}

const ShopPage = ({ categories }) => {
  const dispatch = useDispatch()

  const [shops, setShops] = useState([])
  const [activeShop, setActiveShop] = useState({})

  useEffect(() => {
    fetchShops().then(({ data }) => {
      setShops(data.data)
    })
  }, [])

  const placemarkHandler = (e, shop) => {
    // const map = e.get("target").getMap()
    //
    // map.geoObjects.each(geoObject => {
    //   const geoObjects = geoObject.getGeoObjects()
    //
    //   geoObjects.map((point) => {
    //     console.l()
    //     point.options.set('iconColor', "#B2D92E")
    //   })
    // })
    //
    // e.get('target').options.set('iconColor', "red")

    setActiveShop(shop)
  }

  return (
    <Layout categories={categories}>
      <Head>
        <title>Где купить?</title>
        <meta name="description" content="Массажные кресла для дома в Москве, Белгороде, Воронеже, Екатеринбурге, Казани, Курске, Липецке, Орле, Ростове-на-Дону, Туле, Тюмени, Набережных Челнах" />
        <meta name="keywords" content="Массажное кресло купить, массажное кресло посмотреть, массажное кресло для дома в Москве, массажное кресло в Москве" />
      </Head>

      <div className="static-page contacts-page">
        <Container>
          <h1 className="static-page__title">
            Магазины
          </h1>

          <div className="static-page__content">
            <div className="alert alert--success">
              Важно!<br/>
              Перед посещением<br/>
              уточните наличие по телефону<br/>
              <a href="tel:88002223160" className="roistat_phone" style={{ display: "block", marginTop: 10, fontSize: 18, fontWeight: 700, color: "rgba(141, 178, 16, 1)" }}>8 800 222-31-60</a>
            </div>

            <br/><br/>

            <Tabs>
              <Tab id={1} label="На карте">
                <YMaps>
                  <Map
                    defaultState={{
                      center: [55.751574, 37.573856],
                      zoom: 8,
                    }}
                  >
                    <Clusterer
                      options={{
                        preset: 'islands#invertedVioletClusterIcons',
                        groupByCoordinates: false,
                        clusterIconColor: "#B2D92E"
                      }}
                    >
                      {Object.keys(shops).map((key, i) => (
                        <Placemark
                          key={i}
                          geometry={shops[key].geo}
                          options={{
                            iconColor: "#B2D92E",
                          }}
                          onClick={(e) => placemarkHandler(e, shops[key])}
                        />
                      ))}
                    </Clusterer>
                  </Map>
                </YMaps>

                {activeShop.title &&
                  <>
                    <div className="contacts-page__shop">
                      {activeShop.title &&
                      <div className="contacts-page__shop-title">{activeShop.title}</div>
                      }

                      {activeShop.quarantine_cancel &&
                      <div
                        className="contacts-page__shop-work-time contacts-page__shop-work-time--red">{activeShop.quarantine_cancel}</div>
                      }

                      {activeShop.work_time &&
                      <div className="contacts-page__shop-work-time">{activeShop.work_time}</div>
                      }
                    </div>

                    <Button
                      label="Получить адрес по смс"
                      onClick={() =>
                        dispatch(openModal(
                          <GetShopAddresModal
                            activeShop={activeShop}
                          />
                        ))}
                    />
                  </>
                }
              </Tab>
              <Tab id={2} label="Список">
                {Object.keys(shops).map((key, i) => (
                  <ShopCard
                    image={shops[key].images[0]}
                    workTime={shops[key].work_time}
                    title={shops[key].title}
                    brands={shops[key].brands}
                  />
                ))}
              </Tab>
            </Tabs>
          </div>

        </Container>

        <div className="static-page__five-reasons">
          <Container>
            <FiveReasons/>
          </Container>
        </div>

        <div className="static-page__official-waranty">
          <OfficialWaranty/>
        </div>

        <div className="static-page__realeted-products">
          <RealetedProducts params={{ section_id: 69, random: true }}/>
        </div>

        <div className="static-page__experts-help">
          <ExpertsHelp/>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const categories = await fetchCategories()

  return {
    props: {
      categories: categories.data
    }
  }
}

export default ShopPage
