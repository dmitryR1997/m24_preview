import React, { useEffect } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import { connect } from "react-redux"
import { toggleCatalogFilter } from "@actions//layout"

import FilterIcon from "../../../public/icons/filter.svg"

import "./CatalogFilterToggle.scss"

const CatalogFilterToggle = ({ isOpenCatalogFilter, toggleCatalogFilter }) => {
  return (
    <div
      className={classnames("catalog-filter-toggle", {
        "catalog-filter-toggle--open": isOpenCatalogFilter
      })}
      onClick={toggleCatalogFilter}
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
  isOpenCatalogFilter: PropTypes.bool,
  toggleCatalogFilter: PropTypes.func.isRequired
}

const mapStateToolProps = state => {
  return {
    isOpenCatalogFilter: state.layout.isOpenCatalogFilter
  }
}

const mapDispatchToProps = {
  toggleCatalogFilter
}

export default connect(mapStateToolProps, mapDispatchToProps)(CatalogFilterToggle)
