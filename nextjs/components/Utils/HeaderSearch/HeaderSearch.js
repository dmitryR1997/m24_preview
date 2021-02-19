import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import { connect } from "react-redux"
import { toggleHeaderSearch } from "@actions/layout"

import SearchIcon from "../../../public/icons/search.svg"

const HeaderSearch = ({ toggleHeaderSearch, isOpenHeaderSearch }) => {
  return (
    <div
      className={classnames("header-search", {
        "header-search": isOpenHeaderSearch
      })}
      onClick={toggleHeaderSearch}
    >
      <SearchIcon/>
    </div>
  )
}

HeaderSearch.propTypes = {
  isOpenHeaderSearch: PropTypes.bool.isRequired,
  toggleHeaderSearch: PropTypes.func.isRequired
}

const mapStateToolProps = state => {
  return {
    isOpenHeaderSearch: state.layout.isOpenHeaderSearch
  }
}

const mapDispatchToProps = {
  toggleHeaderSearch
}

export default connect(mapStateToolProps, mapDispatchToProps)(HeaderSearch)
