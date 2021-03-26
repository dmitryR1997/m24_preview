import React, { useEffect, useState } from "react"
import { YMaps, Map, Clusterer, Placemark } from "react-yandex-maps"

import { fetchShops } from "@api/shop"
import { fetchCategories } from "@api/category"

import Layout from "@components/Layout/Layout"
import Container from "@components/Layout/Container"
import { Tabs, Tab } from "@components/Surfaces/Tabs/Tabs"
import ShopCard from "@components/Cards/Shop"
import RealetedProducts from "@components/Utils/RealetedProducts"

import FiveReasons from "@screens/FiveReasons"
import OfficialWaranty from "@screens/OfficialWaranty"
import ExpertsHelp from "@screens/ExpertsHelp"

import "@styles/pages/StaticPage.scss"

const ShopPage = ({ categories }) => {
  const [shops, setShops] = useState([])

  useEffect(() => {
    fetchShops().then(({ data }) => {
      setShops(data.data)
    })
  }, [])

  return (
    <Layout categories={categories}>
      <div className="static-page">
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
                      zoom: 5,
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
                        <Placemark key={i} geometry={shops[key].geo} options={{iconColor: "#B2D92E"}} />
                      ))}
                    </Clusterer>
                  </Map>
                </YMaps>
              </Tab>
              <Tab id={2} label="Список">
                {Object.keys(shops).map((key, i) => (
                  <ShopCard
                    image={shops[key].images[0]}
                    workTime={shops[key].work_time}
                    title={shops[key].title}
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
