import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import { connect } from "react-redux"
import { fetchCategories } from "@api/category"
import { toggleVideoFilter } from "@actions/layout"
import { setVideoFilter, updateVideoFilter } from "@actions/filter"

import Accordion from "@components/Surfaces/Accordion"
import Checkbox from "@components/Forms/Checkbox/Checkbox"
import Button from "@components/Forms/Button"

import CloseIcon from "../../../public/icons/close.svg"

import "./VideoFilter.scss"

const VideoFilter = ({ filter, setVideoFilter, updateVideoFilter, isOpenVideoFilter, toggleVideoFilter, total }) => {
  const [categories, setCategories] = useState([])

  const checkboxHandler = (e) => {
    const checked = e.target.checked
    const name = e.target.name
    const value = e.target.value

    let newValue

    if (checked) {
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

    updateVideoFilter({
      field: name,
      value: newValue
    })
  }

  useEffect(() => {
    setVideoFilter({})

    fetchCategories().then(({ data }) => {
      setCategories(data)
    })
  }, [])

  return (
    <div
      className={classnames("video-filter", {
        "video-filter--open": isOpenVideoFilter
      })}
    >
      <div className="video-filter__header">
        <div className="container">
          <div className="video-filter__header-inner">
            <div className="video-filter__header-title">
              Фильтр
            </div>
            <div className="video-filter__header-close" onClick={toggleVideoFilter}>
              <CloseIcon/>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="video-filter__list">
          <Accordion>
            <div
              id="tag-filter"
              label={
                <div className="catalog-filter__list-title">
                  Популярные теги
                  {filter["tag"] && filter["tag"].length > 0 &&
                  <span>{filter["tag"].length}</span>
                  }
                </div>
              }
              open={true}
            >
              <div className="video-filter__grid">
                <div className="video-filter__grid-item">
                  <Checkbox label="массажспины"
                            id="массажспины"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("массажспины") : false}
                  />
                </div>
                <div className="video-filter__grid-item">
                  <Checkbox label="массажног"
                            id="массажног"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("массажног") : false}
                  />
                </div>
                <div className="video-filter__grid-item">
                  <Checkbox label="массаждома"
                            id="массаждома"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("массаждома") : false}
                  />
                </div>
                <div className="video-filter__grid-item">
                  <Checkbox label="CASADA"
                            id="CASADA"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("CASADA") : false}
                  />
                </div>
                <div className="video-filter__grid-item">
                  <Checkbox label="Массажное кресло"
                            id="Массажное кресло"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("Массажное кресло") : false}
                  />
                </div>
                <div className="video-filter__grid-item">
                  <Checkbox label="массажшеи"
                            id="массажшеи"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("массажшеи") : false}
                  />
                </div>
                <div className="video-filter__grid-item">
                  <Checkbox label="массажстоп"
                            id="массажстоп"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("массажстоп") : false}
                  />
                </div>
                <div className="video-filter__grid-item">
                  <Checkbox label="Массажер для ног"
                            id="Массажер для ног"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("Массажер для ног") : false}
                  />
                </div>
                <div className="video-filter__grid-item">
                  <Checkbox label="Массажная накидка"
                            id="Массажная накидка"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("Массажная накидка") : false}
                  />
                </div>
                <div className="video-filter__grid-item">
                  <Checkbox label="OTO"
                            id="OTO"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("OTO") : false}
                  />
                </div>
                <div className="video-filter__grid-item">
                  <Checkbox label="Массажная подушка"
                            id="Массажная подушка"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("Массажная подушка") : false}
                  />
                </div>
                <div className="video-filter__grid-item">
                  <Checkbox label="массажпоясницы"
                            id="массажпоясницы"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("массажпоясницы") : false}
                  />
                </div>
                <div className="video-filter__grid-item">
                  <Checkbox label="Medisana"
                            id="Medisana"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("Medisana") : false}
                  />
                </div>
                <div className="video-filter__grid-item">
                  <Checkbox label="OGAWA"
                            id="OGAWA"
                            name="tag"
                            onClick={checkboxHandler}
                            checked={filter.hasOwnProperty("tag") ? filter["tag"].includes("OGAWA") : false}
                  />
                </div>
              </div>
            </div>

            <div
              id="category-filter"
              label={
                <div className="catalog-filter__list-title">
                  Категория товара
                  {filter["catalog_section"] && filter["catalog_section"].length > 0 &&
                  <span>{filter["catalog_section"].length}</span>
                  }
                </div>
              }
              open={true}
            >
              <div className="video-filter__grid">
                {categories.map((category, key) => (
                  <div key={key} className="video-filter__grid-item">
                    <Checkbox label={category.NAME}
                              id={category.ID}
                              name="catalog_section"
                              onClick={checkboxHandler}
                              checked={filter.hasOwnProperty("catalog_section") ? filter["catalog_section"].includes(category.ID) : false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Accordion>
        </div>

        <div className="video-filter__nav">
          <Button label={`Показать ${total} видео`}
                  onClick={toggleVideoFilter}
          />
        </div>

        <div className="video-filter__reset">
          <Button label="Сбросить фильтр"
                  size="xs"
                  transparent={true}
                  onClick={() => setVideoFilter({ "reset": true })}
          />
        </div>
      </div>
    </div>
  )
}

VideoFilter.propTypes = {
  filter: PropTypes.object.isRequired,
  toggleVideoFilter: PropTypes.func.isRequired,
  setVideoFilter: PropTypes.func.isRequired,
  updateVideoFilter: PropTypes.func.isRequired,
  isOpenVideoFilter: PropTypes.bool.isRequired,

  total: PropTypes.number.isRequired
}

const mapStateToolProps = state => {
  return {
    filter: state.filter.videoItems,
    isOpenVideoFilter: state.layout.isOpenVideoFilter
  }
}

const mapDispatchToProps = {
  toggleVideoFilter,
  setVideoFilter,
  updateVideoFilter
}

export default connect(mapStateToolProps, mapDispatchToProps)(VideoFilter)
