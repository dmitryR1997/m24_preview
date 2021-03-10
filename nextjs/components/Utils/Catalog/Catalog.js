import React, { useEffect, useState, useRef, useCallback } from "react"

import { fetchProducts } from "@api/product"

import Container from "@components/Layout/Container"
import ProductCard from "@components/Cards/Product"
import Button from "@components/Forms/Button"

import FiveReasons from "@screens/FiveReasons"

import "./Catalog.scss"

const Catalog = ({ section_id, params, totalSetter }) => {
  const loader = useRef(null)

  const [products, setProducts] = useState([])
  const [total, setTotal] = useState([])
  const [page, setPage] = useState(1)
  const [firstLoaded, setFirstLoaded] = useState(false)

  const loadProducts = useCallback((page) => {
    fetchProducts({
      ...params,
      "section_id": section_id,
      "include_sections": true,
      "nav-products": `page-${page}`
    }).then(({ data }) => {
      if (page === 1) {
        setProducts(data.data)
      } else {
        setProducts(prev => [...prev, ...data.data])
      }

      setTotal(data.total)

      if (typeof totalSetter === "function") totalSetter(data.total)

      if (!firstLoaded) setFirstLoaded(true)
    })
  }, [section_id, params])

  const handleObserver = (entities) => {
    const target = entities[0]

    if (target.isIntersecting) {
      setPage((page) => page + 1)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      threshold: 1.0
    })

    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [firstLoaded])

  useEffect(() => {
    if (page === 1) return
    loadProducts(page)
  }, [page])

  useEffect(() => {
    setPage(1)
    loadProducts(1)
  }, [section_id])

  useEffect(() => {
    if (Object.keys(params).length <= 0) return

    setPage(1)
    loadProducts(1)
  }, [params])

  return (
    <div className="catalog">
      <Container>
        <div className="catalog__product-list">
          {products.map((product, key) => {
            const item = (
              <div className="catalog__product-list-item">
                <ProductCard
                  product={product}
                />
              </div>
            )

            if (key === 1) {
              return (
                <React.Fragment key={key}>
                  {item}

                  <div className="catalog__product-list-item">
                    <FiveReasons/>
                  </div>
                </React.Fragment>
              )
            }

            return (
              <React.Fragment key={key}>
                {item}
              </React.Fragment>
            )
          })}
        </div>

        {products.length > 0 &&
        <>
          <div className="catalog__product-nav" ref={loader}>
            <Button
              onClick={() => setPage(page + 1)}
              label="Показать ещё"
              size="xs"
              outline
            />
          </div>

          {/*<div className="catalog__product-total">*/}
          {/*  Показано {page * 5} из {total} моделей*/}
          {/*</div>*/}
        </>
        }
      </Container>
    </div>
  )
}

export default Catalog
