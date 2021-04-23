import React, {useEffect, useState} from "react"
import Cookies from "js-cookie"
import Head from "next/head"
import Link from "next/link"
import { useDispatch } from "react-redux"

import { Controller, useForm } from "react-hook-form"
import { Clusterer, Map, Placemark, YMaps } from "react-yandex-maps"

import {openModal} from "@actions/layout"
import {fetchShops, getShopAddress} from "@api/shop"
import {fetchCategories} from "@api/category"

import Layout from "@components/Layout/Layout"
import {Tab, Tabs} from "@components/Surfaces/Tabs/Tabs"
import ShopCard from "@components/Cards/Shop"
import RealetedProducts from "@components/Utils/RealetedProducts"
import Message from "@components/Cards/Message/Message"
import Input from "@components/Forms/Input"
import Button from "@components/Forms/Button"

import FiveReasons from "@screens/FiveReasons"
import ExpertsHelp from "@screens/ExpertsHelp"

const GetShopAddresModal = ({ activeShop }) => {
  const { control, handleSubmit, errors } = useForm()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const formHandler = (data) => {
    // setLoading(true)

    getShopAddress({
      ...(data),
      phone: data.phone.replace(/[^\d]/g, '').slice(1),
      city: activeShop.city,
      shop_name: activeShop.title,
      adress: activeShop.address,
      roistat_visit: Cookies.get("roistat_visit")
    }).then(({ data }) => {
      // setLoading(false)
    })

    dispatch(openModal(
      <Message
        title="Ваша заявка успешно отправлена!"
        description="Менеджер свяжется с Вами в ближайшее время"
      />
    ))
  }

  return (
    <Message
      title="Получить адрес салона<br/>по sms"
      hideButton={true}
    >
      <form className="get-address-form" onSubmit={handleSubmit(formHandler)}>
        <div className="get-address-form__input">
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

        <div className="get-address-form__input">
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

        <div className="get-address-form__button">
          <Button label="Получить адрес салона" isLoading={loading} />
        </div>

        <div className="get-address-form__text">
          Отправляя заявку, вы даёте согласие на<br/>
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

  const placemarkHandler = (e) => {
    const target = e.get("target")
    const map = target.getMap()

    map.geoObjects.each(geoObject => {
      const geoObjects = geoObject.getGeoObjects()

      geoObjects.map(point => {
        point.options.set("preset", "islands#icon")
        point.options.set("iconColor", "#B2D92E")
      })
    })

    setTimeout(() => {
      target.options.set("preset", "islands#dotIcon")
      target.options.set("iconColor", "#006400")
    }, 0)
  }

  return (
    <Layout categories={categories}>
      <Head>
        <title>Где купить?</title>
        <meta name="description" content="Массажные кресла для дома в Москве, Белгороде, Воронеже, Екатеринбурге, Казани, Курске, Липецке, Орле, Ростове-на-Дону, Туле, Тюмени, Набережных Челнах" />
        <meta name="keywords" content="Массажное кресло купить, массажное кресло посмотреть, массажное кресло для дома в Москве, массажное кресло в Москве" />
      </Head>

      <div className="static-page contacts-page">
        <div className="container">
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
                            iconColor: "#B2D92E"
                          }}
                          onClick={(e) => { placemarkHandler(e); setActiveShop(shops[key])}}
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

                    <div className="contacts-page__get-address">
                      <Button
                        label="Получить адрес по SMS"
                        onClick={() =>
                          dispatch(openModal(
                            <GetShopAddresModal
                              activeShop={activeShop}
                            />
                          ))}
                      />
                    </div>
                  </>
                }
              </Tab>

              <Tab id={2} label="Список">
                {Object.keys(shops).map((key, i) => (
                  <>
                    <ShopCard
                      key={key}
                      image={shops[key].images[0]}
                      workTime={shops[key].work_time}
                      title={shops[key].title}
                      brands={shops[key].brands}
                    />
                    <div className="contacts-page__get-address">
                      <Button
                        label="Получить адрес по SMS"
                        size="xs"
                        onClick={() =>
                          dispatch(openModal(
                            <GetShopAddresModal
                              activeShop={shops[key]}
                            />
                          ))}
                      />
                    </div>
                  </>
                ))}
              </Tab>
            </Tabs>
          </div>

        </div>

        <div className="static-page__five-reasons">
          <div className="container">
            <FiveReasons/>
          </div>
        </div>

        {/*<div className="static-page__official-waranty">*/}
        {/*  <OfficialWaranty/>*/}
        {/*</div>*/}

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
