import React, { useState, useEffect } from "react"
import Link from "next/link"
import PropTypes from "prop-types"
import classnames from "classnames"
import {connect, useDispatch} from "react-redux"
import { toggleHeaderSearch } from "@actions/layout"

import Container from "@components/Layout/Container"

import CloseIcon from "../../../public/icons/close.svg"

import "./HeaderSearch.scss"
import {fetchProducts} from "@api/product"
import getProductLink from "@utils/getProdutLink"

const HeaderSearch = ({ isOpenHeaderSearch, toggleHeaderSearch }) => {
  const dispatch = useDispatch()

  const [products, setProducts] = useState([])

  const onChangeHandler = (e) => {
    const value = e.target.value

    if(!value) {
      setProducts([])

      return
    }

    fetchProducts({
      name: e.target.value
    }).then(({ data }) => {
      setProducts(data.data)
    })
  }

  return (
    <div
      className={classnames("header-search", {
        "header-search--open": isOpenHeaderSearch
      })}
    >
      <div className="header-search__header">
        <Container>
          <div className="header-search__header-inner">
            <div className="header-search__header-input">
              <input type="text"
                     placeholder="Я ищу..."
                     onChange={onChangeHandler}
              />
            </div>
            <div className="header-search__header-close"
                 onClick={toggleHeaderSearch}
            >
              <CloseIcon/>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="header-search__list">
          {products.map(product => (
            <Link href={getProductLink(product)}>
              <div className="header-search__list-item">
                {product.images && product.images.length > 0 &&
                  <div className="header-search__list-item-image">
                    <img src={product.images[0]} />
                  </div>
                }

                <div className="header-search__list-item-title">
                  {product.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}

HeaderSearch.propTypes = {
  isOpenHeaderSearch: PropTypes.bool,
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
