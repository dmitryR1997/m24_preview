import Link from "next/link"
import PropTypes from "prop-types"
import classnames from "classnames"

import { connect, useDispatch } from "react-redux"
import { clearCompare } from "@actions/compare"

import Button from "@components/Forms/Button"


import "./CompareNav.scss"

const CompareNav = ({ compareList }) => {
  const dispatch = useDispatch()

  return (
    <div className={classnames("compare-nav", {
      "compare-nav--is-open": compareList.length > 0
    })}
    >
      <div className="container">
        <div className="compare-nav__inner">
          <div className="compare-nav__clear" onClick={() => dispatch(clearCompare())}>
            Очистить
          </div>
          <div className="compare-nav__countine">
            <Link href="/compare">
              <Button label={`Сравнить ${compareList.length}`}
                      outline={true}
                      isBlock={true}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

CompareNav.propTypes = {
  compareList: PropTypes.array.isRequired,
}

const mapStateToolProps = state => {
  return {
    compareList: state.compare.list
  }
}

export default connect(mapStateToolProps)(CompareNav)
