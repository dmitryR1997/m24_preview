import PropTypes from "prop-types"
import classnames from "classnames"

import { connect } from "react-redux"
import { toggleHeaderSearch } from "@actions/layout"

import SearchIcon from "../../../public/icons/search.svg"

import "./HeaderSearchToggle.scss"

const HeaderSearchToggle = ({ toggleHeaderSearch, isOpenHeaderSearch }) => {
  return (
    <div
      className={classnames("header-search-toggle", {
        "header-search-toggle": isOpenHeaderSearch
      })}
      onClick={toggleHeaderSearch}
    >
      <SearchIcon/>
    </div>
  )
}

HeaderSearchToggle.propTypes = {
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

export default connect(mapStateToolProps, mapDispatchToProps)(HeaderSearchToggle)
