import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import { connect } from "react-redux"
import { toggleCatalogFilter, toggleVideoFilter } from "@actions//layout"

import FilterIcon from "../../../public/icons/filter.svg"

import "./CatalogFilterToggle.scss"

const CatalogFilterToggle = ({ filter, filterVideo, isOpenCatalogFilter, isOpenVideoFilter, toggleCatalogFilter, toggleVideoFilter, filterId }) => {
  const [filterCount, setFilterCount] = useState(false)

  useEffect(() => {
    const filterKeys = ["price", "update", "sort"]
    const asArray = Object.entries(filter)
    const filteredArray = asArray.filter(([key, value]) => !filterKeys.includes(key) && value.length && value.length > 0);

    setFilterCount(filteredArray.length)
  }, [filter])

  useEffect(() => {
    const asArray = Object.entries(filterVideo)
    const filteredArray = asArray.filter(([key, value]) => value.length && value.length > 0);

    setFilterCount(filteredArray.length)
  }, [filterVideo])


  const clickHandler = () => {
    if (filterId === "catalog") {
      toggleCatalogFilter()
    } else if (filterId === "video") {
      toggleVideoFilter()
    }
  }

  return (
    <div
      className={classnames("catalog-filter-toggle", {
        "catalog-filter-toggle--open": isOpenCatalogFilter || isOpenVideoFilter
      })}
      onClick={clickHandler}
    >
      <div className="catalog-filter-toggle__icon">
        <FilterIcon/>
      </div>
      <div className="catalog-filter-toggle__label">
        Фильтр

        {filterCount > 0 &&
          <span>{filterCount}</span>
        }
      </div>
    </div>
  )
}

CatalogFilterToggle.propTypes = {
  filter: PropTypes.object.isRequired,
  filterVideo: PropTypes.object.isRequired,
  filterId: PropTypes.string.isRequired,
  isOpenCatalogFilter: PropTypes.bool,
  isOpenVideoFilter: PropTypes.bool,
  toggleCatalogFilter: PropTypes.func.isRequired,
  toggleVideoFilter: PropTypes.func.isRequired
}

const mapStateToolProps = state => {
  return {
    filter: state.filter.items,
    filterVideo: state.filter.videoItems,
    isOpenCatalogFilter: state.layout.isOpenCatalogFilter,
    isOpenVideoFilter: state.layout.isOpenVideoFilter
  }
}

const mapDispatchToProps = {
  toggleCatalogFilter,
  toggleVideoFilter
}

export default connect(mapStateToolProps, mapDispatchToProps)(CatalogFilterToggle)
