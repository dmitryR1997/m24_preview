import React, { useState, useCallback, useEffect, useRef } from "react"
import Link from "next/link"
import PropTypes from "prop-types"
import classnames from "classnames"
import debounce from "lodash.debounce"

import { connect } from "react-redux"
import { toggleHeaderSearch } from "@actions/layout"
import { fetchProducts } from "@api/product"
import getProductLink from "@utils/getProdutLink"

import Container from "@components/Layout/Container"
import Loader from "@components/Layout/Loader"

import CloseIcon from "../../../public/icons/close.svg"

import "./HeaderSearch.scss"

const HeaderSearch = ({ isOpenHeaderSearch, toggleHeaderSearch }) => {
  const input = useRef()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [q, setQ] = useState("")

  const onChangeHandler = (e) => {
    const value = e.target.value

    setQ(value)
  }

  const delayOnChangeHandler = useCallback(debounce(onChangeHandler, 500), [])

  useEffect(() => {
    if (!q) {
      setProducts([])
      return
    }

    setLoading(true)

    fetchProducts({
      name: q
    }).then(({ data }) => {
      setProducts(data.data)
      setLoading(false)
    })
  }, [q])

  useEffect(() => {
    if(isOpenHeaderSearch) {
     input.current.focus()
    }
  }, [isOpenHeaderSearch])
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
                     onChange={delayOnChangeHandler}
                     ref={input}
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
          {!loading && products.length === 0 && q.length > 0 &&
          <div className="header-search__list-empty">
            По вашему запросу ничего не найдено
          </div>
          }

          {loading &&
          <div className="header-search__list-loader">
            <Loader/>
          </div>
          }

          {products.map((product, key) => (
            <Link key={key} href={getProductLink(product)}>
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
