import React, { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import debounce from "lodash.debounce"

import { connect } from "react-redux"
import { toggleCatalogFilter } from "@actions/layout"
import { setFilter, updateFilter } from "@actions/filter"

import { fetchFilters } from "@api/category"

import Accordion from "@components/Surfaces/Accordion"
import RangeInput from "@components/Forms/RangeInput"
import Checkbox from "@components/Forms/Checkbox/Checkbox"
import Button from "@components/Forms/Button"

import num_word from "@utils/NumWord"

import CloseIcon from "../../../public/icons/close.svg"

import "./CatalogFilter.scss"

const CatalogFilter = ({ filter, isOpenCatalogFilter, toggleCatalogFilter, setFilter, updateFilter, sectionId, total, filters }) => {
  const [list, setList] = useState([])

  const [price, setPrice] = useState({})

  const priceChangeHandler = (value) => {
    setPrice(value)
    updateFilter({ field: "price", value })
  }

  const delayedPriceChangeHandler = useCallback(debounce(priceChangeHandler, 500), [])

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

    updateFilter({
      field: name,
      value: newValue
    })
  }

  useEffect(() => {
    fetchFilters(sectionId, filters).then(({ data }) => {
      setList(data)
    })
  }, [sectionId])

  useEffect(() => {
    if(list.price && !filter.update) {
      updateFilter({ field: "update", value: true })
    }
  }, [list])


  return (
    <div
      className={classnames("catalog-filter", {
        "catalog-filter--open": isOpenCatalogFilter
      })}
    >
      <div className="catalog-filter__header">
        <div className="container">
          <div className="catalog-filter__header-inner">
            <div className="catalog-filter__header-title">
              Фильтр
            </div>
            <div className="catalog-filter__header-close" onClick={toggleCatalogFilter}>
              <CloseIcon/>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="catalog-filter__fixed">
          <div className="catalog-filter__nav">
            <Button label={`Показать ${total} ${num_word(total, [" модель", " модели", " моделей"])}`}
                    onClick={toggleCatalogFilter}
            />
          </div>

          <div className="catalog-filter__reset">
            <Button label="Сбросить фильтр"
                    size="xs"
                    transparent={true}
                    onClick={() => setFilter({ update: true })}
            />
          </div>
        </div>

        <div className="catalog-filter__list">
          {list.price &&
            <Accordion>
              <div
                id="price-filter"
                label="Цена"
                open={true}
              >
                {list.price && list.price.min !== list.price.max &&
                <RangeInput
                  {...list.price}
                  setter={(value) => delayedPriceChangeHandler(value)}
                  values={price}
                />
                }
              </div>
            </Accordion>
          }

          {list.default && list.default.length > 0 &&
            <Accordion>
              {list.default.map((item, key) => (
                <div
                  key={key}
                  id={item.code}
                  label={
                    <div className="catalog-filter__list-title">
                      {item.name}
                      {filter[item.code] && filter[item.code].length > 0 &&
                        <span>{filter[item.code].length}</span>
                      }
                    </div>
                  }
                  open={true}
                >
                  <div className="catalog-filter__grid catalog-filter__grid--x2">
                    {item.enums.map((num, key) => (
                      <div key={key} className="catalog-filter__grid-item">
                        <Checkbox label={num.value}
                                  id={num.id}
                                  name={num.property_code}
                                  onClick={checkboxHandler}
                                  checked={filter.hasOwnProperty(num.property_code) ? filter[num.property_code].includes(num.id) : false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Accordion>
          }

          {list.main && list.main.length > 0 &&
            <div className={classnames("catalog-filter__additional-list", {
              "catalog-filter__additional-list--open": true
            })}>
              <Accordion>
                {list.main.map((item, key) => (
                  <div
                    key={key}
                    id={item.code}
                    label={
                      <div className="catalog-filter__list-title">
                        {item.name}
                        {filter[item.code] && filter[item.code].length > 0 &&
                        <span>{filter[item.code].length}</span>
                        }
                      </div>
                    }
                  >
                    <div className="catalog-filter__grid catalog-filter__grid--x2">
                      {item.enums.map((num, key) => (
                        <div key={key} className="catalog-filter__grid-item">
                          <Checkbox label={num.value}
                                    id={num.id}
                                    name={num.property_code}
                                    onClick={checkboxHandler}
                                    checked={filter.hasOwnProperty(num.property_code) ? filter[num.property_code].includes(num.id) : false}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Accordion>


              <div className="catalog-filter__grid">
                {list.other.map((item, key) => (
                  <>
                    {item.enums.map((num, key) => (
                      <div key={key} className="catalog-filter__grid-item catalog-filter__grid-item--single">
                        <Checkbox label={item.name}
                                  id={num.id}
                                  name={num.property_code}
                                  onClick={checkboxHandler}
                                  checked={filter.hasOwnProperty(num.property_code) ? filter[num.property_code].includes(num.id) : false}
                        />
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

CatalogFilter.propTypes = {
  filter: PropTypes.any.isRequired,
  isOpenCatalogFilter: PropTypes.bool,
  toggleCatalogFilter: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,

  sectionId: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  filters: PropTypes.object
}

const mapStateToolProps = state => {
  return {
    filter: state.filter.items,
    isOpenCatalogFilter: state.layout.isOpenCatalogFilter
  }
}

const mapDispatchToProps = {
  toggleCatalogFilter,
  updateFilter,
  setFilter
}

export default connect(mapStateToolProps, mapDispatchToProps)(CatalogFilter)
