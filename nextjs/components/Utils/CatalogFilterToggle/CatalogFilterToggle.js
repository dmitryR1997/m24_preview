import React, { useEffect } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import { connect } from "react-redux"
import { toggleCatalogFilter, toggleVideoFilter } from "@actions//layout"

import FilterIcon from "../../../public/icons/filter.svg"

import "./CatalogFilterToggle.scss"

const CatalogFilterToggle = ({ isOpenCatalogFilter, isOpenVideoFilter, toggleCatalogFilter, toggleVideoFilter, filterId }) => {
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
      </div>
    </div>
  )
}

CatalogFilterToggle.propTypes = {
  filterId: PropTypes.string.isRequired,
  isOpenCatalogFilter: PropTypes.bool,
  isOpenVideoFilter: PropTypes.bool,
  toggleCatalogFilter: PropTypes.func.isRequired,
  toggleVideoFilter: PropTypes.func.isRequired
}

const mapStateToolProps = state => {
  return {
    isOpenCatalogFilter: state.layout.isOpenCatalogFilter,
    isOpenVideoFilter: state.layout.isOpenVideoFilter
  }
}

const mapDispatchToProps = {
  toggleCatalogFilter,
  toggleVideoFilter
}

export default connect(mapStateToolProps, mapDispatchToProps)(CatalogFilterToggle)
