import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { connect, useDispatch } from "react-redux"
import { toggleCatalogFilter } from "@actions/layout"

import { fetchMinMaxPrices } from "@api/category"

import Container from "@components/Layout/Container"
import Accordion from "@components/Surfaces/Accordion"
import RangeInput from "@components/Forms/RangeInput"
import Checkbox from "@components/Forms/Checkbox/Checkbox"

import CasadaLogo from "@images/popular-mark/casada.jpg"
import OgawaLogo from "@images/popular-mark/ogawa.jpg"
import SensaLogo from "@images/popular-mark/sensa.jpg"

import CloseIcon from "../../../public/icons/close.svg"

import "./CatalogFilter.scss"

const CatalogFilter = ({ isOpenCatalogFilter, toggleCatalogFilter, sectionId }) => {
  const dispatch = useDispatch()
  const [minMaxPrices, setMinMaxPrices] = useState(false)

  const loadMinMaxPrices = async () => {
    const response = await fetchMinMaxPrices(sectionId)

    setMinMaxPrices(response.data)
  }

  const filterItemHandler = (filter) => {
  }

  useEffect(() => {
    loadMinMaxPrices()
  }, [])

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
              id="tab-1"
              label="Цена"
              open
            >
              {minMaxPrices && minMaxPrices.min !== minMaxPrices.max &&
                <RangeInput
                  {...minMaxPrices}
                  setter={(value) => filterItemHandler({ field: "price", value })}
                />
              }
            </div>

            <div
              id="tab-2"
              label="Место установки"
              open
            >
              <div className="catalog-filter__grid">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для дома" id="home" />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для офиса" id="office" />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Вендинговые" id="vending" />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="С купюроприемником" id="bill" />
                </div>
              </div>
            </div>

            <div
              id="tab-3"
              label="Производитель"
              open
            >
              <div className="catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Немецкие" id="germany" />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Японские" id="japan" />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Китайские" id="china" />
                </div>
              </div>
            </div>

            <div
              id="tab-4"
              label="Особенности"
              open
            >
              <div className="catalog-filter__grid">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Ортопедические" id="orthopedic" />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="3D кресла" id="3d" />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Для больших людей" id="big-person" />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Braintronics" id="braintronics" />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Массажное кресло-качалка" id="massagechair" />
                </div>
              </div>
            </div>

            <div
              id="tab-5"
              label="Популярные марки"
              open
            >
              <div className="catalog-filter__grid catalog-filter__grid catalog-filter__grid--x2">
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Casada" image={CasadaLogo} id="casada" />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Ogawa" image={OgawaLogo} id="ogawa" />
                </div>
                <div className="catalog-filter__grid-item">
                  <Checkbox label="Sensa" image={SensaLogo} id="sensa" />
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      </Container>
    </div>
  )
}

CatalogFilter.propTypes = {
  isOpenCatalogFilter: PropTypes.bool,
  toggleCatalogFilter: PropTypes.func.isRequired,
  sectionId: PropTypes.string.isRequired
}

const mapStateToolProps = state => {
  return {
    isOpenCatalogFilter: state.layout.isOpenCatalogFilter
  }
}

const mapDispatchToProps = {
  toggleCatalogFilter
}

export default connect(mapStateToolProps, mapDispatchToProps)(CatalogFilter)
