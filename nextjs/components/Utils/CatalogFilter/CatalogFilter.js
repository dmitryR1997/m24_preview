import React, { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import debounce from "lodash.debounce"


import { connect, useDispatch } from "react-redux"
import { toggleCatalogFilter } from "@actions/layout"

import { fetchMinMaxPrices } from "@api/category"

import Container from "@components/Layout/Container"
import Accordion from "@components/Surfaces/Accordion"
import RangeInput from "@components/Forms/RangeInput"
import Checkbox from "@components/Forms/Checkbox/Checkbox"

import CloseIcon from "../../../public/icons/close.svg"

import "./CatalogFilter.scss"
import {fetchBrands} from "@api/brand";
import Button from "@components/Forms/Button";
import {updateFilter} from "@actions/filter";

const CatalogFilter = ({ isOpenCatalogFilter, filter, toggleCatalogFilter, sectionId }) => {
  const dispatch = useDispatch()

  const [minMaxPrices, setMinMaxPrices] = useState(false)
  const [brands, setBrands] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [price, setPrice] = useState({})


  const priceChangeHandler = (value) => {
    if (minMaxPrices.min === value[0] && minMaxPrices.max === value[1]) return

    setPrice(value)
    dispatch(updateFilter({ field: "price", value }))
  }

  const delayedPriceChangeHandler = useCallback(debounce(priceChangeHandler, 500), [minMaxPrices]);

  const checkboxHandler = (e) => {
    const checked = e.target.checked
    const name = e.target.name
    const value = e.target.value

    let newValue

    if(checked) {
      if (filter.hasOwnProperty(name)) {
        newValue = [...filter[name], value]
      } else {
        newValue = [value]
      }
    } else {
      if (filter.hasOwnProperty(name)) {
        const needleArray = filter[name]
        const needleIndex = needleArray.indexOf(value)

        if (needleIndex > -1) {
          needleArray.splice(needleIndex, 1)
          newValue = needleArray
        }
      }
    }

    if (!newValue) return

    dispatch(updateFilter({
      field: name,
      value: newValue
    }))
  }

  useEffect(() => {
    fetchMinMaxPrices(sectionId).then(({ data }) => {
      setMinMaxPrices(data)
    })

    fetchBrands({
      "page_size": 1000
    }).then(({ data }) => {
      setBrands(data)
    })
  }, [sectionId])


  return (
    <div
      className={classnames("catalog-filter", {
        "catalog-filter--open": isOpenCatalogFilter
      })}
    >
      <div className="catalog-filter__header">
        <Container>
          <div className="catalog-filter__header-inner">
            <div className="catalog-filter__header-title">
              Фильтр
            </div>
            <div className="catalog-filter__header-close" onClick={toggleCatalogFilter}>
              <CloseIcon/>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="catalog-filter__list">
          <Accordion>
            <div
              id="price-filter"
              label="Цена"
            >
              {minMaxPrices && minMaxPrices.min !== minMaxPrices.max &&
                <RangeInput
                  {...minMaxPrices}
                  setter={(value) => delayedPriceChangeHandler(value)}
                  values={price}
                />
              }
            </div>

            <div
              id="country-filter"
              label="Производство"
            >
              <select name="country">
                <option value={false}>Все</option>
                <option value="939b48ed16841e78a14cc659bc54e77c">ЕС</option>
                <option value="4fd684e177987d3f0ad832fbe2e0a1cb">США</option>
                <option value="f8d15d5559a2b6149518e08b45564e38">Швейцария</option>
                <option value="8fe39cd3d263993b80c20d1482ef67a3">Израиль</option>
                <option value="fec236cb353ed4f8c95391216528b76f">Германия</option>
                <option value="36b0b095e30da01fe5249e0dc0deb588">Китай</option>
                <option value="e80b59cccaa483cdd25007bdf4241eef">Япония</option>
                <option value="3c1ad5f833191441147012d4e91bc7c1">Малайзия</option>
                <option value="99be931f68dc638748fb48fd62414f70">Тайвань</option>
                <option value="32f21188a6ff3dbeea2c5a0ad22273ab">Сингапур</option>
                <option value="405b7bcbd3d6505190bd7e687d9f5eee">Южная Корея</option>
                <option value="d98b1d0fdd223d65c270fce88091b976">Россия</option>
              </select>
            </div>

            <div
              id="manufacturer-filter"
              label="Производитель"
            >
              <div className="catalog-filter__grid catalog-filter__grid catalog-filter__grid--x2">
                {brands.map((brand, key) => (
                  <div key={key} className="catalog-filter__grid-item">
                    <Checkbox label="Casada"
                              image={brand.image}
                              id={brand.id}
                              name="MANUFACTURER"
                              onClick={checkboxHandler}
                    />
                  </div>
                ))}
              </div>
            </div>

          </Accordion>

          {showMore &&
          <Accordion>
            <div
              id="color-filter"
              label="Цвет"
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="зеленый"
                            id="47a076ffbcc90c31550adfccb570713c"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="чёрный"
                            id="86f12495e1a13f5aa73d46fd3d55dfa5"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="кремовый"
                            id="b1e70ba0af615e29dd784bd9681ffcd3"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="бежевый"
                            id="6c712a637dfa198220717f50b8b6453e"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="графитовый"
                            id="71152242c46b852a6ce13f6622edd29e"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="красный"
                            id="14ad13ed8e8a774debe0932abd8557d1"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="коричневый"
                            id="ab715ffe0ff57761156b22a7e3d18f40"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="хаки"
                            id="43578e37168a162af40e219398dd2c7b"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="серый"
                            id="ba2078ae8c4b017f8d078c278012adc8"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="белый"
                            id="572b4b9ec584390b52708b28f1e61743"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="бело-рыжий"
                            id="fb294bcd7015c8d1bbf05e2c58d41206"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="бело-чёрный"
                            id="29af006d42ba1b0b57fe8aaa17be97c9"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="белый"
                            id="572b4b9ec584390b52708b28f1e61743"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="бело-рыжий"
                            id="fb294bcd7015c8d1bbf05e2c58d41206"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="бело-чёрный"
                            id="29af006d42ba1b0b57fe8aaa17be97c9"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="бело-бежевый"
                            id="46f4047419f80f7b6c69e79cea714083"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="бежево-коричневый"
                            id="ad91eb16a45408e3c9a68e0e02b01f85"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="чёрно-красный"
                            id="5e21b3b60f9572347df5062078bad8f5"
                            name="P14"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>

            <div
              id="cover-filter"
              label="Материал обшивки"
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Кожа"
                            id="e9bdacac6fd16b07531e3cdc61457aef"
                            name="cover"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Эко-кожа"
                            id="a79814a284bbdb7a2990219ed4fea69f"
                            name="cover"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Полиуретан"
                            id="f382a8ab618217478dc5b809602d49ad"
                            name="cover"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Текстиль"
                            id="ebca046571f4e8cf28d553cf7f9eb14a"
                            name="cover"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="SolidTex"
                            id="58f0ff451023a273183e6422537dd4a1"
                            name="cover"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>

            <div
              id="type-chairs-filter"
              label="Тип кресла"
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Многофункциональное"
                            id="199bbaa1f4fb9798ac03514290e4b1ee"
                            name="chair_type"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Офисное"
                            id="b6e30f6e3fc3c31bc11562757efd4051"
                            name="chair_type"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Реклайнер"
                            id="22d65bcb64d1d02f8bd3110190a0abfe"
                            name="chair_type"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Кресло-качалка"
                            id="4b0d8c3af4707c13359e857669caa336"
                            name="chair_type"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>

            <div
              id="color-solution-filter"
              label="Цветовое решение"
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Светлое"
                            id="6277a0ec84c7436b1a2ba9f360e76814"
                            name="P16"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Темное"
                            id="6c4adbdedf72a1fdf15e62e7b2d8385a"
                            name="P16"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Цветное"
                            id="39dc0af4b7b78d120ff0cb285282edce"
                            name="P16"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Кресло-качалка"
                            id="4b0d8c3af4707c13359e857669caa336"
                            name="P16"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>

            <div
              id="type-massage-foot-filter"
              label="Типы массажа ног"
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="3D роликовый"
                            id="1e4699dd0f78cdfed11cdd1fddbedbab"
                            name="P20"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Воздушно компрессионный массаж стоп"
                            id="40653410eeb80ce94145c684a051b7de"
                            name="P20"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Воздушно компрессионный массаж икр"
                            id="7e15b5d3ae99aecd8ef155dfabf6ce3c"
                            name="P20"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Роликовый массаж стоп"
                            id="859949c4241aaa58d2aa730541e9622c"
                            name="P20"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Роликовый массаж икр"
                            id="019a1caad91dc1b518f2915fde032f63"
                            name="P20"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Прогрев стоп"
                            id="00f93bf10673fc33616103a9fcbbf407"
                            name="P20"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Прогрев икр"
                            id="1573ba2890f2227847c9284093667ed9"
                            name="P20"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Тайский"
                            id="f7e07ef5522de702fbc189a0968dadf3"
                            name="P20"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Магнитная терапия"
                            id="75b0b5152f1fd3a3ebd261febbcbb030"
                            name="P20"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>

            <div
              id="functional-filter"
              label="Функционал"
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Сканирование"
                            id="707edcff42d8a596673329e29227ad87"
                            name="P22"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Прогревание"
                            id="9cf345b6b030801a2315af81871ea0dc"
                            name="P22"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Вытяжка позвоночника"
                            id="e58ac710299fe678431ff248422fc274"
                            name="P22"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Функция невесомости"
                            id="f950d8f61caaf8b97bd0c57f30c59358"
                            name="P22"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Функция отъезда от стены"
                            id="80af8c5fcd6be0210c64bf4f7a62c484"
                            name="P22"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Регулировка под рост"
                            id="ed2d2ae3762a4667bbd3af92d136f4c9"
                            name="P22"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Управление со смартфона"
                            id="ea2b5fcffdf399dc05db1b1c09107b13"
                            name="P22"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Светотерапия"
                            id="a57d1119e8c0dc1fe610125808e2df81"
                            name="P22"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Озонирование воздуха"
                            id="2364dc1388303924a9b61765ed5c4db4"
                            name="P22"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Музыка"
                            id="fe2bb2201989586479fb202a9f78620e"
                            name="P22"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Запоминание программ"
                            id="09ab092c5ec8c03c3af4eff440054987"
                            name="P22"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Магнитная терапия"
                            id="74fdedea3988e7b3e9be543a987a0a94"
                            name="P22"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Авто-реверс"
                            id="6c7da8efe40371394131a2a31a9e863e"
                            name="P22"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>

            <div
              id="massage-area-filter"
              label="Области массажа"
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж головы"
                            id="76dd33c35439930a05601a18ee950d9c"
                            name="P21"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж шеи"
                            id="29989a98d03a2155c9d27dd7cf6f6568"
                            name="P21"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж плеч"
                            id="190409a4c27f80464ea73a75980ea520"
                            name="P21"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж спины"
                            id="05164be090d82a533e1afcd52faf4dbf"
                            name="P21"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж поясницы"
                            id="28e53054558ca8126d179adc341a8965"
                            name="P21"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж крестца"
                            id="5886a8026ecc50b9c2c6c167680ccc2b"
                            name="P21"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж бедер и ягодиц"
                            id="49366cb27a7f385a5ff0c230a0b0fff5"
                            name="P21"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж голеней"
                            id="ea42b0b135ab6b2ee2b7f14230db6259"
                            name="P21"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж икр ног"
                            id="250a43e6121d11c5bda3371c6856e506"
                            name="P21"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж стоп"
                            id="e9c6b82eaee3a2654faa9f1f8b69e732"
                            name="P21"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж рук"
                            id="4f85362504ce36a9e31c51f3cd79ce0a"
                            name="P21"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж кистей рук"
                            id="73127c5b5563052f5bf31b0f158e34d5"
                            name="P21"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>

            <div
              id="zone-filter"
              label="Зоны прогрева"
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Бедра"
                            id="985b3b2ded474bfaf2ede858cf954fca"
                            name="P23"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Живот"
                            id="e16875cc7499b25f7399e2b52dfaf490"
                            name="P23"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Поясница"
                            id="7293650121f73cf275e01f0912d00aff"
                            name="P23"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Спина"
                            id="c0b21ea4fb0791923d57447cb13d8051"
                            name="P23"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Икры ног"
                            id="81fe3e7ad8083640f36ffeaffabe6dd6"
                            name="P23"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Стопы ног"
                            id="65131ed84f2de36308f616cbe4e72bed"
                            name="P23"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Колени"
                            id="13ce3857485d177ac4203fee297fb695"
                            name="P23"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>

            <div
              id="complectation-filter"
              label="По комплекции"
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для среднего роста и веса"
                            id="342faec47da92fe68e432ca992e2a27e"
                            name="P25"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для больших людей"
                            id="2cf4b902cb2ad2d041f9bd9f917758ae"
                            name="P25"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для высоких людей"
                            id="ae5695025623e6001209519459b61c4b"
                            name="P25"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Кресло-качалка"
                            id="4b0d8c3af4707c13359e857669caa336"
                            name="P25"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>

            <div
              id="type-filter"
              label="Тип"
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Автомобильные"
                            id="e3b649f18688e5a73156e6282260be64"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для дома"
                            id="06c53eddf5ac6cba3613729896ba7ebf"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для шеи"
                            id="6288d588981d4f79b513a56858b2bd63"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="На кресло"
                            id="9fda22aa6393226e04e4fa9656dae9c8"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Роликовые"
                            id="8be9d25ba1dbd87287908f70f2386a12"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="С подогревом"
                            id="d5093140c5420d729658eb26a5285e40"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для тела"
                            id="de6c072f5ad71104aee839677b5cddc4"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для глаз"
                            id="f24c68c84606a4999bbe9a43aa8913f4"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для головы"
                            id="17ca8a8bbd880bac0d122b1713e65ab9"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для шеи и плеч"
                            id="d8fa889062ec2a6bf562eb8df655aed1"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для рук"
                            id="cfdd6eb99736088d7d491f97bcc20fd8"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для лица"
                            id="ff01e1d7571c0a5ff33823bfe39343c2"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для живота"
                            id="aa519789cc25bbf360ee5c1d67dfddbe"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для беременных"
                            id="072744d94439a54a67e83db99f7e2055"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="С электроприводом"
                            id="fb2a60a404409521252c0102a413dfe6"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Столы складные"
                            id="613ef1660d4eb245f3e95c74f6c2bbeb"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Столы стационарные"
                            id="3d3169553c1ed2acd5006c034167f47a"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для икр"
                            id="b133278942853bc63f5a689aca0c5628"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для стоп"
                            id="d98a71ff77622a158fcc83eadd1a2104"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для голени"
                            id="06049cc01a009bd207423b21ec69fa4a"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для бедер"
                            id="9e93af49b9e0af54233a4b8e957d47b9"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Электрические"
                            id="9c97b7fb949d4d47073629e74b86c897"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Механические"
                            id="85a001ddde872106743d4122edf1dd10"
                            name="P26"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>

            <div
              id="corpus-material-filter"
              label="Материал каркаса"
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="SolidTex"
                            id="f34bcbd04aaea1da1464b408d5e60804"
                            name="P27"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Алюминий"
                            id="2e71959db299262f7118656720743633"
                            name="P27"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Масив дерева"
                            id="2f61f8a7730a9044f5e630472e5f84c1"
                            name="P27"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Металл"
                            id="84fc5976a130dc706348039c6ed3bfb4"
                            name="P27"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Сталь"
                            id="5464d6266c1e7f67aeff2f05abd98697"
                            name="P27"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>

            <div
              id="buttocks-massage-type-filter"
              label="Тип массажа ягодиц"
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Вибрационный"
                            id="caa3e20b03e00af87503235b95f8dd45"
                            name="P32"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Компрессионный"
                            id="cb015b577721db3a42ad65cfb320ec6c"
                            name="P32"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Роликовый"
                            id="42cfec75cab17130d0580446e7e92281"
                            name="P32"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>

            <div
              id="massage-type-filter"
              label="Типы массажа"
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Пузырьковый (джакузи)"
                            id="a28a911cda692b2009dd85cc7d3a5260"
                            name="P19"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж Гуаша"
                            id="8f81b28ea3f572bcb335635430efe508"
                            name="P19"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Роликовый массаж"
                            id="6a7be732da84783d6797b7d5f41b2a9e"
                            name="P19"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Воздушно-комп. массаж"
                            id="a836f8a5f11aca90d231cad5fbf72dd3"
                            name="P19"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Вибромассаж"
                            id="388bed5149c29d7207c3e8a8c3f47ae8"
                            name="P19"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Растягивающий массаж"
                            id="fc9b1fa4b9d596fcea6988b8e21b5015"
                            name="P19"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Скручивающий массаж"
                            id="673cb8fad79275d0dd7b46fb8930eaff"
                            name="P19"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Точечный массаж"
                            id="81166d5c354495de8da2723be9c0aa35"
                            name="P19"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="3D массаж"
                            id="41a143524c94143cdb3d8e27c19ac19e"
                            name="P19"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж Щиацу"
                            id="214a3fabaa51729b04d12936eadff2d3"
                            name="P32"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Шведский массаж"
                            id="ff34cc3e086ffa70e0e34a115a944cf6"
                            name="P19"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж Yoga"
                            id="540b382cad4c7ab371bd91036fbe803c"
                            name="P19"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Поколачивающий массаж"
                            id="accba053f32816f86a86d2ede7cc3646"
                            name="P19"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>

            <div
              id="other-filter"
              label="Другое"
            >
              <div className="catalog-filter__grid">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="S образная форма массажной каретки"
                            id="6b3e40d051848cada2f0d957ef2ecb49"
                            name="P17"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Можно ставить вплотную спинкой к стене"
                            id="3efd70f6624c925bb6348539c556125b"
                            name="P18"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Русифицированное меню"
                            id="30ad4ced2edccb7cdb3ce23ce3354835"
                            name="P24"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Механизм именения высоты"
                            id="42e6b274eae41e92077f040ad987e3fd"
                            name="P29"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массаж шеи"
                            id="420a0d587abe1d3f516a808cd3bbfe04"
                            name="P33"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Работает в авто"
                            id="72550f8805d501bca37d5390a0808abd"
                            name="P34"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Функция прогревания или охлаждения (Прогрев)"
                            id="d3648c7d8ed98e262b7878493e23d6ca"
                            name="P35"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Регулировка роликов по ширине"
                            id="88c9e70421a96cfe7be21abec5ab0ec1"
                            name="P38"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Инфракрасное прогревание"
                            id="3240f6a582f7ae91b31741eaca6ba5c9"
                            name="P39"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Регулировка угла наклона"
                            id="e420698b2bfeb44e72b10715da374ed3"
                            name="P40"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="3D массаж"
                            id="9e016838b650679f1be1075bf6421c25"
                            name="P37"
                            onClick={checkboxHandler}
                  />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Вендинговое"
                            id="86123f84e8d3c3fa3eeaea452b15e41b"
                            name="vending"
                            onClick={checkboxHandler}
                  />
                </div>
              </div>
            </div>
          </Accordion>
          }
        </div>

        <div className="catalog-filter__more-params">
          <Button label="Расширенные поиск"
                  outline={true}
                  size="xs"
                  onClick={() => setShowMore(!showMore)}
          />
        </div>
        <div className="catalog-filter__nav">
          <Button label="Показать" />
        </div>
        <div className="catalog-filter__reset">
          <Button label="Сбросить фильтр"
                  size="xs"
                  transparent={true}
          />
        </div>
      </Container>
    </div>
  )
}

CatalogFilter.propTypes = {
  isOpenCatalogFilter: PropTypes.bool,
  toggleCatalogFilter: PropTypes.func.isRequired,
  filter: PropTypes.array.isRequired,
  sectionId: PropTypes.string.isRequired
}

const mapStateToolProps = state => {
  return {
    isOpenCatalogFilter: state.layout.isOpenCatalogFilter,
    filter: state.filter.items
  }
}

const mapDispatchToProps = {
  toggleCatalogFilter
}

export default connect(mapStateToolProps, mapDispatchToProps)(CatalogFilter)
