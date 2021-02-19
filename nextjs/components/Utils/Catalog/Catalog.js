import React, { useEffect, useState } from "react"

import { fetchProducts } from "@api/product"

import Container from "@components/Layout/Container"
import ProductCard from "@components/Cards/Product"
import Button from "@components/Forms/Button"

import FiveReasons from "@screens/FiveReasons"

import "./Catalog.scss"

const Catalog = ({ params }) => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState([])
  const [page, setPage] = useState(1)

  const loadProducts = (page) => {
    fetchProducts({
      ...params,
      "nav-products": `page-${page}`
    }).then(({ data }) => {
      setProducts(prev => [...prev, ...data.data])
      setTotal(data.total)
    })
  }

  useEffect(() => {
    loadProducts(page)
  }, [page])

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
          <div className="catalog__product-nav">
            <Button
              onClick={() => setPage(page + 1)}
              label="Показать ещё"
              size="xs"
              outline
            />
          </div>

          <div className="catalog__product-total">
            Всего {total} моделей
          </div>
        </>
        }
      </Container>
    </div>
  )
}

export default Catalog
