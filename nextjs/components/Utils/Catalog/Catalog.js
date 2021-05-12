import React, { useEffect, useState, useRef, useCallback } from "react"

import { fetchProducts } from "@api/product"

import Loader from "@components/Layout/Loader"
import ProductCard from "@components/Cards/Product"
import Button from "@components/Forms/Button"

import FiveReasons from "@screens/FiveReasons"

import "./Catalog.scss"

const PER_PAGE =  5

const Catalog = ({ section_id, brand_id, params, totalSetter }) => {
  const loader = useRef(null)

  const [products, setProducts] = useState([])
  const [total, setTotal] = useState([])
  const [page, setPage] = useState(1)
  const [firstLoaded, setFirstLoaded] = useState(false)
  const [end, setEnd] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadProducts = useCallback((page) => {
    setLoading(true)

    const data = {
      ...params,
      "section_id": section_id,
      "include_sections": true,
      "nav-products": `page-${page}`,
      "with-video": true
    }

    if(brand_id) {
      data["MANUFACTURER"] = brand_id
    }

    fetchProducts(data).then(({ data }) => {
      if (page === 1) {
        setProducts(data.data)
      } else {
        setProducts(prev => [...prev, ...data.data])
      }

      setTotal(data.total)

      if (data.data.length < PER_PAGE) setEnd(true)

      if (typeof totalSetter === "function") totalSetter(data.total)

      if (!firstLoaded) setFirstLoaded(true)

      setLoading(false)
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
    if ((params && Object.keys(params).length <= 0) || (params && !params.update)) return

    setPage(1)
    loadProducts(1)
  }, [params])

  return (
    <div className="catalog">
      <div className="container">
        {loading &&
        <>
          <Loader/>
        </>
        }

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

        {loading &&
          <>
          <Loader/>
          </>
        }

        {total > 0 &&
        <>
          {!end &&
          <div className="catalog__product-nav" ref={loader}>
            <Button
              onClick={() => setPage(page + 1)}
              label="Показать ещё"
              size="xs"
              outline
            />
          </div>
          }
        </>
        }
      </div>
    </div>
  )
}

export default Catalog
