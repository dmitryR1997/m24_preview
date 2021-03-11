import React, { useEffect, useState } from "react"
import classnames from "classnames"

import { fetchProducts } from "@api/product"

import Container from "@components/Layout/Container"
import CatalogProduct from "@components/Cards/CatalogProduct"
import Button from "@components/Forms/Button"

import "./ProductsList.scss"
import showTotal from "@utils/showTotal";

const filterList = {
  NEWPRODUCT: "Новинка",
  SALELEADER: "Хит продаж",
  DISCOUNT: "Скидки"
}

const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [productsTotal, setProductsTotal] = useState(0)
  const [filter, setFilter] = useState("NEWPRODUCT")
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)

    fetchProducts({
      "nav-products": "page-1",
      type: filter,
      page_size: 4
    }).then(({ data }) => {
      setProducts(data.data)
      setProductsTotal(data.total)
    })
  }, [filter])

  useEffect(() => {
    if (page === 1) return

    fetchProducts({
      "nav-products": `page-${page}`,
      type: filter,
      page_size: 4
    }).then(({ data }) => {
      setProducts(prev => [...prev, ...data.data]);
      setProductsTotal(data.total)
    })
  }, [page])

  return (
    <div className="products-list">
      <Container>
        <div className="products-list__filter">
          {Object.keys(filterList).map((item, key) => (
            <div key={key}
                 onClick={() => setFilter(item)}
                 className={classnames("products-list__filter-item", {
                   "products-list__filter-item--active": filter === item
                 })}
            >
              {filterList[item]}
            </div>
          ))}
        </div>

        {products.length > 0 &&
          <>
            <div className="products-list__grid">
              {products.map((product, key) => (
                <div
                  key={key}
                  className="products-list__grid-item"
                >
                  <CatalogProduct
                    product={product}
                    size="xs"
                  />
                </div>
              ))}
            </div>

            <div className="products-list__nav">
              <Button
                label="Показать ещё"
                size="xs"
                outline
                onClick={() => setPage(page + 1)}
              />
            </div>

            <div className="products-list__total">
              {showTotal(page, 4, productsTotal)}
            </div>
          </>
        }
      </Container>
    </div>
  )
}

export default ProductsList
